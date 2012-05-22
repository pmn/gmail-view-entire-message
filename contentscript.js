(function () {

    function checkForCanvasFrame() {
	// Check to see if the message frame has been rendered
	canvas = window.frames['canvas_frame'];
	if (canvas && canvas.contentDocument) {
	    // Determine if this message has been clipped by gmail
	    testForClippedMessage(canvas.contentDocument);
	}
    }

    function insertViewMessageLink(contentDoc, url){
	// Currently Google gives the title bar a class of "ha".
	// This may be an unreliable way to determine the attachment point.
	var titleBar = contentDoc.getElementsByClassName("ha");

	// Build the "View entire message" link
	var vemLink = document.createElement("a");
	// Using a garbage id to reduce chance of collision.
	var elemId = "a9f23ADSFa8f2392rjads293923jfaskdf0q4";
	vemLink.id = elemId;
	vemLink.href = url;
	vemLink.target = "_new";
	vemLink.innerText = "View entire message";

	// Make sure the link hasn't been inserted before:
	if (! contentDoc.getElementById(elemId)) {
	    // Insert the link
	    titleBar[0].appendChild(vemLink);
	}
    }

    function testForClippedMessage(contentDoc){
	// Google assigns the class 'vem' to the "View entire message" link
	// at the bottom of clipped emails.
	var vem = contentDoc.getElementsByClassName("vem");

	if (vem.length > 0) {
	    // Content contains the "View entire message" link, add the shortcut up top.
	    insertViewMessageLink(contentDoc, vem[0]);
	}
    }

    function timer(){
	checkForCanvasFrame();
	setTimeout(timer, 250);
    }

    timer();
    //document.addEventListener('DOMNodeInserted', timer);

})();
