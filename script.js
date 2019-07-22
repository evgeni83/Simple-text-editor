'use strict';

var container = document.querySelector('.container');
var editor = document.querySelector('.editor');
var editBtn = document.querySelector('.edit-btn');
var saveBtn = document.querySelector('.save-btn');
var cnclBtn = document.querySelector('.cncl-btn');
var clrBtn = document.querySelector('.clr-btn');
var loadBtn = document.querySelector('.load-btn');
var select = document.querySelector('.form-control');
var options = document.getElementsByTagName('option');
var saveVersionNumber = 0;
var savingValue;
var editorVersion = 'editorContent' + saveVersionNumber;

var SavingValue = function () {
  this.key = editorVersion;
  this.value = editor.innerHTML;
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
  editor.innerHTML = JSON.parse(localStorage.getItem(editorVersion)).value;
};

container.addEventListener('click', function (event) {
  if (event.target === editBtn) {
    editor.setAttribute('contenteditable', 'true');
    editor.classList.remove('border-primary');
    editor.classList.add('border-success');
    editBtn.setAttribute('disabled', 'true');
    saveBtn.classList.remove('invisible');
    cnclBtn.classList.remove('invisible');
  };

  if (event.target === saveBtn) {
    editor.innerHTML = editor.innerHTML;
    saveVersionNumber++;
    editorVersion = 'editorContent' + saveVersionNumber;
    savingValue = new SavingValue();
    localStorage.setItem(editorVersion, JSON.stringify(savingValue))
    createNewOption();
    editor.setAttribute('contenteditable', 'false');
    editor.classList.remove('border-success');
    editor.classList.add('border-primary');
    saveBtn.classList.add('invisible');
    cnclBtn.classList.add('invisible');
    editBtn.removeAttribute('disabled');
  };

  if (event.target === cnclBtn) {
    editor.innerHTML = JSON.parse(localStorage.getItem(editorVersion)).value;
    editor.setAttribute('contenteditable', 'false');
    editor.classList.remove('border-success');
    editor.classList.add('border-primary');
    saveBtn.classList.add('invisible');
    cnclBtn.classList.add('invisible');
    editBtn.removeAttribute('disabled');
  };
  if (event.target === clrBtn) {
    localStorage.clear();
    location.reload();
  };
});

container.addEventListener('submit', function (event) {
  event.preventDefault();
  editor.innerHTML = JSON.parse(localStorage.getItem(String(select.value))).value;
  editor.setAttribute('contenteditable', 'false');
  editor.classList.remove('border-success');
  editor.classList.add('border-primary');
  saveBtn.classList.add('invisible');
  cnclBtn.classList.add('invisible');
  editBtn.removeAttribute('disabled');
});

function createNewOption() {
  var date = JSON.parse(localStorage.getItem(editorVersion)).date;
  var option = new Option(('Save ver.' + saveVersionNumber + ' ' + date), editorVersion, false, false);
  select.appendChild(option);
  options = document.getElementsByTagName('option')
};

// Для про:
// История версий с датой и временем последнего редактирования.
// При загрузке страницы показывать селект с возможностью вернуться к какому-либо из сохранений.