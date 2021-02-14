const whatisyourname = document.querySelector(".whatisyourname");
const calenderName = document.querySelector(".calendar_name");
const form_js = document.querySelector(".form_js");
const form = form_js.querySelector("form");
const input = form.querySelector("input");

function loadName() {
  const currentUser = localStorage.getItem("currentUser");
  if (currentUser) {
  } else {
    askForName();
    whatisyourname.classList.remove("hidden");
  }
  const currentUserName = localStorage.getItem("currentUser");
  calenderName.textContent = `Hi ${currentUserName}`;
}

function submitName() {
  const currentValue = input.value;

  localStorage.setItem("currentUser", currentValue);
}
function askForName() {
  form.addEventListener("submit", () => {
    submitName();
  });
}

function init() {
  loadName();
}
init();
