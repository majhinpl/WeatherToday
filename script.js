document.addEventListener("DOMContentLoaded", () => {
  // grab the elements
  const addTaskButtons = document.getElementById("add-task");
  const inputTask = document.getElementById("todo-input");
  const taskLists = document.getElementById("todo-list");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task) => renderTask(task));

  addTaskButtons.addEventListener("click", () => {
    const text = inputTask.value.trim();
    if (text === "") return;

    const newTask = {
      id: Date.now(),
      text,
      completed: false,
    };

    tasks.push(newTask);
    saveTask();
    renderTask(newTask);
    inputTask.value = "";
  });

  function renderTask(task) {
    const ul = document.createElement("ul");
    const li = document.createElement("li");

    li.setAttribute("data-id", task.id);

    if (task.completed) li.classList.add("completed");

    li.innerHTML = `
      <i class="ri-checkbox-blank-circle-line ri-xl"></i>
      <span>${task.text}</span>
      <button>Delete task</button>
      `;

    li.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") return;
      task.completed = !task.completed;
      li.classList.toggle("completed");
      saveTask();
    });

    li.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation(); //
      tasks = tasks.filter((t) => t.id !== task.id);
      li.remove();
      saveTask();
    });

    ul.appendChild(li);
    taskLists.appendChild(ul);
  }

  function saveTask() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
