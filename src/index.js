let textArea = document.getElementById("textarea");
let title = document.getElementById("input-title");
let saveBtn = document.getElementById("save-btn");
let copyBtn = document.getElementById("copy-btn");
let boldBtn = document.getElementById("bold-btn");
let underlineBtn = document.getElementById("under-btn");

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
  // console.log(titleInput);
});

//! Save
function saveNote() {
  // console.log(notes);
  if (textAreaInput.length > 0 && titleInput.length > 0) {
    notesToAdd = {
      title: titleInput,
      summary: textAreaInput,
    };
    notes.push(notesToAdd);
    textArea.value = "";
    title.value = "";
    display();
  } else if (titleInput.length === 0) {
    alert("Enter Title");
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
  console.log(selectedText);
  if (selectedText.trim() === "") {
    alert("Text Not Selected");
  } else if (selectedText.includes("<b>")) {
    let newText = selectedText.replace("<b>", "");
    newText = newText.replace("</b>", "");
    // textArea.value = textArea.value.replace(selectedText, newText);
    notesToAdd = newText;
  } else {
    let newText = `<b>${selectedText}</b>`;
    // textArea.value = textArea.value.replace(selectedText, newText);
    // textArea.selectedText.style.color = "red";
    textAreaInput = newText;
  }
}

boldBtn.addEventListener("click", boldFunc);

//! UnderLine
function underLineFunc() {
  // console.log(window.getSelection().toString());
  let selectedText = window.getSelection().toString();
  console.log(selectedText);
  if (selectedText === "") {
    alert("Text Not Selected");
  } else if (selectedText.includes("<u>")) {
    let newText = selectedText.replace("<u>", "");
    newText = newText.replace("</u>", "");
    // textArea.value = textArea.value.replace(selectedText, newText);
    textAreaInput = newText;
  } else {
    let newText = `<u>${selectedText}</u>`;
    // textArea.value = textArea.value.replace(selectedText, newText);
    textAreaInput = newText;
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
  let storedtextAreaValue = textArea.value;
  let storedtitleValue = title.value;
  if (storedtextAreaValue === "" && storedtitleValue === "") {
    alert("There is No Text in Textbox");
  } else {
    textArea.value = notes[index].summary;
    title.value = notes[index].title;
    // notesToAdd = textArea.value;
    let newObj = {
      title: storedtitleValue,
      summary: storedtextAreaValue,
    };
    notes[index] = newObj;
    display();
  }
}

//! Notes Added Displayed
function display() {
  let notesToBeDisplay = "";
  notes.forEach((element, index) => {
    notesToBeDisplay += `
    <div class="card">
    <span>${element.title}</span>
    <p>${element.summary}</p>
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
