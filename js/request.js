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

function userSendPicMassage(url, toUsername, fromUsername, picUrl, mediaId, callback){
    var xml = new XMLWriter();
    xml.BeginNode("xml");
    writerCdataNode(xml, "ToUserName", toUsername);
    writerCdataNode(xml, "FromUserName", fromUsername);
    writerCdataNode(xml, "MsgType", "image");
    writerCdataNode(xml, "PicUrl", picUrl);
    writerCdataNode(xml, "MediaId", mediaId);
    writerTextNode(xml, "CreateTime", '' + new Date().getTime());
    writerTextNode(xml, "MsgId", randomNumString(16));
    xml.EndNode();
    xml.Close();
    queryPostForXml(url, xml.ToString(), callback);
}

function userSendVoiceMassage(url, toUsername, fromUsername,mediaId, format, callback){
    var xml = new XMLWriter();
    xml.BeginNode("xml");
    writerCdataNode(xml, "ToUserName", toUsername);
    writerCdataNode(xml, "FromUserName", fromUsername);
    writerTextNode(xml, "CreateTime", '' + new Date().getTime());
    writerTextNode(xml, "MsgId", randomNumString(16));


    writerCdataNode(xml, "MsgType", "voice");
    writerCdataNode(xml, "Format", format);
    writerCdataNode(xml, "MediaId", mediaId);

    xml.EndNode();
    xml.Close();
    queryPostForXml(url, xml.ToString(), callback);
}

function userSendVideoMassage(url, toUsername, fromUsername,mediaId, thumbMediaId, callback){
    var xml = new XMLWriter();
    xml.BeginNode("xml");
    writerCdataNode(xml, "ToUserName", toUsername);
    writerCdataNode(xml, "FromUserName", fromUsername);
    writerTextNode(xml, "CreateTime", '' + new Date().getTime());
    writerTextNode(xml, "MsgId", randomNumString(16));


    writerCdataNode(xml, "MsgType", "video");
    writerCdataNode(xml, "ThumbMediaId", thumbMediaId);
    writerCdataNode(xml, "MediaId", mediaId);

    xml.EndNode();
    xml.Close();
    queryPostForXml(url, xml.ToString(), callback);
}

function userSendLocationMassage(url, toUsername, fromUsername,location_X, location_Y, scale, label, callback){
    var xml = new XMLWriter();
    xml.BeginNode("xml");
    writerCdataNode(xml, "ToUserName", toUsername);
    writerCdataNode(xml, "FromUserName", fromUsername);
    writerTextNode(xml, "CreateTime", '' + new Date().getTime());
    writerTextNode(xml, "MsgId", randomNumString(16));


    writerCdataNode(xml, "MsgType", "location");
    writerCdataNode(xml, "Location_X", location_X);
    writerCdataNode(xml, "Location_Y", location_Y);
    writerCdataNode(xml, "Scale", scale);
    writerCdataNode(xml, "Label", label);

    xml.EndNode();
    xml.Close();
    queryPostForXml(url, xml.ToString(), callback);
}

function userSendLinkMassage(url, toUsername, fromUsername,title, description, linkUrl, callback){
    var xml = new XMLWriter();
    xml.BeginNode("xml");
    writerCdataNode(xml, "ToUserName", toUsername);
    writerCdataNode(xml, "FromUserName", fromUsername);
    writerTextNode(xml, "CreateTime", '' + new Date().getTime());
    writerTextNode(xml, "MsgId", randomNumString(16));


    writerCdataNode(xml, "MsgType", "link");
    writerCdataNode(xml, "Title", title);
    writerCdataNode(xml, "Description", description);
    writerCdataNode(xml, "Url", linkUrl);

    xml.EndNode();
    xml.Close();
    queryPostForXml(url, xml.ToString(), callback);
}



/********************************* event request **************************************/
function subscribeEvent(url, toUsername, fromUsername,callback){
    var xml = new XMLWriter();
    xml.BeginNode("xml");
    writerCdataNode(xml, "ToUserName", toUsername);
    writerCdataNode(xml, "FromUserName", fromUsername);
    writerTextNode(xml, "CreateTime", '' + new Date().getTime());

    writerCdataNode(xml, "MsgType", "event");
    writerCdataNode(xml, "Event", 'subscribe');

    xml.EndNode();
    xml.Close();
    queryPostForXml(url, xml.ToString(), callback);
}

function unSubscribeEvent(url, toUsername, fromUsername,callback){
    var xml = new XMLWriter();
    xml.BeginNode("xml");
    writerCdataNode(xml, "ToUserName", toUsername);
    writerCdataNode(xml, "FromUserName", fromUsername);
    writerTextNode(xml, "CreateTime", '' + new Date().getTime());

    writerCdataNode(xml, "MsgType", "event");
    writerCdataNode(xml, "Event", 'unsubscribe');

    xml.EndNode();
    xml.Close();
    queryPostForXml(url, xml.ToString(), callback);
}



/*************************************** common ****************************************/

function writerCdataNode(xml, nodeName, str){
    xml.BeginNode(nodeName);
    xml.WriteString("<![CDATA[" + str + "]]>");
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
    // var params = {};
    // params[post_data_param_name] = xml;
    queryPost(url,xml, callback);
}

function queryPost(url,params, callback){
    $.ajax({
        url : url,
        type : "POST",
        data : params,
        contentType : 'text/xml',
        dataType : 'text',
        success : callback
    });
    // $.post(url, params, callback);
}
