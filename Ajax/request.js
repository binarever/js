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
		{
			request=new ActiveXObject("Microsoft.XMLHTTP");
		}
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

function initReq(reqType,url,bool)
{
	request.onreadystatechange=handleResponse;
	request.open(reqType,url,bool);
	request.send(null);
}
