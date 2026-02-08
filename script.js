document.addEventListener("DOMContentLoaded", () => {
  const toggleDark = document.getElementById("toggleDark");
  const addBtn = document.getElementById("addBtn");
  const taskInput = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");
  const filterBtns = document.querySelectorAll("#filters button");

  // Dark mode toggle
  toggleDark.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    toggleDark.textContent = document.body.classList.contains("dark") 
      ? "☀️ Light Mode" 
      : "🌙 Dark Mode";
  });

  // Load tasks dari localStorage
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(task => addTask(task.text, task.done));

  addBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
      addTask(taskText, false);
      saveTasks();
      taskInput.value = "";
    }
  });

  function addTask(taskText, done) {
    const li = document.createElement("li");
    if (done) li.classList.add("done");

    const span = document.createElement("span");
    span.textContent = taskText;

    // Checkbox selesai
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = done;
    checkbox.addEventListener("change", () => {
      li.classList.toggle("done");
      saveTasks();
    });

    // Tombol edit
    const editBtn = document.createElement("button");
    editBtn.textContent = "✎ Edit";
    editBtn.classList.add("editBtn");
    editBtn.addEventListener("click", () => {
      const newText = prompt("Edit tugas:", span.textContent);
      if (newText) {
        span.textContent = newText;
        saveTasks();
      }
    });

    // Tombol hapus
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑 Hapus";
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.addEventListener("click", () => {
      li.classList.add("removing");
      setTimeout(() => {
        taskList.removeChild(li);
        saveTasks();
      }, 400);
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  }

  function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
      tasks.push({
        text: li.querySelector("span").textContent,
        done: li.classList.contains("done")
      });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Filter tugas
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter");
      document.querySelectorAll("#taskList li").forEach(li => {
        if (filter === "all") {
          li.style.display = "
