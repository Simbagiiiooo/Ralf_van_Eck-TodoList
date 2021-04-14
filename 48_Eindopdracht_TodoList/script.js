const toDoList = document.querySelector(`.todo-list`)

const addToTheDom = async () => {
    const todo = await getToDo();
    toDoList.innerHTML = ``;
    todo.forEach(task => {
        newLi = document.createElement(`li`);
        // checkboxes
        checkBox = document.createElement(`input`);
        checkBox.setAttribute (`type`, `checkbox`);
        checkBox.classList.add(`checkbox`);
        checkBox.addEventListener(`click`, async ()=>{
            if(task.done == false){
                await completeOneToDo(task._id, task.description, true);
                addToTheDom();
            } if(task.done == true){
                await completeOneToDo(task._id, task.description, false);
                addToTheDom();
                }
        });
         // icon Trash
        trashIcon = document.createElement(`button`);
        trashIcon.innerHTML = `<i class="fas fa-trash"></i>`;
        trashIcon.classList.add(`remove-icon`);
        trashIcon.addEventListener(`click`, async ()=> {
            await deleteOneToDo(task._id);
            addToTheDom()
        });
        // content
        content = document.createElement(`span`);
        content.classList.add(`task-content`);
        content.appendChild(document.createTextNode(task.description));
        if (task.done == true){
            checkBox.checked = true;
            content.classList.add(`strikethrough`);
            trashIcon.classList.add(`change`)
        };
        // li maken met checkbox, trash en content
        toDoList.appendChild(newLi);
        newLi.appendChild(checkBox);
        newLi.appendChild(trashIcon);
        newLi.appendChild(content);
        
    });
}

addToTheDom();

const addTaskButton = document.querySelector(`.add-btn`);
const addTaskToAPI = addTaskButton.addEventListener(`click`, async () => {
    const inputField = document.querySelector(`.input-field`);
    await postToDo({ description: inputField.value, done: false });
    inputField.value = null;
    addToTheDom();
});

const removeAllTasks = document.querySelector(`.del-all-btn`).addEventListener(`click`, async () => {
    await deleteAllToDos();
    toDoList.innerHTML = ``;
})
