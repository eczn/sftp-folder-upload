# sftp-folder-upload

upload an entire folder to your server by sftp with a simple config

就。。。。。给个 config 然后通过 sftp 来上传整个文件夹。。。

# how 2 use 

``` bash
$ npm install sftp-folder-upload
```

# usage 

``` js
// Import sftp-folder-upload 
const uploader = require('sftp-folder-upload')
    , path = require('path')

uploader({
    // Your Server Config 
    // 服务器配置
    server: {
        host: '127.0.0.1',
        port: '22',
        username: 'root',
        password: '******'
    },
    // The Foloder You Want To Upload 
    // 你要上传的文件夹 （请传入绝对路径）
    locationBase: path.join(__dirname, 'just_test_folder'), 
    // The Destination Of Uploading 
    // 应该传到服务器的目录
    serverBase: '/home/just_test_folder'
}).then(allDone => {
    // Resolved When All File Uploaded 
    console.log('OK All Uploaded'); 
}); 
```

# (((((((
前段时候要部署前端代码的时候就需要这个，但是 npm 上好像没有。。 

不过有单文件的上传库，拿来拼拼就可以传文件夹了。。 

写好部署脚本，然后写进 package.json 的 script 来部署代码还蛮方便的: 

``` js
$ npm run deploy 
```

# LICENSE 

MIT 

