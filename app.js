let tasksArray = [
  {
      id: 'Учить JavaScript.',
      validity: 'validity-2',
      date: '21:27:31|04/05/2023'
  },
  {
      id: 'Изучать Англиский.',
      validity: 'validity-1',
      date: '11:10:31|05/05/2023'
  },
  {
      id: 'Посмотреть ТВ.',
      validity: 'validity-3',
      date: '15:32:59|11/05/2023'
  },
  {
      id: 'Не проспать созвон',
      validity: 'validity-1',
      date: '21:27:31|20/05/2023'
  }
];

// get inner text and do something only when it is't empty;
function newTask() {
  let textField = document.getElementById('taskText');
  let validation = document.querySelector('.app-container input:checked');

  if (textField.value == '' || textField.value == ' ') {
      document.querySelector('.fault').innerHTML = 'No describtion in new task.';
      return;
  }
  if (!validation) {
      document.querySelector('.fault').innerHTML = 'Chose type of new task.';
      return;
  } else {
      let newDate = new Date(),
          year = newDate.getFullYear(),
          month = newDate.getMonth(),
          day = newDate.getDay(),
          hour = newDate.getHours(),
          minute = newDate.getMinutes(),
          second = newDate.getSeconds();
      if (second < 10 && second >= 0) {
          second = '0' + second;
      }
      if (minute < 10 && minute >= 0) {
          minute = '0' + minute;
      }
      if (hour < 10 && hour >= 0) {
          hour = '0' + hour;
      }
      if (day < 10 && day >= 0) {
          day = '0' + day;
      }
      if (month < 10 && month >= 0) {
          month = '0' + month;
      }
      const actualTimeDate = 'Saved at ' + hour + ':' + minute + ':' + second + '|' + day + '/' + month + '/' + year;

      validation = validation.id;

      // create new task object;
      const newObj = new Object();
      newObj.id = textField.value;
      newObj.validity = validation;
      newObj.date = actualTimeDate;
      tasksArray.push(newObj);

      // reset fault section;
      document.querySelector('.fault').innerHTML = '';
      // create and show list;
      createList();
  }
  return;
}
// create list (inner html)
function createList() {
  let container = document.querySelector('.tasks-list'),
      ul = document.createElement('ul');
  // clear container, before new list is implemented; 
  container.innerHTML = '';

  container.appendChild(ul);
  let ulList = container.querySelector('ul');

  for (let i = 0; i < tasksArray.length; i++) {
      const li = document.createElement('li'),
          toggleBtn = document.createElement('button'),
          deleteBtn = document.createElement('button'),
          span = document.createElement('span'),
          p = document.createElement('p'),
          textNodeP = document.createTextNode(tasksArray[i].id),
          textNodeDate = document.createTextNode(tasksArray[i].date),
          validity = tasksArray[i].validity;
      // 

      // build up buttons;
      toggleBtn.classList.add('toggle-btn');
      toggleBtn.setAttribute('type', 'button');
      toggleBtn.innerHTML = '<i class="fa fa-check-square-o" aria-hidden="true"></i>';
      deleteBtn.classList.add('delete-btn');
      deleteBtn.setAttribute('type', 'button');
      deleteBtn.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
      // build up task list;
      li.appendChild(toggleBtn);
      li.appendChild(p);
      p.appendChild(textNodeP);
      li.appendChild(span);
      span.appendChild(textNodeDate);
      li.appendChild(deleteBtn);
      ulList.appendChild(li);

      // set background depending on validity;
      setBackground(validity, li);
  }
  // clear fault field;
  document.querySelector('.fault').value = '';
  // clear input field;
  document.getElementById('taskText').value = '';
  // task buttons;
  toggleTask();
  deleteTask();
  // reset radio input;
  resetRadio();

}
// set background-color, depending on task validation;
function setBackground(str, el) {
  switch (str) {
      case 'validity-1':
          el.style.backgroundImage = 'linear-gradient(90deg,rgba(255,255,255,.8)50%, rgba(200, 20, 0, .8)80%)';
          break;
      case 'validity-2':
          el.style.backgroundImage = 'linear-gradient(90deg,rgba(255,255,255,.8)50%, rgba(0, 20, 200, .8)80%)';
          break;
      case 'validity-3':
          el.style.backgroundImage = 'linear-gradient(90deg, rgba(255,255,255,.8)50%, rgba(40,150,10,.8)80%)';
          break;
  }
}
// reset radio buttons;
function resetRadio() {
  let radioList = document.getElementsByName('validity');
  for (let i = 0; i < radioList.length; i++) {
      radioList[i].checked = false;
  }
}
// list's buttons;
function toggleTask() {
  const toggleBtn = document.getElementsByClassName('toggle-btn');

  for (let i = 0; i < toggleBtn.length; i++) {

      toggleBtn[i].addEventListener('mouseup', function (ev) {
          ev = ev.target;

          ev.parentElement.parentElement.children[1].classList.toggle('line-throught');

          ev.classList.toggle('checked-btn');
          console.log();
      })
  }
}

function deleteTask() {
  const deleteBtn = document.getElementsByClassName('delete-btn');

  for (let i = 0; i < deleteBtn.length; i++) {

      deleteBtn[i].addEventListener('mouseup', function (ev) {
          const textToRemove = ev.target.parentElement.parentElement.innerHTML,
              elToRemove = ev.target.parentElement.parentElement;

          tasksArray.splice(i, 1);
          elToRemove.remove();
      });
  }
}
// clear fault message;
function resetCurrentTask() {
  document.querySelector('.fault').innerHTML = '';
}

document.addEventListener('DOMContentLoaded', createList);
document.getElementById('new').addEventListener('mouseup', newTask);
document.getElementById('reset').addEventListener('mouseup', resetCurrentTask);

// change new task input background color, depending on mouse over validity element;
function eventListenerArray() {
  let validityList = document.getElementsByClassName('radio-span');
  for (let i = 0; i < validityList.length; i++) {
      // ON;
      validityList[i].addEventListener('mouseenter', hoverRadioList);
      // OFF;
      validityList[i].addEventListener('mouseleave', resetColor);
  }
}

function hoverRadioList(event) {
  const input = document.getElementById('taskText');
  const activeField = event.target.firstElementChild.attributes.id.value;

  switch (activeField) {
      case 'validity-1':
          input.style.backgroundImage = 'linear-gradient(90deg, rgba(255, 255, 255, .8)50%, rgba(200,20,0,.8)80%)';
          break;
      case 'validity-2':
          input.style.backgroundImage = 'linear-gradient(90deg,rgba(255,255,255,.8)50%, rgba(0, 20, 200, .8)80%)';
          break;
      case 'validity-3':
          input.style.backgroundImage = 'linear-gradient(90deg, rgba(255,255,255,.8)50%, rgba(40,150,10,.8)80%)';
          break;
  }
}
// reset color on mouse leave;
function resetColor() {
  document.getElementById('taskText').style.background = 'rgba(255,255,255,.8)';
}

document.addEventListener('DOMContentLoaded', eventListenerArray);
