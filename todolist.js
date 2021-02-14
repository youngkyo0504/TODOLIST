export class TodoList {
  constructor() {
    //select dom
    this.closeBtn = document.querySelector(".todo__main > i");
    this.todoContainer = document.querySelector(".todo__container");
    this.addBtn = document.querySelector(".todo__addBtn");
    this.date = document.querySelector(".todo__date");
    this.todoWrite = document.querySelector(".todo__write");
    this.todoList = document.querySelector(".todo__lists");
    this.todoform = document.querySelector(".todo__form");
    this.todoContainer = document.querySelector(".todo__container");
    this.pagedata;
    this.eventTarget;

    //eventlistener
    this.closeBtn.addEventListener("click", this.onRemovePage);
    this.addBtn.addEventListener("click", this.onToggling);
    this.todoform.addEventListener("submit", this.onAddTodolist);
    this.todoList.addEventListener("click", this.onRemoveTodolsit);
    this.todoList.addEventListener("click", this.onCheckTodolist);
  }
  onRemovePage = () => {
    this.todoContainer.classList.add("hidden");
    this.saveTodolist(this.pagedata);
    this.todoList.innerHTML = "";
  };
  onToggling = () => {
    this.addBtn.classList.toggle("isActive");
    this.todoWrite.classList.toggle("isActive");
  };
  onAddTodolist = (event) => {
    event.preventDefault();
    const contents = this.todoWrite.value;
    const todolist = this.paintTodolist(contents, false); //여기서 날짜 넣어야 되는데 어떻게 해야할까?????
    this.todoList.append(todolist);
    this.todoWrite.value = "";
  };
  onRemoveTodolsit = (event) => {
    const trash = event.target;
    if (trash.classList.contains("fa-trash-alt")) {
      this.todoList.removeChild(trash.parentNode);
    }
  };

  onCheckTodolist = (event) => {
    const target = event.target;
    if (target.tagName === "INPUT") {
      target.parentNode.classList.toggle("isDone");
    }
  };

  setDate(date) {
    const d = date.toString();
    const Year = d.slice(0, 4);
    const Month = parseInt(d.slice(4, 6));
    const Day = parseInt(d.slice(6, d.length));

    return `${Year}년 ${Month}월 ${Day}일`;
  }
  paintTodolist(contents, isdone) {
    const todolist = document.createElement("li");
    todolist.classList.add("todo__list", "noselect");
    todolist.innerHTML = `
      <label class ="${
        isdone === true ? "isDone" : ""
      }"><input type="checkbox" name="todo " ${
      isdone === true ? "checked" : ""
    }/> ${contents}</label>
      <i class="fas fa-trash-alt"></i>
    `;
    return todolist;
  }
  saveTodolist(PageDate) {
    const todoLi = this.todoList.querySelectorAll("li");
    const toDos_array = [];
    todoLi.forEach((element) => {
      const toDosText = element.textContent;
      const label = element.querySelector("label");

      const onlyText = toDosText.trim();

      const isDone = label.classList.contains("isDone");
      const toDosObj = {
        contents: onlyText,
        isDone,
      };
      toDos_array.push(toDosObj);
    });

    const viewdays = this.eventTarget.querySelector("div");

    if (toDos_array.length < 1) {
      localStorage.removeItem(PageDate);
      viewdays.classList.remove("presentTodo");
    } else {
      localStorage.setItem(PageDate, JSON.stringify(toDos_array));
      viewdays.classList.add("presentTodo");
    }
  } //완성했는데 날짜를 어떻게 할까

  loadTodolist(date) {
    const toDos = localStorage.getItem(date);
    if (toDos !== null) {
      const parsedToDos = JSON.parse(toDos);

      parsedToDos.forEach((element) => {
        const contents = element.contents;
        const Done = element.isDone;
        const li = this.paintTodolist(contents, Done);
        this.todoList.append(li);
      });
    }
  }
  showTodolist(date) {
    this.todoContainer.classList.remove("hidden");
    this.date.textContent = this.setDate(date); //바꾼부분
    this.pagedata = date;
    this.loadTodolist(date);
  }
}
