// utils.js
const utils = {}; 

utils.map2RelativePath = base => arr => {
	base = base.replace(/\\/g, '/'); 
	
	return arr.map(e => {
		return e.replace(base, ''); 
	});
}

module.exports = utils; 
