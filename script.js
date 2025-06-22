const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");

taskInput.addEventListener("input", () => {
  addTaskBtn.disabled = taskInput.value.trim() === "";/* بمنع المستخدم يكبس او خلينا نقول يمنعو يدخل اذا كان الحقل فاضي */
}); /*يعني بالمختصر بمنع المستخدم يدخل قيمه فاضيه */


const todoList = document.getElementById("todoList");



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
   
    taskItem.classList.add("todo-item"); 



    taskInput.value = "";          // كاني عملت ريست يعني فضيتواا
    addTaskBtn.disabled = true;    // الكبسه خليناها معطله لانه صار فاضي
  



const taskTextSpan = document.createElement("span"); //عشان اتحكم بالنص ك نص بدي اعمل سبان انا حر بجوز يجي عبالي الون شغلات معينه
// هون بعدين بدنا نخلي جوا كل مهمه ثلاث عناصر النص نفسه وسله الزباله والصح  وهاي هون النص

taskTextSpan.textContent = taskText;




taskTextSpan.classList.add("todo-text");
 taskItem.appendChild(taskTextSpan);
//
 const deleteBtn = document.createElement("button");
  
 deleteBtn.textContent = "🗑"; //windows + . ايموجي 
 deleteBtn.classList.add("delete-btn");

   taskItem.appendChild(deleteBtn);

   const doneBtn = document.createElement("button");
   
doneBtn.textContent = "✔";

doneBtn.classList.add("done-btn");
taskItem.appendChild(doneBtn);//
doneBtn.addEventListener("click", () => {
  taskItem.classList.toggle("done"); // رح نضيف ستايل خاص إذا تم الضغط
});

    deleteBtn.addEventListener("click", () => {
      taskItem.remove();
    });
 todoList.appendChild(taskItem); //هاي ضروريه عشان اضيف بدونها ما بضيف
}
    });
       // todoList.appendChild(taskItem); //هاي ضروريه عشان اضيف بدونها ما بضيف
