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
		numberPressed(digit);
	});
}

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
});

// operator key events
const operators = document.querySelectorAll(".operator");
for (const btn of operators) {
	btn.addEventListener("click", () => {
		const btnOperation = btn.classList[1];
		console.log(`click operator, pstate: ${state.pendingOperation}`);
		if (state.pendingOperation) {
			b = state.displayValue;
			a = finalizePending();
		} else {
			a = state.displayValue;
		}
		state.pendingOperation = btnOperation;
		state.clearOnNextPress = true;
		state.inputtingB = true;

		console.log(`after op, a: ${a}`);
		console.log(`after op, b: ${b}`);
	});
}

// equals key event
const equalsBtn = document.querySelector(".equals");
equalsBtn.addEventListener("click", () => {
	if (!state.inputtingB) {
		return console.log("useless equals");
	}
	b = state.displayValue;
	const result = finalizePending();
	setDisplayValue(result);
	state.inputtingB = false;
});

// functions
function finalizePending() {
	console.log(`finalizePending: `);
	console.log(state);
	console.log(`f a: ${a}`);
	console.log(`f b: ${b}`);

	const op = state.pendingOperation;
	const result = operate(op, a, b);
	a = result;
	return result;
}

function numberPressed(number) {
	if (state.displayValue == 0 || state.clearOnNextPress) {
		setDisplayValue(`${number}`);
		state.clearOnNextPress = false;
	} else {
		setDisplayValue(`${state.displayValue}${number}`);
	}
}

function setDisplayValue(value) {
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
