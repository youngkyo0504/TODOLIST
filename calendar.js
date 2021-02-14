import { TodoList } from "./todolist.js";

var saveDate;
const nextMonth = document.getElementById("right");
const lastMonth = document.getElementById("left");
const nav = document.querySelector(".navigator");
const viewDays = document.querySelectorAll(".viewDays");
const calendar_name = document.querySelector(".calendar_name");
const blockline6 = document.querySelector(".blockline6");
const id_today = document.getElementById("today");
const dayBlock = document.querySelector(".day_block");
const year_month = document.querySelector(".year_month");

const getFirstDaysInMonth = function (month, year) {
  // Here January is 1 based
  //Day 0 is the last day in the previous month
  return new Date(year, month, 1).getDay();
};
const getDaysInMonth = function (month, year) {
  // Here January is 1 based
  //Day 0 is the last day in the previous month
  return new Date(year, month + 1, 0).getDate();
};

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();
const dayOfTheWeek = today.getDay();
const date = today.getDate();

const firstDay = getFirstDaysInMonth(month, year);
const DaysInMonth = getDaysInMonth(month, year);
const DaysInLastMonth = getDaysInMonth(month - 1, year);

const todolist = new TodoList();

function setmonth(n) {
  today.setDate(1);
  today.setMonth(today.getMonth() + n);

  const newyear = today.getFullYear();
  const newmonth = today.getMonth();
  const newdayOfTheWeek = today.getDay();
  const newdate = today.getDate();
  saveDate = `${newyear}${
    newmonth + 1 < 10 ? `0${newmonth + 1}` : newmonth + 1
  }`;
  year_month.textContent = `${newyear}년 ${newmonth + 1}월`;

  const newfirstDay = getFirstDaysInMonth(newmonth, newyear);
  const newDaysInMonth = getDaysInMonth(newmonth, newyear);
  const newDaysInLastMonth = getDaysInMonth(newmonth - 1, newyear);

  writeDate(newfirstDay, newDaysInMonth, newDaysInLastMonth, newmonth, newyear);
  if (newyear === year && newmonth === month) {
    viewDays[firstDay + date - 1].classList.add("today");
  }

  return saveDate;
}

function writeDate(firstDay, DaysInMonth, DaysInLastMonth, m, y) {
  let cnt = 1;

  for (let i = firstDay; i < firstDay + DaysInMonth; i++) {
    const newdays = i - firstDay + 1;
    const RealsaveDate = `${y}${`${m + 1}` < 10 ? `0${m + 1}` : `${m + 1}`}${
      newdays < 10 ? `0${newdays}` : newdays
    }`;
    const pageDate = Number(RealsaveDate);
    const presentLocal = localStorage.getItem(pageDate);
    if (presentLocal !== null) {
      viewDays[i].classList.add("presentTodo");
    } else {
      viewDays[i].classList.remove("presentTodo");
    }
    viewDays[i].textContent = `${i - firstDay + 1}`;
    viewDays[i].classList.remove("notAMonth");
    viewDays[i].parentElement.classList.remove("noClick");
  }

  if (
    viewDays[
      firstDay + DaysInMonth - 1
    ].parentElement.parentElement.classList.contains("blockline6")
  ) {
    blockline6.classList.remove("hidden");
  } else {
    blockline6.classList.add("hidden");
  }
  const lastday = viewDays[firstDay + DaysInLastMonth - 1];
  cnt = 1;
  for (let i = firstDay + DaysInMonth; i < viewDays.length; i++) {
    viewDays[i].textContent = `${cnt}`;
    cnt += 1;
    viewDays[i].parentElement.classList.add("noClick");
    viewDays[i].classList.add("notAMonth");
    viewDays[i].classList.remove("presentTodo");
  }
  cnt = DaysInLastMonth;
  for (let i = firstDay - 1; i > -1; i--) {
    viewDays[i].textContent = `${cnt}`;

    cnt -= 1;
    viewDays[i].parentElement.classList.add("noClick");
    viewDays[i].parentNode.parentNode.parentNode.onclick = false;
    viewDays[i].classList.add("notAMonth");
    viewDays[i].classList.remove("presentTodo");
  }
}
///event
dayBlock.addEventListener("click", (event) => {
  if (event.target.classList.contains("noClick")) {
    return;
  }
  if (event.target.classList.contains("box")) {
    const newdate = event.target.textContent;
    const RealsaveDate = `${saveDate}${newdate < 10 ? `0${newdate}` : newdate}`;
    const pageDate = Number(RealsaveDate);
    todolist.showTodolist(pageDate);
    todolist.eventTarget = event.target;

    //이것 변수로 바꿔야됨 year+month+date
  }
});

lastMonth.addEventListener("click", () => {
  viewDays[firstDay + date - 1].classList.remove("today");
  setmonth(-1);
});
id_today.addEventListener("click", () => {
  writeDate(firstDay, DaysInMonth, DaysInLastMonth, month, year);
  viewDays[firstDay + date - 1].classList.add("today");
  year_month.textContent = `${year}년 ${month + 1}월`;
  today.setFullYear(year);
  today.setMonth(month);
});

nextMonth.addEventListener("click", () => {
  viewDays[firstDay + date - 1].classList.remove("today");
  setmonth(1);
});

function init() {
  writeDate(firstDay, DaysInMonth, DaysInLastMonth, month, year);
  viewDays[firstDay + date - 1].classList.add("today");
  setmonth(0);
  year_month.textContent = `${year}년 ${month + 1}월`;
}
init();
