/**
 * Request generate script v1.60
 *   by 6646
 *
 * Changelog:
 *   2016/07/30 ...  v1.00 - first version.
 *   2016/08/01 ...  v1.50 - add asm request generate function
 *   2016/10/19 ...  v1.60 - add previous parameter save function
 */

// global values
var isReqTypeSelect;
var music_keys = ['songname', 'songtype', 'sampled', 'spc_url', 'youtube_url', 'mp3_url', 'midi_url', 'composition_details'];
var asm_keys = ['asmname', 'asmtype', 'asm_sdesc', 'asm_res', 'asm_image1', 'asm_image2', 'asm_image3', 'asm_image4', 'asm_video', 'asm_ldesc'];

function onChangeReqType(){
	// delete empty select
	if(false == isReqTypeSelect){
		this.options[0] = null;
		isReqTypeSelect = true;
	}
	
	if(this.value == 1){
		// music
		document.getElementById("musicReq").style.display = "";
		document.getElementById("asmReq").style.display = "none";
	}
	else{
		// asm
		document.getElementById("musicReq").style.display = "none";
		document.getElementById("asmReq").style.display = "";
	}
	document.getElementById("out_main").style.display = "none";
	document.getElementById("output").value = "";
	document.getElementById("err").innerHTML = "";
}

function onGenerateMusicRequest(){
	var isError = false;
	var errorMsg = "";
	var request_txt = "Request:\n";

	request_txt += "<table cellspacing=\"0\" class=\"generic\">\n";

	// Name
	if(this.songname.value==""){
		isError = true;
		errorMsg += "<p>Error: Please input \"Name\".<p>";
	}
	else{
		request_txt += "<tr><td class=\"cell1\">Name</td>";
		request_txt += "<td class=\"cell2\">" + this.songname.value + "</td></tr>\n";
	}
	
	// Song type
	request_txt += "<tr><td class=\"cell1\">Type</td>";
	request_txt += "<td class=\"cell2\">" + this.songtype.options[this.songtype.selectedIndex].text + "</td></tr>\n";
	
	// Sampled
	request_txt += "<tr><td class=\"cell1\">Sampled</td>";
	request_txt += "<td class=\"cell2\">" + this.sampled.options[this.sampled.selectedIndex].text + "</td></tr>\n";
	
	// Refer
	if(this.songtype.value == 1){
		// port
		var isInput = false;
		
		// SPC
		if(this.spc_url.value != ""){
			isInput = true;
			request_txt += "<tr><td class=\"cell1\">SPC file</td>";
			request_txt += "<td class=\"cell2\">[url=" + this.spc_url.value + "]Link[/url]</td></tr>\n";
		}
		// Youtube
		if(this.youtube_url.value != ""){
			isInput = true;
			request_txt += "<tr><td class=\"cell1\">Youtube</td>";
			request_txt += "<td class=\"cell2\">[url=" + this.youtube_url.value + "]Link[/url]</td></tr>\n";
		}
		// mp3
		if(this.mp3_url.value != ""){
			isInput = true;
			request_txt += "<tr><td class=\"cell1\">mp3 file</td>";
			request_txt += "<td class=\"cell2\">[url=" + this.mp3_url.value + "]Link[/url]</td></tr>\n";
		}
		// midi
		if(this.midi_url.value != ""){
			isInput = true;
			request_txt += "<tr><td class=\"cell1\">midi file</td>";
			request_txt += "<td class=\"cell2\">[url=" + this.midi_url.value + "]Link[/url]</td></tr>\n";
		}
		
		if(false == isInput){
			isError = true;
			errorMsg += "<p>Error: Please input least one of \"Porting reference URLs\".<p>";
		}
	}
	else{
		// composition
		if(this.composition_details.value != ""){
			request_txt += "<tr><td class=\"cell1\">Composition details</td>";
			request_txt += "<td class=\"cell2\">" + this.composition_details.value + "</td></tr>\n";
		}
		else{
			isError = true;
			errorMsg += "<p>Error: Please input \"Composition details\".<p>";
		}
	}

	request_txt += "</table>";
	document.getElementById("err").innerHTML = errorMsg;
	
	if(isError){
		document.getElementById("output").value = "";
		document.getElementById("out_main").style.display = "none";
	}
	else{
		document.getElementById("output").value = request_txt;
		document.getElementById("out_main").style.display = "";
	}
	
	return false;
}

function onGenerateAsmRequest(){
	var isError = false;
	var isRefInput = false;
	var images = [];
	var errorMsg = "";
	var request_txt = "Request:\n";

	request_txt += "<table cellspacing=\"0\" class=\"generic\">\n";

	// Name
	if(this.asmname.value==""){
		isError = true;
		errorMsg += "<p>Error: Please input \"Name\".<p>";
	}
	else{
		request_txt += "<tr><td class=\"cell1\">Name</td>";
		request_txt += "<td class=\"cell2\">" + this.asmname.value + "</td></tr>\n";
	}

	// Type
	request_txt += "<tr><td class=\"cell1\">Type</td>";
	request_txt += "<td class=\"cell2\">" + this.asmtype.options[this.asmtype.selectedIndex].text + "</td></tr>\n";
	
	// Short description
	if(this.asm_sdesc.value==""){
		isError = true;
		errorMsg += "<p>Error: Please input \"Short description\".<p>";
	}
	else{
		request_txt += "<tr><td class=\"cell1\">Short description</td>";
		request_txt += "<td class=\"cell2\">" + this.asm_sdesc.value + "</td></tr>\n";
	}

	// Resources
	request_txt += "<tr><td class=\"cell1\">Resources</td>";
	if(this.asm_res.value==""){
		request_txt += "<td class=\"cell2\">N/A</td></tr>\n";
	}
	else{
		request_txt += "<td class=\"cell2\">[url=" + this.asm_res.value + "]Link[/url]</td></tr>\n";
	}

	// Reference Links
	// --- images
	if(this.asm_image1.value != ""){
		isRefInput = true;
		images.push(this.asm_image1.value);
	}
	if(this.asm_image2.value != ""){
		isRefInput = true;
		images.push(this.asm_image2.value);
	}
	if(this.asm_image3.value != ""){
		isRefInput = true;
		images.push(this.asm_image3.value);
	}
	if(this.asm_image4.value != ""){
		isRefInput = true;
		images.push(this.asm_image4.value);
	}
	if(0 < images.length){
		request_txt += "<tr><td class=\"cell1\">Images</td>";
		request_txt += "<td class=\"cell2\">";
		for (var i=0; i<images.length; i++){
			request_txt += "(" + (i+1) + ")[img]" + images[i] + "[/img]\n";
		}
		request_txt += "</td></tr>\n";
	}
	// --- video
	if(this.asm_video.value != ""){
		isRefInput = true;
		request_txt += "<tr><td class=\"cell1\">video</td>";
		request_txt += "<td class=\"cell2\">[url=" + this.asm_video.value + "]Link[/url]</td></tr>\n";
	}
	// --- ref check
	if(false == isRefInput){
		request_txt += "<tr><td class=\"cell1\">Reference</td>";
		request_txt += "<td class=\"cell2\">N/A</td></tr>\n";
	}

	// Long description
	if(this.asm_ldesc.value==""){
		isError = true;
		errorMsg += "<p>Error: Please input \"Long description\".<p>";
	}
	else{
		request_txt += "<tr><td class=\"cell1\">Long description</td>";
		request_txt += "<td class=\"cell2\">" + this.asm_ldesc.value + "</td></tr>\n";
	}

	request_txt += "</table>";
	document.getElementById("err").innerHTML = errorMsg;
	
	if(isError){
		document.getElementById("output").value = "";
		document.getElementById("out_main").style.display = "none";
	}
	else{
		document.getElementById("output").value = request_txt;
		document.getElementById("out_main").style.display = "";
	}

	return false;
}

function onSongTypeChange(){
	var selected = this.options[this.selectedIndex].value;
	if(selected == 1){
		// port
		document.getElementById("row_spc").style.display = "";
		document.getElementById("row_youtube").style.display = "";
		document.getElementById("row_mp3").style.display = "";
		document.getElementById("row_midi").style.display = "";
		document.getElementById("row_composition_details").style.display = "none";
	}
	else{
		// composition
		document.getElementById("row_spc").style.display = "none";
		document.getElementById("row_youtube").style.display = "none";
		document.getElementById("row_mp3").style.display = "none";
		document.getElementById("row_midi").style.display = "none";
		document.getElementById("row_composition_details").style.display = "";
	}
	document.getElementById("out_main").style.display = "none";
	document.getElementById("output").value = "";
	document.getElementById("err").innerHTML = "";
}

function onAsmReset(){
	document.getElementById("row_composition_details").style.display = "none";
	document.getElementById("out_main").style.display = "none";
	document.getElementById("err").innerHTML = "";
}

function onMusicReset(){
	// reset songtype
	this.songtype.value = 1;
	this.songtype.onchange();
	document.getElementById("row_composition_details").style.display = "none";
	document.getElementById("out_main").style.display = "none";
	document.getElementById("err").innerHTML = "";
}

window.addEventListener('load', function(e){
	isReqTypeSelect = false;
	
	var element;

	// type select
	element = document.getElementById("req_type_form");
	element.req_type.onchange = onChangeReqType;

	// music
	element = document.getElementById("music_req_form");
	element.onsubmit = onGenerateMusicRequest;
	element.songtype.onchange = onSongTypeChange;
	element.onreset = onMusicReset;
	document.getElementById("musicReq").style.display = "none";

	// asm
	element = document.getElementById("asm_req_form");
	element.onsubmit = onGenerateAsmRequest;
	element.onreset = onAsmReset;
	document.getElementById("asmReq").style.display = "none";
	
	document.getElementById("row_composition_details").style.display = "none";
	document.getElementById("out_main").style.display = "none";
	
	//load previous form imputs
	var music_elem = document.getElementById('music_req_form');
	for(var i=0; i<music_keys.length; i++){
		eval('music_elem.' + music_keys[i] + '.value = JSON.parse(localStorage[music_keys[i]])');
	}
	var asm_elem = document.getElementById('asm_req_form');
	for(var i=0; i<asm_keys.length; i++){
		eval('asm_elem.' + asm_keys[i] + '.value = JSON.parse(localStorage[asm_keys[i]])');
	}

	// Update form
	music_elem.songtype.onchange();

}, false);

window.addEventListener('beforeunload', function(e){
	// save the music request info
	var music_elem = document.getElementById('music_req_form');
	for(var i=0; i<music_keys.length; i++){
		localStorage[music_keys[i]] = JSON.stringify(eval('music_elem.' + music_keys[i] + '.value'));
	}

	// save the asm request info
	var asm_elem = document.getElementById('asm_req_form');
	for(var i=0; i<asm_keys.length; i++){
		localStorage[asm_keys[i]] = JSON.stringify(eval('asm_elem.' + asm_keys[i] + '.value'));
	}

}, false);
