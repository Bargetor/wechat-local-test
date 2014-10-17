function randomString(len) {
    var l = len || 32;
    var $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
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
