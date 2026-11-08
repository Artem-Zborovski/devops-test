const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

function addTask() {
    const text = taskInput.value.trim();

    if (text === "") {
        return;
    }

    const li = document.createElement("li");
    const span = document.createElement("span");
    const completeButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    span.textContent = text;
    completeButton.textContent = "Выполнено";
    deleteButton.textContent = "Удалить";

    completeButton.onclick = function() {
        span.classList.toggle("completed");
    };

    deleteButton.onclick = function() {
        li.remove();
    };

    li.append(span, completeButton, deleteButton);
    taskList.appendChild(li);

    taskInput.value = "";
}
