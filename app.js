var taskInput = document.getElementById('new-task')
var addButton = document.getElementsByTagName('button')[0]
var incompleteTaskHolder = document.getElementById('incomplete-tasks')
var completedTasksHolder = document.getElementById('completed-tasks')

var classes = {
  create: {
    listItem: 'app__item task',
    checkbox: 'task__checkbox',
    label: 'app__label task__label',
    editInput: 'app__inputtext task__inputtext',
    editButton: 'app__btn task__btn task__btn_edit',
    deleteButton: 'app__btn task__btn task__btn_delete',
    deleteButtonImage: 'task__btn-img',
  },
  query: {
    editInput: '.task__inputtext',
    checkbox: '.task__checkbox',
    label: '.task__label',
    editButton: '.task__btn_edit',
    deleteButton: '.task__btn_delete',
  },
  actions: {
    edit: 'task_edit',
  },
}

var createNewTaskElement = function (taskString) {
  var listItem = document.createElement('li')
  var checkbox = document.createElement('input')
  var label = document.createElement('label')
  var editInput = document.createElement('input')
  var editButton = document.createElement('button')
  var deleteButton = document.createElement('button')
  var deleteButtonImage = document.createElement('img')

  listItem.className = classes.create.listItem
  checkbox.className = classes.create.checkbox
  label.className = classes.create.label
  editInput.className = classes.create.editInput
  editButton.className = classes.create.editButton
  deleteButton.className = classes.create.deleteButton
  deleteButtonImage.className = classes.create.deleteButtonImage

  label.innerText = taskString

  checkbox.type = 'checkbox'
  editInput.type = 'text'

  editButton.innerText = 'Edit'

  deleteButtonImage.src = './remove.svg'
  deleteButtonImage.alt = ''
  deleteButton.appendChild(deleteButtonImage)

  listItem.appendChild(checkbox)
  listItem.appendChild(label)
  listItem.appendChild(editInput)
  listItem.appendChild(editButton)
  listItem.appendChild(deleteButton)
  return listItem
}

var addTask = function () {
  console.log('Add Task...')
  if (!taskInput.value) return
  var listItem = createNewTaskElement(taskInput.value)

  incompleteTaskHolder.appendChild(listItem)
  bindTaskEvents(listItem, taskCompleted)

  taskInput.value = ''
}

var editTask = function () {
  console.log('Edit Task...')
  console.log("Change 'edit' to 'save'")

  var listItem = this.parentNode

  var editInput = listItem.querySelector(classes.query.editInput)
  var label = listItem.querySelector(classes.query.label)
  var editButton = listItem.querySelector(classes.query.editButton)

  var containsClass = listItem.classList.contains(classes.actions.edit)

  if (containsClass) {
    label.innerText = editInput.value
    editButton.innerText = 'Edit'
  } else {
    editInput.value = label.innerText
    editButton.innerText = 'Save'
  }

  listItem.classList.toggle(classes.actions.edit)
}

var deleteTask = function () {
  console.log('Delete Task...')

  var listItem = this.parentNode
  var ul = listItem.parentNode

  ul.removeChild(listItem)
}

var taskCompleted = function () {
  console.log('Complete Task...')

  var listItem = this.parentNode

  completedTasksHolder.appendChild(listItem)
  bindTaskEvents(listItem, taskIncomplete)
}

var taskIncomplete = function () {
  console.log('Incomplete Task...')

  var listItem = this.parentNode
  incompleteTaskHolder.appendChild(listItem)
  bindTaskEvents(listItem, taskCompleted)
}

var ajaxRequest = function () {
  console.log('AJAX Request')
}

addButton.onclick = addTask
addButton.addEventListener('click', addTask)
addButton.addEventListener('click', ajaxRequest)

var bindTaskEvents = function (taskListItem, checkboxEventHandler) {
  console.log('bind list item events')

  var checkbox = taskListItem.querySelector(classes.query.checkbox)
  var editButton = taskListItem.querySelector(classes.query.editButton)
  var deleteButton = taskListItem.querySelector(classes.query.deleteButton)

  editButton.onclick = editTask
  deleteButton.onclick = deleteTask
  checkbox.onchange = checkboxEventHandler
}

for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted)
}

for (var i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete)
}
