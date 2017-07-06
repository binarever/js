var request;
var queryString;

function sendData()
{
	setQueryString();
	var url="http://localhost/Ajax/test.html";
	httpRequest("POST",url,true);
}

function handleResponse()
{
	if(request.readyState==4)
	{
		if(request.status==200)
		{
			var doc=request.responseXML;
			var info=getDocInfo(doc);
			styliseDiv(info,document.getElementById(""docDisplay""));
		}
		else
		{
			alert(""A problem occurred with communicating between the XMLHttpRequest object and the server program."");
		}
	}
}

function initReq(reqType,url,bool)
{
	request.onreadystatechange=handleResponse;
	request.open(reqType,url,bool);
	request.setRequestHeader(""Content-Type"",""application/x-www-form-urlencoded;charset=UTF-8"");
	request.overrideMimeType(""text/xml"");
	request.send(queryString);
}

function setQueryString()
{
	queryString="";
	var frm=document.forms[0];
	var numberElements=frm.elements.length;
	for(var i=0;i<numberElements;i++)
	{
		if(i<numberElements-1)
			queryString+=frm.elements[i].name+"="+encodeURIComponent(frm.elements[i].value)+"&";
		else
			queryString+=frm.elements[i].name+"="+encodeURIComponent(frm.elements[i].value);
	}
}

function stylizeDiv(bdyTxt,div)
{
	div.innerHTML="";
	div.style.backgroundColor="yellow";
	div.innerHTML=bdyTxt;
}

function getDocInfo(doc)
{
	var root=doc.document.Element;
	var info="<h3>Document root element name:</h3>"+root.nodeName;
	var nds;
	if(root.hasChildNodes())
	{
		nds=root.childNodes;
		info+="<h4>Root node's child node names/values:</h4>";
		for(var i=0;i<nds.length;i++)
		{
			info+=nds[i].nodeName;
			if(nds[i].hasChildNodes())
				info+=":\"+nds[i].firstChild.nodeValue+"\"<br />";
			else
				info+=": Empty<br />";
		}
	}

	return info;
}

var doc=request.responseXML;
var info=getDocInfo(doc);
