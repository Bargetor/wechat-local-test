function randomString(len) {
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return randomStringFromChars(len, chars);
}

function randomNumString(len){
    var chars = '0123456789';
    return randomStringFromChars(len, chars);
}

function randomStringFromChars(len, chars) {
    var l = len || 32;
    var $chars = chars;
    var maxPos = $chars.length;
    var pwd = '';
    for (i = 0; i < l; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}


function implode (array){
    var resultStr = '';
    if(array == null)return null;
    if(array.length == 0)return null;
    for (var i = 0; i < array.length; i++) {
        resultStr += array[i];
    }
    return resultStr;
}
