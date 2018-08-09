const crypto = require('crypto');
const rootPath =  require('app-root-path');
const setting = require(rootPath + '/setting');
const fs = require('fs');

const rsa = {};
module.exports = rsa;

rsa.publicEncrypt = (data) => {
    let publicKey = fs.readFileSync(`${rootPath}/${setting.rsa.rootDir}/${setting.rsa.publicKeyName}`).toString(); //替换你自己的路径
    
    let MAX_ENCRYPT_BLOCK = setting.rsa.MAX_ENCRYPT_BLOCK;
    
    let buf = new Buffer(data, "utf-8");
    let inputLen = buf.byteLength;
    let buffers = [];
    let offSet = 0;
    let endOffSet = MAX_ENCRYPT_BLOCK;
    //分段加密
    debugger;
    while (inputLen - offSet > 0) {
        if (inputLen - offSet > MAX_ENCRYPT_BLOCK) {
            let bufTmp = buf.slice(offSet, endOffSet);
            buffers.push(crypto.publicEncrypt({key: publicKey, padding: crypto.RSA_PKCS1_PADDING}, bufTmp));
        } else {
            let bufTmp = buf.slice(offSet, inputLen);
            buffers.push(crypto.publicEncrypt({key: publicKey, padding: crypto.RSA_PKCS1_PADDING}, bufTmp));
        }
        offSet += MAX_ENCRYPT_BLOCK;
        endOffSet += MAX_ENCRYPT_BLOCK;
    }
    let result = Buffer.concat(buffers);
    //密文BASE64编码
    let base64Str = result.toString("base64");
     console.log(base64Str);
    return base64Str;
};

rsa.publicDecrypt = (date) => {
    //得到私钥
    let publicPem = fs.readFileSync(`${rootPath}/${setting.rsa.rootDir}/${setting.rsa.privateKeyName}`).toString(); //替换你自己的路径
    let publicKey = publicPem.toString();
    //经过base64编码的密文转成buf
    let buf = new Buffer(date, "base64");

    let MAX_DECRYPT_BLOCK = setting.rsa.MAX_DECRYPT_BLOCK;

    let inputLen = buf.byteLength;
    let buffers = [];
    let offSet = 0;
    let endOffSet = MAX_DECRYPT_BLOCK;
    //分段加密
    while (inputLen - offSet > 0) {
        if (inputLen - offSet > MAX_DECRYPT_BLOCK) {
            let bufTmp = buf.slice(offSet, endOffSet);
            buffers.push(crypto.publicDecrypt({key: publicKey, padding: crypto.RSA_PKCS1_PADDING}, bufTmp));
        } else {
            let bufTmp = buf.slice(offSet, inputLen);
            buffers.push(crypto.publicDecrypt({key: publicKey, padding: crypto.RSA_PKCS1_PADDING}, bufTmp));
        }
        offSet += MAX_DECRYPT_BLOCK;
        endOffSet += MAX_DECRYPT_BLOCK;
    }
    let result = Buffer.concat(buffers).toString();
     console.log(result);
    return result;
};


rsa.privateEncrypt = (date) => {

    //得到私钥
    let privatePem = fs.readFileSync(`${rootPath}/${setting.rsa.rootDir}/${setting.rsa.privateKeyName}`).toString();
    let privateKey = privatePem.toString();
    //经过base64编码的密文转成buf
    let buf = new Buffer(date, "utf-8");

    let MAX_ENCRYPT_BLOCK = setting.rsa.MAX_ENCRYPT_BLOCK;

    //buf转byte数组
    let inputLen = buf.byteLength;
    let buffers = [];
    let offSet = 0;
    let endOffSet = MAX_ENCRYPT_BLOCK;
    //分段加密
    while (inputLen - offSet > 0) {
        if (inputLen - offSet > MAX_ENCRYPT_BLOCK) {
            let bufTmp = buf.slice(offSet, endOffSet);
            buffers.push(crypto.privateEncrypt({key: privateKey, padding: crypto.RSA_PKCS1_PADDING}, bufTmp));
        } else {
            let bufTmp = buf.slice(offSet, inputLen);
            buffers.push(crypto.privateEncrypt({key: privateKey, padding: crypto.RSA_PKCS1_PADDING}, bufTmp));
        }
        offSet += MAX_ENCRYPT_BLOCK;
        endOffSet += MAX_ENCRYPT_BLOCK;
    }
    let result = Buffer.concat(buffers);
    //密文BASE64编码
    let base64Str = result.toString("base64");
    console.log(base64Str);
    return base64Str;
};

rsa.privateDecrypt = (date) => {
    //得到私钥
    let privatePem =  fs.readFileSync(`${rootPath}/${setting.rsa.rootDir}/${setting.rsa.privateKeyName}`).toString();
    let privateKey = privatePem.toString();
    let buf = new Buffer(date, "base64");

    let MAX_DECRYPT_BLOCK = setting.rsa.MAX_DECRYPT_BLOCK;
    
    let inputLen = buf.byteLength;
    //密文
    let buffers = [];
    //开始长度
    let offSet = 0;
    //结束长度
    let endOffSet = MAX_DECRYPT_BLOCK;
    //分段加密
    while (inputLen - offSet > 0) {
        if (inputLen - offSet > MAX_DECRYPT_BLOCK) {
            let bufTmp = buf.slice(offSet, endOffSet);
            buffers.push(crypto.privateDecrypt({key: privateKey, padding: crypto.RSA_PKCS1_PADDING}, bufTmp));
        } else {
            let bufTmp = buf.slice(offSet, inputLen);
            buffers.push(crypto.privateDecrypt({key: privateKey, padding: crypto.RSA_PKCS1_PADDING}, bufTmp));
        }
        offSet += MAX_DECRYPT_BLOCK;
        endOffSet += MAX_DECRYPT_BLOCK;
    }
    let result = Buffer.concat(buffers).toString();
    console.log(result);
    //解密
    return result;
};
