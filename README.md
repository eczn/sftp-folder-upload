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
    server: {
        host: '127.0.0.1',
        port: '22',
        username: 'root',
        password: '******'
    },
    // The Foloder You Want To Upload 
    locationBase: path.join(__dirname, 'just_test_folder'), 
    // The Destination Of Uploading 
    serverBase: '/home/just_test_folder'
}).then(allDone => {
    // Resolved When All File Uploaded 
    console.log('OK All Uploaded'); 
}); 
```

# LICENSE 

MIT 

