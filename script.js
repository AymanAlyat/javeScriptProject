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

