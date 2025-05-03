
function updateClock() {
    const timeElement = document.getElementById("time");
    const dateElement = document.getElementById("date");

  const dateTime = new Date();
  const hour = dateTime.getHours() % 12 || 12;
  const hours = hour.toString().padStart(2,"0")
  const minutes = dateTime.getMinutes().toString().padStart(2, "0");
  const seconds = dateTime.getSeconds().toString().padStart(2, "0");
  const amPm = dateTime.getHours() <= 12 ? "AM" : "PM";

  const options = {
    weekday:"long",
    year:"numeric",
    month:"long",
    day:"numeric"
  }
  timeElement.innerText = `${hours}:${minutes}:${seconds} ${amPm}`;
  dateElement.innerText = dateTime.toLocaleDateString(undefined,options)
}
setInterval(updateClock, 1000);
updateClock()
