var post_data_param_name = 'HTTP_RAW_POST_DATA';


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


function userSendTextMassage(url, toUsername, fromUsername, content, callback){
    var xml = new XMLWriter();
    xml.BeginNode("xml");
    writerCdataNode(xml, "ToUserName", toUsername);
    writerCdataNode(xml, "FromUserName", fromUsername);
    writerCdataNode(xml, "MsgType", "text");
    writerCdataNode(xml, "Content", content);
    writerTextNode(xml, "CreateTime", '' + new Date().getTime());
    writerTextNode(xml, "MsgId", randomNumString(16));
    xml.EndNode();
    xml.Close();
    queryPostForXml(url, xml.ToString(), callback);
}



function writerCdataNode(xml, nodeName, str){
    xml.BeginNode(nodeName);
    xml.WriteString("<![CDATA[" + str + "]>");
    xml.EndNode();
}

function writerTextNode(xml, nodeName, str){
    xml.BeginNode(nodeName);
    xml.WriteString(str);
    xml.EndNode();
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

function queryPostForXml(url, xml, callback){
    var params = {};
    params[post_data_param_name] = xml;
    queryPost(url,params, callback);
}

function queryPost(url,params, callback){
    // $.ajax({
    //     url : url,
    //     type : "POST",
    //     data : params,
    //     contentType : 'applicaton/xml',
    //     dataType : 'text',
    //     success : callback
    // });
    $.post(url, params, callback);
}
