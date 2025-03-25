function appendToDisplay(value) {
    const display = document.getElementById('display');
    display.value += value;
}

function clearDisplay() {
    const display = document.getElementById('display');
    display.value = '';
}

function calculate() {
    const display = document.getElementById('display');
    try {
        display.value = eval(display.value.replace(/sqrt/g, 'Math.sqrt').replace(/sin/g, 'Math.sin').replace(/cos/g, 'Math.cos').replace(/tan/g, 'Math.tan')); // Calculate the result
    } catch (error) {
        display.value = 'Error'; // Show error for invalid input
        setTimeout(clearDisplay, 1500); // Clear after 1.5 seconds
    }
}

function switchMode(mode) {
    const classicButtons = document.getElementById('classicButtons');
    const advancedButtons = document.getElementById('advancedButtons');
    
    if (mode === 'advanced') {
        classicButtons.style.display = 'none';
        advancedButtons.style.display = 'grid'; // Show advanced buttons
    } else {
        classicButtons.style.display = 'grid'; // Show classic buttons
        advancedButtons.style.display = 'none';
    }
}