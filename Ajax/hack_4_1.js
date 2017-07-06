window.onload=function()
{
	var _url="http://www.parkerriver.com/energy,jsp?priceType=";
	if($("fuelType"))
	{
		$("fuelType").onchange=function(){
			try
			{
				showQuote($("msg"),"Fetching energy price...");
				httpRequest("GET",_url+$F("fuelType"),true,handlePrice);
			}
			catch(errv)
			{
				alert("Sorry,but we failed to get the energy price because of this error: "errv.message);
			}
		};
	}
}

function showQuote(_id,txt)
{
	if(_id&&txt)
	{
		_id.innerHTML=txt;
	}
}

function handlePrice()
{
	try
	{
		if(request.readyState==4)
		{
			if(request.status==200)
			{
				var resp=request.responseText;
				if(resp!=null&&resp.length>0)
				{
					showQuote($("msg"),"The requested price is: "+resp);
				}
				else
				{
					showQuote($("msg"),"The price is not available at this time.");
				}
			}
			else
			{
				alert("A problem occurred with communicating between the XMLHttpRequest object and the server program.");
			}
		}
	}
	catch(err)
	{
		alert("It does not appear that the server is avaliable for this appliacation.Please try again very soon.\nError: "+err.message);
	}
}
