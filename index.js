// index.js
// auto-deploy.js
const Client = require('ssh2-sftp-client')
    , fs = require('then-fs')
    , path = require('path')
    , globby = require('globby')
    , utils = require('./utils')


module.exports = function(config){
	let { server, locationBase, serverBase } = config; 
	let sftp = new Client(); 
	let connection = sftp.connect(server); 

	let locationPaths_pro = globby(locationBase); 

	let relativePaths_pro = locationPaths_pro.then(
		utils.map2RelativePath(locationBase)
	); 

	let serverPaths_pro = relativePaths_pro.then(arr => {
		return arr.map(e => serverBase + e); 
	});


	return connection.then(ok => {
		return sftp.mkdir(serverBase, true).catch(err => Promise.resolve('ok')); 
	}).then(ok => {
		return Promise.all([
			locationPaths_pro,
			serverPaths_pro,
			relativePaths_pro
		])
	}).then(e => {
		let [
			locationPaths,
			serverPaths,
			relativePaths
		] = e; 

		var files = relativePaths.map((p, idx) => {
			let loop = p.split('/');
			let base = loop.slice(0, -1).join('/') || '/';  

			return {
				base: base,
				sbase: serverBase + base,
				file: loop.slice(-1)[0], 
				rpath: p, 
				lpath: locationPaths[idx], 
				spath: serverPaths[idx]
			}
		}); 

		files.sort((a, b) => {
			return a.base > b.base
		}); 

		var loadings = files.map(o => {
			var next = () => {
				return sftp.put(o.lpath, o.spath).catch(err => {
					console.log(o); 
					console.log(err); 

					console.log('\n\n\n'); 
				})
			}

			return sftp.mkdir(o.sbase).then(next, next)
		}); 


		return Promise.all(loadings); 
	}); 
}
