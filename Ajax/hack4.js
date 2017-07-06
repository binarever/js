var request;
var symbol;
var numberOfShares;

function getStockPrice(sym,shs)
{
	if(sym&&shs)
	{
		symbol=sym;
		numberOfShares=shs;
		var url="http://localhost/Ajax/test.html?symbol="+sym;
		httpRequest("GET",url,true);
	}
}

function handleResponse()
{
	if(request.readyState==4)
	{
		alert(request.status);
		if(request.status==200)
		{
			var stockPrice=request.responseText;
			try
			{
				if(isNaN(stockPrice))
				{
					throw new Error("The returned price is an invalid number.");
				}
				if(isNaN(numberOfShares))
				{
					throw new Error("The share amount is an invalid number.");
				}
				var info="Total stock value: "+calcTotal(stockPrice);
				displayMsg(document.getElementById("msgDisplay"),info,"black");
				document.getElementById("stPrice").style.fontSize="0.9em";
				document.getElementById("stPrice").style.innerHTML="price: "+stockPrice;
			}
			catch(err)
			{
				displayMsg(document.getElementById("msgDisplay"),"An error occurred: "+err.message,"red");
			}
		}
		else
		{
			alert("A problem occurred with communicating between the XMLHttpRequest object and the server program.");
		}
	}
}

function calcTotal(price)
{
	return stripExtraNumbers(numberOfShares*price);
}

function stripExtraNumbers(num)
{
	var n2=num.toString();
	if(n2.indexOf(".")==-1)
		return num;

	if(typeof num=="string")
	{
		num=parseFloat(num).toFixed(4);
	}
	else
	{
		num=num.toFixed(4);
	}
	return parseFloat(num.toString().replace(/0*$/,""));
}

function displayMsg(div,bdyText,txtColor)
{
	div.innerHTML="";
	div.style.backgroundColor="yellow";
	div.style.color=txtColor;
	div.innerHTML=bdyText;
}
