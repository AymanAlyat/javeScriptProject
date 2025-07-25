


const taskInput = document.querySelector('#taskInput');
const addTaskBtn = document.querySelector('#addTaskBtn');
const inputErrorBox = document.querySelector('#inputError');
const tabsBtns = document.querySelectorAll('.tabBtn');        /*    هون جمعت عناصر الصفحة من إدخال وعرض المهام (كتابة مهمة جديدة،
                                                                    التبديل بين القوائم الكل/النشطة/المكتملة، وحذف المهام مع إظهار الأخطاء                
                                                                      بس id المحدودة بالـ   getElementById بدل CSS لأنها مرنة وتدعم أي محدد querySelector استخدمت*/
 
const todoListBox = document.querySelector('#todoList');
const deleteDoneBtn = document.querySelector('#deleteDoneBtn');
const deleteAllBtn = document.querySelector('#deleteAllBtn');
const deleteErrorBox = document.querySelector('#deleteError');


let tasks = [];        //هون انشات مصفوفة فارغة عشان نخزن فيها المهام اللي بتنضاف



const loadTasks = () => { /*  هون الكود للتحميل وحفظ ال tasks*/
    try {
        tasks = JSON.parse(localStorage.getItem('tasks')) ?? [];      
    } catch (_) {
        tasks = [];
    }
};
// بتحول مصفوفة tasks ل JSON وبتخزنها في localstorage 
const saveTasks = () => localStorage.setItem('tasks', JSON.stringify(tasks));


// دالة تولد معرف فريد لكل مهمة
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2);

// دالة ترجع التب الحالي النشط (data-tab)
const currentTab = () =>
    document.querySelector('.tabBtn.active').dataset.tab;


//  لتحديث حالة أزرار الحذف (تعطيل/تمكين)
const updateFooterBtns = () => {
    deleteAllBtn.disabled = tasks.length === 0;               // اذا ما في مهام
    deleteDoneBtn.disabled = tasks.every(t => !t.done);       // اذا ما في مكتملة
    [deleteAllBtn, deleteDoneBtn].forEach(btn => {
        btn.style.opacity = btn.disabled ? '.5' : '1';     // بتنظم شكل الزر حسب معطّل أو لا
        btn.style.cursor = btn.disabled ? 'not-allowed' : 'pointer';
    });
};
// عشان نتحقق من صحة نص المهمة
const validateText = txt => {
    const trimmed = txt.trim();
    if (!trimmed) return 'Task cannot be empty.';
    if (/^\d/.test(trimmed)) return 'Task must not start with a number.';
    if (trimmed.length < 5) return 'Task must be at least 5 characters.';
    return ''; // صحيح
};
//  بتظهر نافذة منبثقة (popup) بمحتوى معين
const showPopup = (contentNode) => {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
    position:fixed;inset:0;background:#0007;display:flex;
    align-items:center;justify-content:center;z-index:999;
  `;
    contentNode.style.cssText = `
    background:#fff;padding:20px;border-radius:8px;max-width:320px;
  `;
    overlay.appendChild(contentNode);
    document.body.appendChild(overlay);
    //  عشان إغلاق النافذة
    return () => document.body.removeChild(overlay); // دالة لإغلاقه
};

//هون منعمل زر ال كونفيرم عشان تاكيد الحذف
const confirmPopup = (msg, onConfirm) => {
    const box = document.createElement('div');
    box.innerHTML = `<p style="margin-bottom:16px">${msg}</p>`;
    const okBtn = document.createElement('button');
    const noBtn = document.createElement('button');
    okBtn.textContent = 'Confirm';
    noBtn.textContent = 'Cancel';
    [okBtn, noBtn].forEach(btn => {
        btn.style.cssText = `margin:0 6px;padding:6px 12px;cursor:pointer`;
    });
    box.appendChild(okBtn); box.appendChild(noBtn);
    const close = showPopup(box);
    okBtn.onclick = () => { onConfirm(); close(); };
    noBtn.onclick = close;
};


//عشان إعادة تسمية
const renamePopup = (task) => {
    const box = document.createElement('div');
    box.innerHTML = `
    <h3 style="margin-bottom:12px">Rename task</h3>
    <input type="text" style="width:100%;padding:8px" value="${task.text}">
    <div id="renameErr" style="color:red;height:18px;margin:6px 0 12px"></div>
  `;
    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';
    saveBtn.style.cssText = `padding:8px 16px;cursor:pointer`;
    box.appendChild(saveBtn);

    const input = box.querySelector('input');
    const err = box.querySelector('#renameErr');
    const close = showPopup(box);

    saveBtn.onclick = () => {
        const message = validateText(input.value);
        if (message) {
            err.textContent = message; // عرض رسالة الخطأ
            return;
        }
        task.text = input.value.trim(); // تحديث النص
        saveTasks(); renderList();// حفظ ورسم القائمة كمان مرة
        close();
    };
};


//  عرض المهام في الصفحة حسب التب الحالي

const renderList = () => {
    todoListBox.innerHTML = ''; // مسح القائمة

    const tab = currentTab();
    const filtered =
        tab === 'done' ? tasks.filter(t => t.done)
            : tab === 'todo' ? tasks.filter(t => !t.done)
                : tasks; // كل المهام

    filtered.forEach(task => {
        /* العنصر اللي بحتوي على كل المهام */
        const item = document.createElement('div');
        item.className = 'todo-item';
        item.dataset.id = task.id;

        /* نص المهمة */
        const textSpan = document.createElement('span');
        textSpan.className = 'todo-text';
        textSpan.textContent = task.text;
        if (task.done) textSpan.style.textDecoration = 'line-through';

        /* مربّع إنجاز */
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.done;
        checkbox.onchange = () => toggleDone(task.id);

        /* زر تعديل */
        const editBtn = document.createElement('button');
        editBtn.innerHTML = '✏️';
        editBtn.style.cssText = 'border:none;background:transparent;cursor:pointer;margin:0 4px';
        editBtn.onclick = () => renamePopup(task);

        /* زر حذف  */
        const delBtn = document.createElement('button');
        delBtn.innerHTML = '🗑️';
        delBtn.className = 'delete-btn';
        delBtn.onclick = () => deleteTask(task.id);

        item.append(textSpan, checkbox, editBtn, delBtn);
        todoListBox.appendChild(item);
    });

    updateFooterBtns(); // تحديث أزرار الحذف
};



const addTask = () => {
    const message = validateText(taskInput.value);// نفحص النص
    if (message) { inputErrorBox.textContent = message; return; }
    inputErrorBox.textContent = '';
    // نضيف المهمة للمصفوفة
    tasks.push({ id: uid(), text: taskInput.value.trim(), done: false });
    taskInput.value = '';
    saveTasks(); renderList();
};
// تبديل حالة "done" للمهمة
const toggleDone = id => {
    tasks = tasks.map(t => t.id === id ? { ...t, done: !t.done } : t);
    saveTasks(); renderList();
};

const deleteTask = id => {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks(); renderList();
};
//  هون حذف كل المكتملة مع تأكيد 
const deleteDoneTasks = () => {
    if (tasks.every(t => !t.done)) {
        deleteErrorBox.textContent = 'No tasks to delete.';
        return;
    }
    confirmPopup('Delete all completed tasks?', () => {
        tasks = tasks.filter(t => !t.done);
        saveTasks(); renderList();
        deleteErrorBox.textContent = '';
    });
};
// حذف كل المهام مع تأكيد
const deleteAllTasks = () => {
    if (!tasks.length) {
        deleteErrorBox.textContent = 'No tasks to delete.';
        return;
    }
    confirmPopup('Delete every task?', () => {
        tasks = [];
        saveTasks(); renderList();
        deleteErrorBox.textContent = '';
    });
};




// ربط الأحداث بالأزرار وعند بداية الصفحة
addTaskBtn.onclick = addTask;
taskInput.onkeyup = e => e.key === 'Enter' && addTask();

tabsBtns.forEach(btn => btn.onclick = () => {
    document.querySelector('.tabBtn.active').classList.remove('active');
    btn.classList.add('active');
    renderList();
});

deleteDoneBtn.onclick = deleteDoneTasks;
deleteAllBtn.onclick = deleteAllTasks;

loadTasks();   // نحمّل المهام المحفوظة
renderList();  // نعرضها فوراً
