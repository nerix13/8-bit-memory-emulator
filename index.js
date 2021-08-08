const $ = (id) => document.querySelector(id);
		
const ROM = new Uint8Array(0xffff);

// functions

function convertNumberToHex(integer) {
	let str = Number(integer).toString(16);
	return str.length == 1 ? "0" + str : str;
}


function convertAddressToHex(integer) {
	let str = Number(integer).toString(16);
	if (str.length == 1)
		return "000" + str;
	else if (str.length == 2)
		return "00" + str;
	else if (str.length == 3)
		return "0" + str;
	else
		return str;
}


function showMemoryContent(start, end) {
	$("#memory-monitor").value = "";
	for (let i=start; i <= end; i++) {
		let memoryValue = ROM[i],
				memoryAddress = i;

		let textParsed = `${convertAddressToHex(memoryAddress)}: ${convertNumberToHex(memoryValue)}\n`;

		$("#memory-monitor").value += textParsed;
	}
}


function printChar(address) {
	let addressParsed = parseInt(address, 16),
		addressValue = ROM[addressParsed];
	// Only print ASCII characters....
	if (addressValue >= 0 && addressValue <= 127)
		$("#monitor").value = String.fromCharCode(addressValue);
}


function printCharStringByRange(start, end) {
	$("#monitor").value = ""; // clear the monitor
	for (let i=start; i < end; ++i) {
		let char_code = ROM[i];
		// Only print ASCII characters....
		if (char_code >= 0 && char_code <= 127)
			$("#monitor").value += String.fromCharCode(char_code);
	}
}


// ###################[ EVENTS ]####################

// memory handling buttons
$("#show-mem-range-btn").addEventListener("click", () => {
	let startRange = parseInt($("#start-mem-range").value, 16),
		endRange = parseInt($("#end-mem-range").value, 16);
	showMemoryContent(startRange, endRange);
});


$("#write-on-mem-btn").addEventListener("click", () => {
	let address = parseInt($("#memory-address").value, 16),
		addressValue = $("#memory-address-value").value;	
	ROM[address] = addressValue;
	showMemoryContent(0, 255);
});

// chars printing buttons

$("#print-char-btn").addEventListener("click", () => {
	let charAddress = parseInt($("#char-address").value, 16);
	if (charAddress != null) printChar(charAddress);
});


$("#print-char-string-btn").addEventListener("click", () => {
	const startRange = parseInt($("#chars-start-range").value, 16),
		endRange = parseInt($("#chars-end-range").value, 16);
	printCharStringByRange(startRange, endRange);
});


$("#reset-btn").addEventListener("click", () => {
	$("#monitor").value = ""; // clear the monitor
	// clear all memory address
	for (let i=0; i < ROM.length; i++)
		ROM[i] = 0;
	
	showMemoryContent(0, 255); // show memory monitor
});


$("#clear-monitor-btn").addEventListener("click", () => $("#monitor").value = "");


$("#clear-mem-btn").addEventListener("click", () => {
	for(let i=0; i < ROM.length; i++) ROM[i] = 0;
	showMemoryContent(0, 255);
});

window.onload = function() {
	showMemoryContent(0, 255)
}

