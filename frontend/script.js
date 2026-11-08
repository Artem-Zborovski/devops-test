const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

async function loadTasks() {
    const response = await fetch("/api/tasks");
    const tasks = await response.json();

    taskList.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");
        const span = document.createElement("span");
        const deleteButton = document.createElement("button");

        span.textContent = task.title;
        deleteButton.textContent = "Удалить";

        deleteButton.onclick = () => deleteTask(task.id);

        li.append(span, deleteButton);
        taskList.appendChild(li);
    });
}

async function addTask() {
    const title = taskInput.value.trim();

    if (title === "") {
        return;
    }

    await fetch("/api/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({title: title})
    });

    taskInput.value = "";
    loadTasks();
}

async function deleteTask(id) {
    await fetch(`/api/tasks/${id}`, {
        method: "DELETE"
    });

    loadTasks();
}

loadTasks();
