'use strict';

let flag = true;
let isWinner = false;
let field = document.querySelector('.field');
let btn = document.querySelector('.new_game');

function fillField() {
  for (let i = 0; i < 9; i++) {
    let div = document.createElement('div');
    div.className = 'field-items';
    field.append(div);
  }
}

function handlerField(event) {
  let target = event.target;
  if (isWinner) {
    createMessage(`Игра окончена. Для начала новой нажмите кнопку Новая игра`, 'error');
    return;
  }
  if (target.textContent !== '') {
    return;
  }
  target.textContent = flag ? 'X' : 'O';
  flag = !flag;
  horizCheck();
  verticalCheck();
  diagonalCheck();
  diagonal2Check();

}

function horizCheck() {
  let items = field.querySelectorAll('.field-items');
  for (let i = 0; i < 3; i++) {
    let count = 0;
    for (let j = 0; j < 2; j++) {
      if (items[i * 3 + j].textContent === '') {
        break;
      }
      if (items[i * 3 + j].textContent === items[i * 3 + j + 1].textContent) {
        count++;
      }
    }
    if (count == 2) {
      isWinner = true;
      createMessage(`Победил ${!flag ? 'X' : 'O'}`, 'success');
    }
    else {
      checkPoise(items)
    }
  }
}

function diagonalCheck() {
  let items = field.querySelectorAll('.field-items');
  let count = 0;
  for (let i = 0; i < 2; i++) {
    if (items[i * 4].textContent === '') {
      break;
    }
    if (items[i * 4].textContent === items[(i + 1) * 4].textContent) {
      count++;
    }
  }
  if (count == 2) {
    isWinner = true;
    createMessage(`Победил ${!flag ? 'X' : 'O'}`, 'success');
  }
  else {
    checkPoise(items)
  }
}

function diagonal2Check() {
  let items = field.querySelectorAll('.field-items');
  let count = 0;
  for (let i = 0; i < 2; i++) {
    if (items[i * 2 + 2].textContent === '') {
      break;
    }
    if (items[i * 2 + 2].textContent === items[i * 2 + 4].textContent) {
      count++;
    }
  }
  if (count == 2) {
    isWinner = true;
    createMessage(`Победил ${!flag ? 'X' : 'O'}`, 'success');
  }
  else {
    checkPoise(items)
  }
}

function verticalCheck() {
  let items = field.querySelectorAll('.field-items');
  for (let i = 0; i < 3; i++) {
    let count = 0;
    for (let j = 0; j < 2; j++) {
      if (items[j * 3 + i].textContent === '') {
        break;
      }
      if (items[j * 3 + i].textContent === items[j * 3 + i + 3].textContent) {
        count++;
      }
    }
    if (count == 2) {
      isWinner = true;
      createMessage(`Победил ${!flag ? 'X' : 'O'}`, 'success');
    }
    else {
      checkPoise(items)
    }
  }
}

function checkPoise(items) {
  if (isWinner) {
    return
  }
  let cnt = 0;
  for (let i = 0; i < 3; ++i) {
    for (let j = 0; j < 3; ++j) {
      if (items[j * 3 + i].textContent === '') {
        ++cnt;
      }
    }
  }
  if (cnt == 0) {
    isWinner = true;
    createMessage("Ничья", 'success');
  }
}
function clean() {
  let items = field.querySelectorAll('.field-items');
  for (let i = 0; i < items.length; i++) {
    items[i].textContent = '';
  }
  isWinner = false;
  flag = true;
}

function createMessage(textMessage, type) {
  const message = document.querySelector('.message');
  message.textContent = textMessage;
  message.classList.add(type);
  message.classList.toggle('hidden');
  setTimeout(() => {
    message.classList.toggle('hidden');
    message.classList.toggle(type);
  }, 1000)

}

field.addEventListener('click', handlerField);
btn.addEventListener('click', clean);

fillField();
