var user,domain,regex,_match;

window.onload=function()
{
	document.forms[0].onsubmit=function()
	{
		checkAddress(this.email.value);
		return false;
	};
};

function Email(e)
{
	this.emailAddr=e;
	this.message="";
	this.valid=false;
}

function validate()
{
	if(this.emailAddr==null||this.emailAddr.length==0||
	this.emailAddr.indexOf(".")==-1||
	this.emailAddr.indexOf("@")==-1||
	this.emailAddr.indexOf(" ")!=-1)
	{
		this.message="Make sure the email address does not contain any spaces and is otherwise valid"+
		"(e.g.,contains the \"commercial at\"@sign).";
		this.valid=false;
		return;
	}

	regex=/(^\w{2,}\.?\w{2,})@/;
	_match=regex.exec(this.emailAddr);

	if(_match)
	{
		user=RegExp.$1;
		//alert("user: "+user);
	}
	else
	{
		this.message="Make sure the user name is more than two characters, "+
		"does not begin or end with a period(.),or is not otherwise "+
		"invalid!";
		this.valid=false;
		return;
	}

	regex=/@(\[\[\d{1,3}\.\d{1,3}\.\d{1,3}.\{1,3}\]\])$/;
	_match=regex.exec(this.emailAddr);

	if(_match)
	{
		domain=RegExp.$1;
		this.valid=true;
	}
	else
	{
		regex=/@(\w{2,}\.(\w{2,}\.)?[a-zA-Z]{2,3})$/;
		_match=regex.exec(this.emailAddr);
		if(_match)
		{
			domain=RegExp.$1;
			//alert("domain: "+domain);
		}
		else
		{
			this.message="The domain portion of the email had less than 2 chars"+
			"or was otherwise invalid!";
			this.valid=false;
			return;
		}
	}
	this.valid=true;
}

Email.prototype.validate=validate;

function eMsg(msg,sColor)
{
	var div=document.getElementById("message");
	div.style.color=sColor;
	div.style.fontSize="0.9em";

	if(div.hasChildNodes())
		div.removeChild(div.firstChild);
	div.appendChild(document.createTextNode(msg));
}

function checkAddress(val)
{
	var eml=new Email(val);
	var url;
	eml.validate();
	if(!eml.valid)
		eMsg(eml.message,"red");
	if(eml.valid)
	{
		url="http://localhost/Ajax/email.html?email="+encodeURIComponent(val);
		httpRequest("GET0,url,true,handleResponse";)
	}
}

function handleResponse()
{
	var usedTag,answer,xmlReturnVal;
	if(request.readyState==4)
	{
		if(request.status==200)
		{
			xmlReturnVal=request.responseXML;
			usedTag=xmlReturnVal.getElementsByTagName("is_used")[0];
			answer=usedTag.childNodes[0].data;
			if(answer==true)
			{
				eMsg("This user name is not available.Kindly try again.","red");
			}
			else
			{
				eMsg("Your new user name has been saved.","blue");
			}
		}
		else
		{
			alert("A problem occurred with communicating between the XMLHttpRequest object and the server program.");
		}
	}
}
