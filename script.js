'use strict';

var containerElem = document.querySelector('.container');
var editorElem = document.querySelector('.editor');
var editBtnElem = document.querySelector('.edit-btn');
var saveBtnElem = document.querySelector('.save-btn');
var cnclBtnElem = document.querySelector('.cncl-btn');
var clrBtnElem = document.querySelector('.clr-btn');
var loadBtnElem = document.querySelector('.load-btn');
var selectElem = document.querySelector('.form-control');
var optionElems = document.getElementsByTagName('option');
var saveVersionNumber = 0;
var savingValue;
var editorVersion = 'editorContent' + saveVersionNumber;

var SavingValue = function () {
  this.key = editorVersion;
  this.value = editorElem.innerHTML;
  this.date = new Date();
};

savingValue = new SavingValue();

if (!localStorage.hasOwnProperty(editorVersion)) {
  localStorage.setItem(editorVersion, JSON.stringify(savingValue))
} else {
  saveVersionNumber = -1;
  for (var i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i).indexOf('editorContent') >= 0) {
      saveVersionNumber++;
      editorVersion = 'editorContent' + saveVersionNumber;
      createNewOption()
    };
  };
  editorElem.innerHTML = JSON.parse(localStorage.getItem(editorVersion)).value;
};

containerElem.addEventListener('click', function (event) {
  if (event.target === editBtnElem) {
    editorElem.setAttribute('contenteditable', 'true');
    editorElem.classList.remove('border-primary');
    editorElem.classList.add('border-success');
    editBtnElem.setAttribute('disabled', 'true');
    saveBtnElem.classList.remove('invisible');
    cnclBtnElem.classList.remove('invisible');
  };

  if (event.target === saveBtnElem) {
    editorElem.innerHTML = editorElem.innerHTML;
    saveVersionNumber++;
    editorVersion = 'editorContent' + saveVersionNumber;
    savingValue = new SavingValue();
    localStorage.setItem(editorVersion, JSON.stringify(savingValue))
    createNewOption();
    editorElem.setAttribute('contenteditable', 'false');
    editorElem.classList.remove('border-success');
    editorElem.classList.add('border-primary');
    saveBtnElem.classList.add('invisible');
    cnclBtnElem.classList.add('invisible');
    editBtnElem.removeAttribute('disabled');
  };

  if (event.target === cnclBtnElem) {
    editorElem.innerHTML = JSON.parse(localStorage.getItem(editorVersion)).value;
    editorElem.setAttribute('contenteditable', 'false');
    editorElem.classList.remove('border-success');
    editorElem.classList.add('border-primary');
    saveBtnElem.classList.add('invisible');
    cnclBtnElem.classList.add('invisible');
    editBtnElem.removeAttribute('disabled');
  };
  if (event.target === clrBtnElem) {
    localStorage.clear();
    location.reload();
  };
});

containerElem.addEventListener('submit', function (event) {
  event.preventDefault();
  editorElem.innerHTML = JSON.parse(localStorage.getItem(String(selectElem.value))).value;
  editorElem.setAttribute('contenteditable', 'false');
  editorElem.classList.remove('border-success');
  editorElem.classList.add('border-primary');
  saveBtnElem.classList.add('invisible');
  cnclBtnElem.classList.add('invisible');
  editBtnElem.removeAttribute('disabled');
});

function createNewOption() {
  var date = JSON.parse(localStorage.getItem(editorVersion)).date;
  var option = new Option(('Save ver.' + saveVersionNumber + ' ' + date), editorVersion, false, false);
  selectElem.appendChild(option);
  optionElems = document.getElementsByTagName('option')
};

// Для про:
// История версий с датой и временем последнего редактирования.
// При загрузке страницы показывать селект с возможностью вернуться к какому-либо из сохранений.