var formObj=null;
var formObjTyp="";
var request=null;

window.onload=function()
{
	var txtA=document.getElementById("textarea");
	if(txtA!=null)
	{
		txtA.onblur=function()
		{
			if(this.value)
				getInfo(this);
		};
	}

	var tfd=document.getElementById("tfield");
	if(tfd!=null)
	{
		tfd.onblur=function()
		{
			if(this.value)
				getInfo(this);
		};
	}
}

function getInfo(obj)
{
	if(obj==null)
		return;

	formObj=obj;
	formObjTyp=obj.tagName;
	if((formObjTyp=="input"||formObjTyp=="IMPUT")
	{
		formObjTyp=formObjTyp+" "+formObj.type;	
	}
	formObjTyp=formObjTyp.toLowerCase();
	var url="http://localhost/Ajax/test3.html?objtype="+encodeURIComponent(formObjTyp)+"&val="+encodeURIComponent(obj.value);
	httpRequest("GET",url,true);
}

function handleResponse()
{
	try
	{
		if(request.readyState==4)
		{
			if(request.status==200)
			{
				var resp=request.responseText;
				var func=new Function("return "+resp);
				var objt=func();
				if(formObjTyp=="textarea")
				{
					if(formObj!=null)
					{
						formObj.value=objt.From_field_type+
						"character count: "+objt.Text_length+
						"\nWord count: "+objt.Word_count+
						"\nServer info: "+objt.Server_info;
					}
				}
				else if(formObjTyp=="input text")
				{
					if(formObj!=null)
					{
						formObj.value=objt.Form_field_type+
						"#characters: "+objt.Text_length+
						"Word count: "+objt.Word_count;
					}
				}
				else
				{
					alert("A problem occurred with communicating between the XMLHttpRequest object and the server program.");
				}
			}
		}
	}
	catch(err)
	{
		alert("It does not appear that the server is available for this application.Please try again very soon."+
		"\nError:"+err.message);
	}
}

function initReq(reqType,url,bool)
{
	try
	{
		request.onreadystatechange=handleResponse;
		request.open(reqType,url,bool);
		request.send(null);
	}
	catch(errv)
	{
		alert("The application cannot contact the server at the moment.Please try again in a few seconds.");
	}
}

function httpRequest(reqType,url,asynch)
{
	if(window.XMLHttpRequest)
	{
		request=new XMLHttpRequest();
	}
	else if(window.ActiveXObject)
	{
		request=new ActiveXObject("Msxml2.XMLHTTP");
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
