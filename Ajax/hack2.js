var request;
var queryString;

function setQueryString()
{
	queryString="";
	var frm=document.forms[0];
	var numberElements=frm.elements.length;
	for (var i=0;i<numberElements;i++)
	{
		if(i<numberElements-1)
		{
			queryString+=frm.elements[i].name+"="+encodeURIComponent(frm.elements[i].value)+"&";
		}
		else
		{
			queryString+=frm.elements[i].name+"="+encodeURIComponent(frm.elements[i].value);
		}

	}
}

function sendData()
{
	setQueryString();
	var url="http://localhost/Ajax/test.html";
	httpRequest("POST",url,true);
}

function initReq(reqType,url,isAsynch)
{
	request.onreadystatechange=handleResponse;
	request.open(reqType,url,isAsynch);
	request.setRequestHeader("Content-Type","application/x-www-form-urlencode;charset=UTF-8");
	request.send(queryString);
}

function httpRequest(reqType,url,asynch)
{
	if(window.XMLHttpRequest)
	{
		request=new XMLHttpRequest();
	}
	else if(window.ActiveXObject)
	{
		request=new ActiveXObject("Msxm12.XMLHTTP");
		if(!request)
			request=new ActiveXObject("Microsoft.XMLHTTP");
	}

	if(request)
	{
		initReq(reqType,url,asynch);
	}
	else
	{
		alert("Your browser does not permit the use of all of this application's features!");
	}
}

function handleResponse()
{
	if(request.readyState==4)
	{
		if(request.status==200)
		{
			alert(request.responseText);
		}
		else
		{
			alert("A problem occurred with communicating between the XMLHttpRequest object and the server program.");
		}
	}
}
