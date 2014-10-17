function signature(url, token, callback){
    if (token == null || token == '' ) return;
    var signature = '';
    var timestamp = new Date().getTime();
    var nonce = Math.random();
    var echostr = randomString(32);
    var array = [timestamp, token, nonce];
    array.sort();
    var signatureStr = implode(array);
    signature = hex_sha1(signatureStr);

    var params = {signature : signature,
                            timestamp : timestamp,
                            nonce : nonce,
                            echostr : echostr};
    queryGet(url, params, callback);
}





function queryGet(url,params, callback){
    $.ajax({
        url : url,
        type : "GET",
        data : params,
        contentType : 'applicaton/json',
        dataType : 'text',
        success : callback
    });
}

function queryPost(url,params, callback){

}
