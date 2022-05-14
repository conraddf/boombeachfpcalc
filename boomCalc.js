function calcFp(startFp, resetOccured, dailyFP) {
	let lastFp = 0;
	let day = 0;
	let fp = startFp;
	const points = [];
	
	if (!resetOccured) {
		fp = Math.ceil(fp * .95);
	}
	points[0] = fp;
	do {
		lastFp = fp;
		fp += dailyFP;
		points[++day] = fp;
		console.log(`day ${day} fp ${fp}`);
		fp = Math.ceil(fp * .95);
	} while (lastFp != fp);

	console.log("days until max: " + day);
	return points;
}

function getNumericValue(input, message) {
	if (!input) {
		alert (message);
		return -1;
	}

	const val = input.value.trim()
	if (val === "") {
		alert (message);
		return -1;
	}

	const num = Number(val);
	if (!(Number.isInteger(num) && num >= 0)) {
		alert (message);
		return -1;
	}
	return num;
}

function resetTables(dayResult, breakdownTable) {
	dayResult.innerHTML = "";
	breakdownTable.innerHTML = "";
}

function printResults(points, dayResult, breakdownTable) {
	const dayRow = dayResult.insertRow(dayResult.rows.length);
	const dayCell = dayRow.insertCell(-1);
	dayCell.innerHTML = points.length - 1;

	for (let i = 0; i < points.length; i++) {
		const row = breakdownTable.insertRow(breakdownTable.rows.length);
		let cell = row.insertCell(-1);
		cell.innerHTML = i;
		cell = row.insertCell(-1);
		cell.innerHTML = points[i];
	}
}

const form = document.getElementById("fp");

const DAILY_FP_REQUIRED = "Please enter a positive integer for Operation Force Points";
const START_FP_REQUIRED = "Please enter a positive integer for Starting Force Points";

form.addEventListener("submit", function (event) {
	event.preventDefault();

	// validate the form
	const startFpVal = getNumericValue(form.elements["startFp"], START_FP_REQUIRED);
	const dailyFpVal = getNumericValue(form.elements["dailyFp"], DAILY_FP_REQUIRED);
	// if valid, submit the form.
	if ((dailyFpVal >= 0) && (startFpVal >= 0)) {
		const points = calcFp(startFpVal, form.elements["reset"].checked, dailyFpVal);
		// console.log(points);
		resetTables(document.getElementById("maxDays"), document.getElementById("breakdown"));
		printResults(points, document.getElementById("maxDays"), document.getElementById("breakdown"));
	}

});