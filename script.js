const taskInput = document.querySelector('#taskInput');
const addTaskBtn = document.querySelector('#addTaskBtn');
const inputErrorBox = document.querySelector('#inputError');
const tabsBtns = document.querySelectorAll('.tabBtn');
const todoListBox = document.querySelector('#todoList');
const deleteDoneBtn = document.querySelector('#deleteDoneBtn');
const deleteAllBtn = document.querySelector('#deleteAllBtn');
const deleteErrorBox = document.querySelector('#deleteError');


let tasks = [];



const loadTasks = () => {
    try {
        tasks = JSON.parse(localStorage.getItem('tasks')) ?? [];        /* تحميل وحفظ */
    } catch (_) {
        tasks = [];
    }
};
const saveTasks = () => localStorage.setItem('tasks', JSON.stringify(tasks));


/* إنشاء معرِّف فريد سريع */
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2);

/* التبويب النشط حالياً */
const currentTab = () =>
    document.querySelector('.tabBtn.active').dataset.tab;


/* تحديث حالة أزرار الحذف (تُعطَّل إذا لا يوجد ما يُحذَف) */
const updateFooterBtns = () => {
    deleteAllBtn.disabled = tasks.length === 0;
    deleteDoneBtn.disabled = tasks.every(t => !t.done);
    [deleteAllBtn, deleteDoneBtn].forEach(btn => {
        btn.style.opacity = btn.disabled ? '.5' : '1';
        btn.style.cursor = btn.disabled ? 'not-allowed' : 'pointer';
    });
};

const validateText = txt => {
    const trimmed = txt.trim();
    if (!trimmed) return 'Task cannot be empty.';
    if (/^\d/.test(trimmed)) return 'Task must not start with a number.';
    if (trimmed.length < 5) return 'Task must be at least 5 characters.';
    return ''; // صحيح
};

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
    return () => document.body.removeChild(overlay); // دالة لإغلاقه
};



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
            err.textContent = message;
            return;
        }
        task.text = input.value.trim();
        saveTasks(); renderList();
        close();
    };
};

