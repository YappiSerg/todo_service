let items = [
  "Вспомнить про фронт",
  "Бездельничать",
  "Бездельничать",
  "Бездельничать",
  "Бездельничать",
  "Бездельничать",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

formElement.addEventListener("submit", (e) => {
  e.preventDefault();

  const text = inputElement.value;
  listElement.prepend(createItem(text));

  items = getTasksFromDOM();
  saveTasks(items);
  formElement.reset();
});

function loadTasks() {
  const storageTasks = localStorage.getItem("tasks");

  if (storageTasks) {
    return JSON.parse(storageTasks);
  }

  return items;
}

function createItem(item) {
  const template = document.getElementById("to-do__item-template");
  const clone = template.content.querySelector(".to-do__item").cloneNode(true);
  const textElement = clone.querySelector(".to-do__item-text");
  const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
  const duplicateButton = clone.querySelector(
    ".to-do__item-button_type_duplicate",
  );
  const editButton = clone.querySelector(".to-do__item-button_type_edit");

  textElement.textContent = item;

  deleteButton.addEventListener("click", () => {
    clone.remove();
    const items = getTasksFromDOM();
    saveTasks(items);
  });

  duplicateButton.addEventListener("click", () => {
    const itemName = textElement.textContent;
    const newItem = createItem(itemName);

    listElement.prepend(newItem);

    const items = getTasksFromDOM();
    saveTasks(items);
  });

  editButton.addEventListener("click", () => {
    textElement.contentEditable = "true";
    textElement.focus();
  });

  textElement.addEventListener("blur", () => {
    textElement.contentEditable = "false";

    const items = getTasksFromDOM();
    saveTasks(items);
  });

  return clone;
}

function getTasksFromDOM() {
  const itemsNamesElements = listElement.querySelectorAll(".to-do__item-text");
  const tasks = [];

  itemsNamesElements.forEach((el) => {
    tasks.push(el.textContent);
  });

  return tasks;
}

function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

items = loadTasks();
items.forEach((el) => {
  listElement.append(createItem(el));
});
