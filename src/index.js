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
    display();
  } else if (titleInput.length === 0) {
    alert("❌ Title is Empty ❌");
  } else {
    alert("❌ Textarea is Empty ❌");
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
    alert("❌ Text Not Selected ❌");
  } else if (selectedText.includes("<b>")) {
    let newText = selectedText.replace("<b>", "");
    newText = newText.replace("</b>", "");
    textAreaInput = textAreaInput.replace(selectedText, newText);
    // notesToAdd = newText;
  } else {
    let newText = `<b>${selectedText}</b>`;
    console.log(newText);
    textAreaInput = textAreaInput.replace(selectedText, newText);
    // textAreaInput = newText;
  }
}

boldBtn.addEventListener("click", boldFunc);

//! UnderLine
function underLineFunc() {
  let selectedText = window.getSelection().toString();
  // console.log(selectedText);
  if (selectedText === "") {
    alert("❌ Text Not Selected ❌");
  } else if (selectedText.includes("<u>")) {
    let newText = selectedText.replace("<u>", "");
    newText = newText.replace("</u>", "");
    textAreaInput = textAreaInput.replace(selectedText, newText);
    // textAreaInput = newText;
  } else {
    let newText = `<u>${selectedText}</u>`;
    textAreaInput = textAreaInput.replace(selectedText, newText);
    // textAreaInput = newText;
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
    <p>${truncate(element.summary, 50)}</p>
    </div>`;
  });

  if (notes.length !== 0) {
    document.getElementById("display-notes").innerHTML = notesToBeDisplay;
  }
}

//! Overlay
function on() {
  document.getElementById("overlay").style.display = "block";
}
function off() {
  document.getElementById("overlay").style.display = "none";
}
