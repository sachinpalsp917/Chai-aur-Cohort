const inputNum = document.getElementById("input-num"); //input field to get num
const timer = document.getElementById("timer"); //countdown timer
const inputButton = document.getElementById("input-btn"); // start countdown timer

function startTimer() {
  let value = parseInt(inputNum.value);
  if (isNaN(value)) {
    timer.innerText = "Please enter a number";
    return;
  }

  if (value <= 0) {
    timer.innerText = "Please enter number >0";
    return;
  }

  const timer1 = setInterval(function () {
    value--;
    timer.innerText = `${value}`;
    if (value <= 0) {
      clearInterval(timer1);
      timer.innerText = "Time up";
    }
  }, 1 * 1000);
}

inputButton.addEventListener("click", startTimer);
