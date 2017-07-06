function showPic(whichpic)
{
	if(!document.getElementById("placeholder"))
		return false;
	/*document.getElementById("placeholder").setAttribute("src",whichpic.getAttribute("href"));*/
	var source=whichpic.getAttribute("href");
	var placeholder=document.getElementById("placeholder");
	if(placeholder.nodeName!="IMG")
		return false;
	placeholder.setAttribute("src",source);
	
	if(document.getElementById("description"))
	{
		var text=whichpic.getAttribute("title")?whichpic.getAttribute("title"):"";
		var description=document.getElementById("description");
		/*description.firstChild.nodeValue=text;*/
		if(description.firstChild.nodeType==3)
		{
			description.firstChild.nodeValue=text;
		}
	}

	return true;
}

/*function countBodyChildren()
{
	var body_element=document.getElementsByTagName("body")[0];
	alert(body_element.childNodes.length);
}
*/

/*window.onload=countBodyChildren;*/

function prepareGallery()
{
	if(!document.getElementById("imagegallery")||!document.getElementById||!document.getElementsByTagName)
		return false;

	var gallery=document.getElementById("imagegallery");
	var links=gallery.getElementsByTagName("a");
	/*document.getElementById("imagegallery").getElementsByTagName("a");*/
	for(var i=0;i<links.length;i++)
	{
		links[i].onclick=function(){
			return showPic(this);
		}
		links[i].onkeypress=links[i].onclick;
	}
}

function preparePlaceholder()
{
	if(!document.createElement)
		return false;

	if (!document.createTextNode)
		return false;

	if(!document.getElementById)
		return false;

	if(!document.getElementById("imagegallery"))
		return false;

	var placeholder=document.createElement("img");
	placeholder.setAttribute("id","placeholder");
	placeholder.setAttribute("src","images/placeholder.jpg");
	placeholder.setAttribute("alt","my image gallery");
	var description=document.createElement("p");
	description.setAttribute("id","description");
	var desctext=document.createTextNode("Choose an image");
	description.appendChild(desctext);


	document.getElementsByTagName("body")[0].appendChild(placeholder);
	document.getElementsByTagName("body")[0].appendChild(description);

	/*document.body.appendChild(placeholder);
	document.body.appendChild(description);*/

	/*insertBefore*/
	/*var gallery=getElementById("imagegallery");
	gallery.parentNode.insertBefore(placeholder,gallery);*/

	var gallery=getElementById("imagegallery");
	insertAfter(placeholder,gallery);
	insertAfter(description,placeholder);
}

function insertAfter(newElement,targetElement)
{
	var parent=targetElement.parentNode;
	if(parent.lastChild==targetElement)
	{
		parent.appendChild(newElement);
	}
	else
	{
		parent.insertBefore(newElement,targetElement.nextSibling);
	}
}

function addLoadEvent(func)
{
	var oldonload=window.onload;
	if(typeof window.onload!='function')
	{
		window.onload=func;
	}
	else
	{
		window.onload=function(){
			oldonload();
			func();
		}
	}
}

addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);