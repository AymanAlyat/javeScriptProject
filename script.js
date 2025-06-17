const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");

taskInput.addEventListener("input", () => {
  addTaskBtn.disabled = taskInput.value.trim() === "";/* بمنع المستخدم يكبس او خلينا نقول يمنعو يدخل اذا كان الحقل فاضي */
}); /*يعني بالمختصر بمنع المستخدم يدخل قيمه فاضيه */






const inputError = document.getElementById("inputError");


//لوجك سيفتي بجوز او اقلك انسا الكومنت اساسا



addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim(); //اخذ القيمه من المستخدم وحذف الفراغات منها وخزنها

  if (taskText === "") { //بالمختصر المفيد اذا جيت تكبس وانت فاضي بمنعك وبظهرلك رساله الخطا بالمكان اللي تركناه فاضي لرساله الخطا
    inputError.textContent = "Task cannot be empty."; 
    return;
  } else {
    inputError.textContent = ""; // غير هيك رساله الايرور رح تضل فاضيه


    // عملت عنصر عشان اضيف التاسك بيه
    const taskItem = document.createElement("div");
    taskItem.textContent = taskText;
    taskItem.classList.add("todo-item"); 
    todoList.appendChild(taskItem); //هاي ضروريه عشان اضيف بدونها ما بضيف



    taskInput.value = "";          // كاني عملت ريست يعني فضيتواا
    addTaskBtn.disabled = true;    // الكبسه خليناها معطله لانه صار فاضي
  }
});


