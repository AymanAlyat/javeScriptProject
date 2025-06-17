const taskInput = document.getElementById("taskInput");


const addTaskBtn = document.getElementById("addTaskBtn");


taskInput.addEventListener("input", () => {
  addTaskBtn.disabled = taskInput.value.trim() === "";//**الهدف امنع المستخدم انه يكبس مدام فش داتا */
});
console.log("Hi in JS");

