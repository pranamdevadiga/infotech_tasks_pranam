let startTime, updatedTime, difference, timerInterval;
let isRunning = false;
const display = document.getElementById('display');
const lapsList = document.getElementById('lapsList');

document.getElementById('start').addEventListener('click', start);
document.getElementById('pause').addEventListener('click', pause);
document.getElementById('reset').addEventListener('click', reset);
document.getElementById('lap').addEventListener('click', recordLap);

function start() {
    if (!isRunning) {
        isRunning = true;
        startTime = new Date().getTime() - (difference || 0);
        timerInterval = setInterval(updateDisplay, 1000);
    }
}

function pause() {
    if (isRunning) {
        isRunning = false;
        clearInterval(timerInterval);
        difference = new Date().getTime() - startTime;
    }
}

function reset() {
    isRunning = false;
    clearInterval(timerInterval);
    display.textContent = '00:00:00';
    difference = 0;
    lapsList.innerHTML = '';
}

function recordLap() {
    if (isRunning) {
        const lapTime = display.textContent;
        const lapItem = document.createElement('li');
        lapItem.textContent = lapTime;
        lapsList.appendChild(lapItem);
    }
}

function updateDisplay() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    const time = new Date(difference);

    const hours = String(time.getUTCHours()).padStart(2, '0');
    const minutes = String(time.getUTCMinutes()).padStart(2, '0');
    const seconds = String(time.getUTCSeconds()).padStart(2, '0');

    display.textContent = `${hours}:${minutes}:${seconds}`;
}
