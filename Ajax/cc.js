var finalCnumber;

window.onload=function()
{
	document.forms[0].onsubmit=function()
	{
		verify(this.cc.value,this.scode.value,this.cctype.value,this.exp_month.value+" "+this.exp_year.value);
		return false;
	};
}

function verify(ccard,secure_code,cctype,ccexp)
{
	if(secure_code.length<3)
	{
		eMsg("Please enter a valid value for the security code.","red");
		return;
	}

	if(cctype=="Choose one...")
	{
		eMsg("Please enter a valid value for the credit card type.","red");
		return;
	}

	if(!clientsideVerify(ccard))
	{
		eMsg("Please enter a valid value for the credit card.","red");
	}
	else
	{
		eMsg("Please wait while we process the credit card.","blue");
		ccard=remDashSpace(ccard);
		url="http://localhost/Ajax/bank.html?cc="+
		encodeURIComponent(ccard)+"&scode="+
		encodeURIComponent(secure_code)+"&type="+
		encodeURIComponent(cctype)+"&exp="+
		encodeURIComponent(ccexp);
		httpRequest("GET",url,true,handleCheck);
	}
}

function clientsideVerify(ccVal)
{
	if(ccVal==null||ccVal.length<13||ccVal.search(/[a-zA-Z]+/)!=-1)
		return false;
	ccVal=remDashSpace(ccVal);
	return (applyLuhn(ccVal)%10)==0
}

function applyLuhn(cc)
{
	var rev=reverse(cc);
	var revArr=rev.split("");
	var total=0;
	var tmp=0;
	for(var i=0;i<revArr.length;i++)
	{
		if((i%2)>0)
		{
			tmp=revArr[i]*2;
			tmp=(tmp<9?tmp:(tmp-9));
			total+=tmp;
		}
		else
		{
			total+=Number(revArr[i])
		}
	}
	return total;
}

function handleCheck()
{
	var sTag,answer,xmlReturnVal;
	if(request.readyState==4)
	{
		if(request.status==200)
		{
			xmlReturnVal=request.responseXML;
			sTag=xmlReturnVal.getElementsByTagName("cc_status")[0];
			answer=sTag.childNodes[0].data;
			if(answer=="okay")
			{
				eMsg("Your purchase information has been submitted to our online store.","blue");
			}
			else
			{
				eMsg("There was a problem with processing the credit card.","red");
			}
		}
		else
		{
			alert("A problem occurred with communicating between the XMLHttpRequset object and the server program");
		}
	}
}

function reverse(str)
{
	var sArray=str.split("");
	var newS="";
	for(var i=sArray.length-1;i>=0;i--)
	{
		newS+=sArray[i];
	}
	return newS;
}

function eMsg(msg,sColor)
{
	var div=document.getElementById("message");
	div.style.color=sColor;
	div.style.fontSize="0.9em";
	if(div.hasChildNodes())
	{
		div.removeChild(div.firstchild);
	}
	div.appendChild(document.createTextNode(msg));
}

function remDashSpace(_number)
{
	number=_number.replace(/-/g,"");
	number=_number.replace(/ /g,"");
	return _number;
}

var csc=document.getElementById("csc");
if(csc!=null)
{
	csc.onblur=function()
	{
		var typ=document.getElementById("cctype");
		if(typ!=null)
		{
			if(csc.value.indexOf("Choose")==-1&&!checkCSC(typ.value,csc.value.replace(/\s/,"")))
			{
				eMsg("Please enter a valid value for the security code.","red");
				csc.focus();
				document.getElementById("submit").disabled=true;
			}
			else
			{
				clearMsg();
				document.getElementById("submit").disabled=false;
			}
		}
	};
}

function checkCSC(cardTyp,fldValue)
{
	var re=null;
	if(cardTyp!=null)
	{
		if(cardTyp=="American Express")
		{
			re=/^\d{4}$/;
			return re.test(fldValue);
		}
		else
		{
			re=/^\d{3}$/;
			return re.test(fld.Value);
		}
	}
}
