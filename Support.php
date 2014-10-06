<?php
$html5 = '<!DOCTYPE html>
<html>';
$xhtml1 = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">';
echo <<<MAIN_DOCUMENT
$html5
MAIN_DOCUMENT;

?>



<head>

	<title>Support.js</title>
	
	<script language="javascript" type="text/javascript" src="Support.js"></script>
	
	<support:path default=".."></support:path>
	
	<support:package name="UI"></support:package>
	
	<support:package name="App"></support:package>
</head>

<body>
	<!-- support.app.client || window .myClip, .MYCLIP, .myclip is defined -->
	<Clip:myClip id="myClip">Contents</Clip:myClip>
	<!-- support.app.client || window .myOtherClip, .MYOTHERCLIP, .myotherclip is defined -->
	<div id="clip:myOtherClip">More Contents</div>
	<!-- global, .MYOTHEROTHERCLIP, .myotherotherclip is defined -->
	<UI.Clip:myOtherOtherClip>More Than More Contents</UI.Clip:myOtherOtherClip>
	<div id="UI.CLIP:myOtherOtherOtherClip">More Than More Than More Contents</div>
</body>

</html>

	

