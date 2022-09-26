let textArea = document.querySelector("#textarea");
let title = document.querySelector("#input-title");
let saveBtn = document.querySelector("#save-btn");
let copyBtn = document.querySelector("#copy-btn");
let boldBtn = document.querySelector("#bold-btn");
let underlineBtn = document.querySelector("#under-btn");

//! Variables and Array
let notes = [];
let notesToAdd = {};
let textAreaInput = "";
let titleInput = "";

//! Input Handler
textArea.addEventListener("change", (e) => {
  textAreaInput = e.target.value.trim();
});

title.addEventListener("change", (e) => {
  titleInput = e.target.value.trim();
});

//! Save Button handler

function saveNote() {
  if (textAreaInput.length > 0 && titleInput.length > 0) {
    notesToAdd = {
      title: titleInput,
      summary: textAreaInput,
    };
    notes.push(notesToAdd);
    textArea.value = "";
    title.value = "";
    textAreaInput = "";
    titleInput = "";
    display();
    title.focus();
  } else if (titleInput.length === 0) {
    alert("❌ Title is Empty ❌");
  } else {
    alert("❌ Textarea is Empty ❌");
  }
}
saveBtn.addEventListener("click", saveNote);

//! Copy
copyBtn.addEventListener("click", () => {
  let selectedText = window.getSelection().toString();
  if(selectedText.length > 0){
    navigator.clipboard.writeText(selectedText);
  }
  else{
    alert("❌ Text Not Selected ❌");
  }
  
});

//! Bold
function boldFunc() {
  let selectedText = window.getSelection().toString();
  if (selectedText.trim() === "") {
    alert("❌ Text Not Selected ❌");
  } else if (selectedText.includes("<b>")) {
    let newText = selectedText.replace("<b>", "");
    newText = newText.replace("</b>", "");
    textAreaInput = textAreaInput.replace(selectedText, newText);
  } else {
    let newText = `<b>${selectedText}</b>`;
    textAreaInput = textAreaInput.replace(selectedText, newText);
  }
}

boldBtn.addEventListener("click", boldFunc);

//! UnderLine
function underLineFunc() {
  let selectedText = window.getSelection().toString();
  if (selectedText === "") {
    alert("❌ Text Not Selected ❌");
  } else if (selectedText.includes("<u>")) {
    let newText = selectedText.replace("<u>", "");
    newText = newText.replace("</u>", "");
    textAreaInput = textAreaInput.replace(selectedText, newText);
  } else {
    let newText = `<u>${selectedText}</u>`;
    textAreaInput = textAreaInput.replace(selectedText, newText);
  }
}

underlineBtn.addEventListener("click", underLineFunc);

//! Checking KeyPress of Ctrl + B & Ctrl + U  Not Working
// let keysPressed = {};

// textArea.addEventListener("keydown", (event) => {
// keysPressed[event.key] = true;

// if (keysPressed["17"] && event.key === "b") {
// alert(event.key);
// boldFunc();
// console.log("Ctrl + B");
// }
// if (keysPressed["17"] && event.keyCode === 85) {
//   alert(event.key);
//   underLineFunc();
//   // console.log("Ctrl + B");
// }
// });

// textArea.addEventListener("keyup", (event) => {
//   delete keysPressed[event.key];
// });

//! Switch Button Handle
function switchCase(index) {
  let title = notes[index].title;
  let summary = notes[index].summary;
  myFunction(title, summary);
}

function myFunction(title, summary) {
  var popup = document.querySelector("#text");
  let popUpData = `
  <p id="overlay-p">${title} <span>:</span></p>
  <p id="overlay-s">${summary}</p>
  `;
  popup.innerHTML = popUpData;
  on();
}

//! Notes Added Displayed
function truncate(str, n) {
  return str?.length > n ? str.substr(0, n - 1) + " ..." : str;
}

function display() {
  let notesToBeDisplay = "";
  notes.forEach((element, index) => {
    notesToBeDisplay += `
    <div class="card" id=${index} onclick="switchCase(this.id)" >
    <span>${element.title}</span>
    <p>${truncate(element.summary, 100)}</p>
    </div>`;
  });

  if (notes.length !== 0) {
    document.querySelector("#display-notes").innerHTML = notesToBeDisplay;
  }
}

//! Overlay
function on() {
  document.querySelector("#overlay").style.display = "block";
}
function off() {
  document.querySelector("#overlay").style.display = "none";
}
