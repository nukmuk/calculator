let state = {};
state.displayValue = "";
state.pendingOperation = undefined;
state.lastOperation = undefined;
state.clearOnNextPress = false;
state.memory = 0;
let a = 0;
let b = 0;

const RESULT = document.querySelector(".result");

// number key events
const numbers = document.querySelectorAll(".number");
for (const btn of numbers) {
	btn.addEventListener("click", () => {
		const digit = btn.innerText;
		addToDisplay(digit);
	});
}

// dot events
document.querySelector(".dot").addEventListener("click", () => {
	if (String(state.displayValue).includes(".") && !state.clearOnNextPress) {
		console.log("already decimal");
		return;
	}
	addToDisplay(".");
});

// clear key event
const clearBtn = document.querySelector(".clear");
clearBtn.addEventListener("click", () => {
	setDisplayValue(0);
	state.pendingOperation = undefined;
	state.lastOperation = undefined;
	state.clearOnNextPress = false;
	state.inputtingB = false;
	state.memory = 0;
	a = 0;
	b = 0;
	changeKeyColor();
});

// plusminus key
document.querySelector(".sign").addEventListener("click", () => {
	const negative = state.displayValue * -1;
	setDisplayValue(negative);
});

// percent key
document.querySelector(".percent").addEventListener("click", () => {
	const percent = state.displayValue / 100;
	setDisplayValue(percent);
});

// operator key events
const operators = document.querySelectorAll(".operator");
for (const btn of operators) {
	btn.addEventListener("click", () => {
		const btnOperation = btn.classList[1];
		console.log(`click operator, pstate: ${state.pendingOperation}`);

		state.inputtingB = true;
		if (state.pendingOperation) {
			if (state.inputtingB) {
				b = state.displayValue;
			}
			a = finalizePending();
		} else {
			a = state.displayValue;
		}
		state.pendingOperation = btnOperation;
		state.clearOnNextPress = true;

		changeKeyColor();

		console.log(`after op, a: ${a}`);
		console.log(`after op, b: ${b}`);
	});
}

// equals key event
const equalsBtn = document.querySelector(".equals");
equalsBtn.addEventListener("click", () => {
	if (!state.inputtingB) {
		setDisplayValue(Number(state.displayValue));
		return console.log("equals");
	}
	b = state.displayValue;
	const result = finalizePending();
	setDisplayValue(result);
	state.inputtingB = false;
	changeKeyColor();
});

// functions
function finalizePending() {
	console.log(`finalizePending: `);
	console.log(state);
	console.log(`f a: ${a}`);
	console.log(`f b: ${b}`);

	if (state.pendingOperation == "divide" && b == 0) {
		return "nt";
	}

	const op = state.pendingOperation;
	const result = operate(op, a, b);
	a = result;
	setDisplayValue(result);
	state.pendingOperation = undefined;
	return result;
}

function addToDisplay(char) {
	if (state.displayValue == "0" || state.clearOnNextPress) {
		setDisplayValue(`${char}`);
		state.clearOnNextPress = false;
	} else {
		setDisplayValue(`${state.displayValue}${char}`);
	}
}

function setDisplayValue(value) {
	if (value == ".") {
		value = "0.";
	}

	console.log(`setting display to: ${value}`);
	const length = String(value).length;
	let fontSize = 96;

	const limit = 7;
	if (length > limit) {
		fontSize = 96 / (length / limit);
	}

	state.displayValue = value;
	RESULT.innerText = state.displayValue;
	RESULT.style.fontSize = `${fontSize}px`;
}

function operate(operation, x, y) {
	x = Number(x);
	y = Number(y);

	console.log(`operate: x: ${x} y: ${y}`);
	if (typeof x != "number" || typeof y != "number") {
		return console.log(`Not numbers: x: ${typeof x}, y: ${typeof y}`);
	}

	switch (operation) {
		case "add":
			return x + y;
		case "subtract":
			return x - y;
		case "multiply":
			return x * y;
		case "divide":
			return x / y;

		default:
			console.log(`Invalid operation: ${operation}`);
			break;
	}
}

function changeKeyColor() {
	const buttons = document.querySelectorAll(".operator");
	for (const btn of buttons) {
		if (btn.classList.contains(state.pendingOperation)) {
			btn.style.background = "#cc7f07";
		} else {
			btn.style.background = "#ff9f09";
		}
	}
}
