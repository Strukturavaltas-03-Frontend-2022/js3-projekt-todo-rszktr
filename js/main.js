// Dátum mező
const currentDay = document.querySelector('.date__top')
const currentDate = document.querySelector('.date__bottom')

const showCurrentTime = () => {
  let present = Date.now()
  currentDay.innerHTML = new Intl.DateTimeFormat('en-US', { weekday: 'long' })
    .format(present);

  currentDate.innerHTML = (new Intl.DateTimeFormat('en-GB')
    .format(present))
    .replaceAll('/', '-'); // nem találtam meg rövid időn belül, hogy pontosan milyen régió formátuma ez, rögtönöznöm kellett...
}

showCurrentTime()
setInterval(showCurrentTime, 1000)


// LocalStorage műveletek
let pendingToWorkWith = 0;
let completeToWorkWith = 0;

const getPendingFromStorage = () => {
  if (JSON.parse(localStorage.getItem('pending')) === null) {
    pendingToWorkWith = [];
  } else {
    pendingToWorkWith = JSON.parse(localStorage.getItem('pending'))
  }
}

const getCompleteFromStorage = () => {
  if (JSON.parse(localStorage.getItem('complete')) === null) {
    completeToWorkWith = [];
  } else {
    completeToWorkWith = JSON.parse(localStorage.getItem('complete'))
  }
}

const savePendingToStorage = () => {
  localStorage.setItem('pending', JSON.stringify(pendingToWorkWith));
};

const saveCompleteToStorage = () => {
  localStorage.setItem('complete', JSON.stringify(completeToWorkWith));
};


// Elemek betöltése LocalStorage-ból
getPendingFromStorage();
getCompleteFromStorage();


const completeSection = document.querySelector('.complete')
const chillText = document.querySelector('.no-todos');
const chillPic = document.querySelector('.chill-pic');


// Oldal dinamikus felépítése
const addNewItemToArray = (array, newItem) => array.push(newItem);

const buildNewElement = (tagName, className) => {
  let newElement = document.createElement(tagName);
  newElement.classList.add(className);
  return newElement
}

const startUpCompleteSection = () => {
  let header = buildNewElement('div', 'header')
  header.classList.add('complete')

  let listContainer = buildNewElement('div', 'list__complete')

  completeSection.appendChild(header)
  completeSection.appendChild(listContainer)
}

const addToCompleteSection = (item) => {
  const completeListContainer = document.querySelector('.list__complete')
  let itemContainer = buildNewElement('div', 'item__complete')
  let label = buildNewElement('label', 'check__complete');
  let input = document.createElement('input');
  input.type = 'checkbox';
  input.checked = true;
  input.disabled = true;
  // let trash = buildNewElement('div', 'trash__container');
  // trash.innerHTML = '<i class="fa-sharp fa-solid fa-trash-can"></i>'

  label.appendChild(input);
  label.appendChild(buildNewElement('span', 'checkmark'));
  itemContainer.appendChild(label)
  itemContainer.appendChild(buildNewElement('div', 'text__complete'))
  itemContainer.querySelector('.text__complete').innerHTML = completeToWorkWith[item]
  itemContainer.classList.add('show-item');
  // itemContainer.appendChild(trash)
  completeListContainer.appendChild(itemContainer)
}

const addNewElementsToList = () => {
  for (let i = 0; i < completeToWorkWith.length; i++) {
    addToCompleteSection(i);
  }
}


// Clear All
const buttonClearAll = document.querySelector('.clear')

const clearAll = () => {
  pendingListContainer.innerText = ''

  pendingToWorkWith = [];
  updateEverything();
}

buttonClearAll.addEventListener('click', clearAll)


// Hide Complete
const buttonSwitchComplete = document.querySelector('.switch')

const hideComplete = () => {
  completeSection.innerText = ''
  buttonSwitchComplete.innerHTML = 'Show Complete'

  buttonSwitchComplete.removeEventListener('click', hideComplete)
  buttonSwitchComplete.addEventListener('click', showComplete)
}


// Show Complete
const showComplete = () => {
  startUpCompleteSection();
  addNewElementsToList();
  writeCompleteHeader();

  buttonSwitchComplete.innerHTML = 'Hide Complete'
  buttonSwitchComplete.removeEventListener('click', showComplete)
  buttonSwitchComplete.addEventListener('click', hideComplete)
}

buttonSwitchComplete.addEventListener('click', showComplete)


// Chill Time
const chillTime = () => {
  chillPic.classList.remove('hide')
  chillText.classList.remove('hide')
  buttonSwitchComplete.classList.add('hide')
  buttonClearAll.classList.add('hide')
  hideComplete()
}


const chillTimeOver = () => {
  chillPic.classList.add('hide')
  chillText.classList.add('hide')
  buttonSwitchComplete.classList.remove('hide')
  buttonClearAll.classList.remove('hide')
}


// Változó szövegek
const writePendingHeader = () => {
  const headerPending = document.querySelector('.header.pending')
  if (pendingToWorkWith.length === 0) {
    chillTime()
    headerPending.innerHTML = ``
  } else if (pendingToWorkWith.length === 1) {
    chillTimeOver()
    headerPending.innerHTML = `You have 1 pending item`
  } else {
    chillTimeOver()
    headerPending.innerHTML = `You have ${pendingToWorkWith.length} pending items`
  }
}

const writeCompleteHeader = () => {
  if (completeSection.innerText !== '') {
    const headerComplete = document.querySelector('.header.complete')
    let percentage = completeToWorkWith.length / (pendingToWorkWith.length + completeToWorkWith.length) * 100
    headerComplete.innerHTML = `Completed tasks: ${Math.round(percentage)}%`
  }
}

const updateEverything = () => {
  savePendingToStorage();
  saveCompleteToStorage();
  writePendingHeader();
  writeCompleteHeader();
}

updateEverything();


// Új elem hozzáadása
let text = document.querySelector('.input__text')
const buttonSubmit = document.querySelector('.submit')
const pendingListContainer = document.querySelector('.list__pending');


const addToPendingSection = (item) => {
  let itemContainer = buildNewElement('div', 'item__pending')
  let label = buildNewElement('label', 'check__pending');
  let input = document.createElement('input');
  input.type = 'checkbox'
  let trash = buildNewElement('div', 'trash__container');
  trash.innerHTML = '<i class="fa-sharp fa-solid fa-trash-can"></i>'

  label.appendChild(input);
  label.appendChild(buildNewElement('span', 'checkmark'));

  itemContainer.appendChild(label)
  itemContainer.appendChild(buildNewElement('div', 'text__pending'))
  itemContainer.querySelector('.text__pending').innerHTML = pendingToWorkWith[item]
  itemContainer.classList.add('show-item');
  itemContainer.appendChild(trash)
  pendingListContainer.appendChild(itemContainer)
}

const startUpPendingSection = () => {
  for (let i = 0; i < pendingToWorkWith.length; i++) {
    addToPendingSection(i);
  }
  updateEverything()
}

startUpPendingSection();

const submitNewPending = () => {
  if (text.value === '') {
    text.placeholder = `You need to write something first.`
  } else {
    addNewItemToArray(pendingToWorkWith, text.value);
    addToPendingSection([pendingToWorkWith.length - 1]);
    updateEverything();
    activateTrashListener();
    activateCheckMarkListener();
    text.value = '';
  }
}

buttonSubmit.addEventListener('click', submitNewPending)


// Elemek törlése, teljesítése
const activateTrashListener = () => {
  const trashCans = document.querySelectorAll('.fa-trash-can')
  trashCans.forEach(item => {
    item.addEventListener('click', removeItem)
  })
};

const activateCheckMarkListener = () => {
  const checkMarks = pendingListContainer.querySelectorAll('.checkmark')
  checkMarks.forEach(item => {
    item.addEventListener('click', completeItem)
  })
};

activateTrashListener();
activateCheckMarkListener();

const removeItemFromPendingArray = (element) => {
  let textToFind = element.parentElement.previousElementSibling.innerHTML;
  pendingToWorkWith = pendingToWorkWith.filter(item => item !== textToFind)
}

const completeItemFromPendingArray = (element) => {
  let textToFind = element.parentElement.nextElementSibling.innerHTML;
  pendingToWorkWith = pendingToWorkWith.filter(item => item !== textToFind)
  return textToFind
}

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

const hideItem = (element) => {
  let itemToRemove = element.parentElement.parentElement
  itemToRemove.classList.remove('show-item')
  itemToRemove.classList.add('hide-item')
  delay(300).then(() => itemToRemove.remove())
}

function removeItem() {
  hideItem(this);
  removeItemFromPendingArray(this);
  updateEverything();
}


// Elem teljesítése

function completeItem() {
  let textFromPending = completeItemFromPendingArray(this)
  addNewItemToArray(completeToWorkWith, textFromPending);
  hideItem(this);
  updateEverything();

  if (completeSection.innerText !== '') {
    addToCompleteSection([completeToWorkWith.length - 1])
  }
}