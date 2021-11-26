const addBtn = document.querySelector(".add-btn");
const listBody = document.querySelector(".body-field");
const inputField = document.getElementById("toDoInput");

addBtn.addEventListener("click", function () {
  if (inputField.value) {
    const paragraph = document.createElement("p");
    paragraph.classList.add("Para-Style");
    const removeBtn = document.createElement("i");
    removeBtn.classList.add("remove-btn", "fas", "fa-trash-alt");
    paragraph.innerText = inputField.value;
    listBody.appendChild(paragraph);
    listBody.appendChild(removeBtn);

    inputField.value = "";
    removeBtn.addEventListener("click", function () {
      listBody.removeChild(paragraph);
      listBody.removeChild(removeBtn);
    });
  }
});
