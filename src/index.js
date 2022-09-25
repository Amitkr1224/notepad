let textArea = document.getElementById("textarea");
let saveBtn = document.getElementById("save-btn");
let copyBtn = document.getElementById("copy-btn");
let boldBtn = document.getElementById("bold-btn");
let underlineBtn = document.getElementById("under-btn");

let notes = [];
let notesToAdd = "";
textArea.addEventListener("change", (e) => {
  // console.log(e.target.value);
  notesToAdd = e.target.value.trim();
  // console.log(notesToAdd);
});

//! Save
function saveNote() {
  // console.log(notes);
  if (notesToAdd.length > 0) {
    notes.push(notesToAdd);
    document.getElementById("textarea").value = "";
    display();
  } else {
    alert("Textarea is Empty");
  }
}
saveBtn.addEventListener("click", saveNote);

//! Copy
copyBtn.addEventListener("click", () => {
  textArea.select();
  // navigator.clipboard
    // .writeText(textArea.value)
    // .then((clipText) => console.log(clipText));
  // let selectedText = document.getSelection().toString();
  // console.log(selectedText);
  document.execCommand("copy");
});

//! Bold
function boldFunc() {
  let selectedText = window.getSelection().toString();
  if (selectedText.trim() === "") {
    alert("Text Not Selected");
  } else if (selectedText.includes("<b>")) {
    let newText = selectedText.replace("<b>", "");
    newText = newText.replace("</b>", "");
    textArea.value = textArea.value.replace(selectedText, newText);
    notesToAdd = textArea.value;
  } else {
    let newText = `<b>${selectedText}</b>`;
    textArea.value = textArea.value.replace(selectedText, newText);
    notesToAdd = textArea.value;
  }
}

boldBtn.addEventListener("click", boldFunc);

//! UnderLine
function underLineFunc() {
  // console.log(window.getSelection().toString());
  let selectedText = window.getSelection().toString();

  if (selectedText === "") {
    alert("Text Not Selected");
  } else if (selectedText.includes("<u>")) {
    let newText = selectedText.replace("<u>", "");
    newText = newText.replace("</u>", "");
    textArea.value = textArea.value.replace(selectedText, newText);
    notesToAdd = textArea.value;
  } else {
    let newText = `<u>${selectedText}</u>`;
    textArea.value = textArea.value.replace(selectedText, newText);
    notesToAdd = textArea.value;
  }
}

underlineBtn.addEventListener("click", underLineFunc);

//! Checking KeyPress of Ctrl + B & Ctrl + U
let keysPressed = {};

textArea.addEventListener("keydown", (event) => {
  keysPressed[event.keyCode] = true;

  if (keysPressed["17"] && event.keyCode === 66) {
    // alert(event.key);
    boldFunc();
    // console.log("Ctrl + B");
  }
  if (keysPressed["17"] && event.keyCode === 85) {
    // alert(event.key);
    underLineFunc();
    // console.log("Ctrl + B");
  }
});

textArea.addEventListener("keyup", (event) => {
  delete keysPressed[event.keyCode];
});

//! Switch Button Handle
function switchCase(index) {
  // console.log("Hello", num);
  let storedValue = textArea.value;
  if (storedValue === "") {
    alert("There is No Text in Textbox");
  } else {
    textArea.value = notes[index];
    notesToAdd = textArea.value;
    notes[index] = storedValue;
    display();
  }
}

//! Notes Added Displayed
function display() {
  let notesToBeDisplay = "";
  notes.forEach((element, index) => {
    notesToBeDisplay += `
    <div class="card">
    <p>${element}</p>
    <button id="switch-btn" value="${index}" onclick="switchCase(this.value)" class="style-btn">Switch</button>
    </div>`;
  });
  // }

  if (notes.length !== 0) {
    document.getElementById("display-notes").innerHTML = notesToBeDisplay;
    document.getElementById("no-notes").innerHTML = "";
  }
}

if (notes.length === 0) {
  document.getElementById(
    "no-notes"
  ).innerHTML = `<h3 class="no-notes">Add Some Notes...</h3>`;
}
