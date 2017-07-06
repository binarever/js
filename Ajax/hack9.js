var request;
var symbol;

function getStockPrice(sym)
{
	symbol=sym;
	if(sym)
	{
		var url="http://localhost/Ajax/test2.html?symbol="+sym;
		httpRequest("GET",url,true);
	}
}

function handleResponse()
{
	if(request.State==4)
	{
		if(request.status==200)
		{
			var stockPrice=request.responseText;
			var info="&#171;The price is:$"+stockPrice+"&#187;";
			document.getElementById("stPrice").style.fontSize="0.9em";
			document.getElementById("stPrice").style.backgroundColor="yellow";
			document.getElementById("stPrice").innerHTML=info;
		}
		else
		{
			alert("A problem occurred with communicating between the XMLHttpRequst object and the server program.");
		}
	}
}
