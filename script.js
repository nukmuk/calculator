let displayValue = "";
const RESULT = document.querySelector(".result");

const numbers = document.querySelectorAll(".number");
console.log(numbers);
for (const button of numbers) {
	button.addEventListener("click", () => {
		const digit = button.innerText;
		numberPressed(digit);
	});
}

function numberPressed(number) {
	if (displayValue.length > 16) {
		return console.log("display full");
	}
	displayValue = `${displayValue}${number}`;
	RESULT.innerText = displayValue;
}

function operate(operation, a, b) {
	switch (operation) {
		case add:
			return a + b;
		case subtract:
			return a - b;
		case multiply:
			return a * b;
		case divide:
			return a / b;

		default:
			break;
	}
}

function add(a, b) {
	return a + b;
}
function subtract(a, b) {
	return a - b;
}
function multiply(a, b) {
	return a * b;
}
function divide(a, b) {
	return a / b;
}
