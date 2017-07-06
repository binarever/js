var request;
var queryString;

function sendData()
{
	setQueryString();
	url="http://localhost/Ajax/recvJson.html";
	httpRequest("POST",url,true);
}

function handleJson()
{
	if(request.readyState==4)
	{
		if(request.status==200)
		{
			var resp=request.responseText;
			var func=new Function("return "+resp);
			var objt=func();
			var div=document.getElementById("json");
			stylizeDiv(resp,div);
			div=document.getElementById("props");
			div.innerHTML="<h4>In object form...</h4>"+
				"<h5>Properties</h5>firstname= "+
				objt.firstname+"<br />lastname="+
				objt.lastname+"<br />gender="+
				objt.gender+"<br />country="+
				objt.country;
		}
		else
		{
			alert("A problem occurred with conmmunicating between the XMLHttpRequest object and the server program.");
		}
	}
}

function initReq(reqType,url,bool)
{
	request.onreadystatechange=handleJson;
	request.open(reqType,url,bool);
	request.setRequestHandler("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
	request.send(queryString);
}

function httpRequest(){}

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
	div.style.fontSize="1.2em";
	div.style.backgroundColor="yellow";
	div.appendChild(document.createTextNode(bdyTxt));
}
