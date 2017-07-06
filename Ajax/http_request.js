var request=null;

function httpRequest(reqType,url,asynch,respHandle)
{
	if(window.XMLHTTPRequest)
	{
		request=new XMLHTTPRequest();
	}
	else if(window.ActiveXObject)
	{
		request=new ActiveXObject("Msxml2.XMLHTTP");
		if(!request)
			request=new ActiveXObject("Microsoft.XMLHTTP");
	}

	if(request)
	{
		if(reqType.toLowerCase()!="post")
			initReq(reqType,url,asynch,respHandle);
		else
		{
			var args=arguments[4];
			if(args!=null&&args.length>0)
				initReq(reqType,url,asynch,respHandle,args);
		}
	}
	else
	{
		alert("Your browser does not permit the use of all of this application's features!");
	}
}

function initReq(reqType,url,bool,respHandle)
{
	try
	{
		request.onreadystatechange=respHandle;
		request.open(reqType,url,bool);

		if(reqType.toLowerCase()=="post")
		{
			request.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
			request.send(arguments[4]);
		}
		else
		{
			request.send(null);
		}
	}
	catch(errv)
	{
		alert("The application cannot contact the server at the moment.Please try again in a few seconds.\n Error detail:"+errv.message);
	}
}

var _url="http://localhost/Ajax/test.html";
var _data="first=Bruce&last=Perry&middle=W";
httpRequest("POST",_url,true,handleResponse,_data);
