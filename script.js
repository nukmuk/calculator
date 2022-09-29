let displayValue = "";
let pendingOperation = {};
let lastOperation = undefined;
let a = 0;
let b = 0;
const RESULT = document.querySelector(".result");

// number key events
const numbers = document.querySelectorAll(".number");
console.log(numbers);
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
	pendingOperation.operation = undefined;
	pendingOperation.startInputtingB = false;
});

// operator key events
const operators = document.querySelectorAll(".operator");
for (const btn of operators) {
	btn.addEventListener("click", () => {
		const operation = btn.classList[1];
		a = displayValue;
		pendingOperation.operation = operation;
		pendingOperation.startInputtingB = true;

		console.log(pendingOperation);
		console.log(`a: ${a}`);
		console.log(`b: ${b}`);
	});
}

// equals key event
const equalsBtn = document.querySelector(".equals");
equalsBtn.addEventListener("click", () => {
	let operation = pendingOperation.operation;
	console.log(`operation: ${operation}`);
	console.log(`lastOperation: ${lastOperation}`);

	if (!operation && !lastOperation) {
		return;
	}

	if (!operation) {
		operation = lastOperation;
	} else {
		b = displayValue;
		console.log("Set b to: " + b);
	}

	a = operate(operation, a, b);
	console.log("newValue (a): " + a);
	setDisplayValue(a);
	pendingOperation.operation = undefined;
	lastOperation = operation;
});

// functions
function numberPressed(number) {
	if (displayValue == 0 || pendingOperation.startInputtingB) {
		setDisplayValue(`${number}`);
		pendingOperation.startInputtingB = false;
	} else {
		setDisplayValue(`${displayValue}${number}`);
	}
}

function setDisplayValue(value) {
	console.log("Setting display to: " + value);
	const length = String(value).length;
	let fontSize = 96;

	if (length == 17) {
		return console.log("display full");
	} else if (length > 17) {
		return setDisplayValue("overflow");
	}

	const limit = 7;
	console.log("Length: " + length);
	if (length > limit) {
		fontSize = 96 / (length / limit);
	}

	displayValue = value;
	RESULT.innerText = displayValue;
	RESULT.style.fontSize = `${fontSize}px`;
}

function operate(operation, x, y) {
	x = Number(x);
	y = Number(y);
	if (typeof x != "number" || typeof y != "number") {
		return console.log(`Not numbers: x: ${typeof x}, y: ${typeof y}`);
	}

	switch (operation) {
		case "add":
			return add(x, y);
		case "subtract":
			return subtract(x, y);
		case "multiply":
			return multiply(x, y);
		case "divide":
			return divide(x, y);

		default:
			console.log(`Invalid operation: ${operation}`);
			break;
	}
}

function add(x, y) {
	return x + y;
}
function subtract(x, y) {
	return x - y;
}
function multiply(x, y) {
	return x * y;
}
function divide(x, y) {
	return x / y;
}
