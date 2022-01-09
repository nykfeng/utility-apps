const fruits = [
  "Apple",
  "Apricot",
  "Avocado",
  "Banana",
  "Blueberry",
  "Cherry",
  "Citrus",
  "Coconut",
  "Durian",
  "Feijoa",
  "Fig",
  "Grape",
  "Grapefruit",
  "Guava",
  "Honeydew",
  "Kiwifruit",
  "Lemon",
  "Lime",
  "Longan / dragon eyes",
  "Lychee",
  "Mandarin",
  "Mango",
  "Mangosteen",
  "Melon",
  "Nashi",
  "Nectarine",
  "Orange",
  "Papaya",
  "Passionfruit",
  "Pawpaw",
  "Peach",
  "Pear",
  "Persimmon",
  "Pineapple",
  "Plum",
  "Poached pears",
  "Pomegranate",
  "Pomelo",
  "Rambutan",
  "Raspberry",
  "Rhubarb",
  "Rockmelon",
  "Star fruit",
  "Strawberry",
  "Tamarillo",
  "Tangelo",
  "Watermelon",
];

const inputEl = document.querySelector(".input");
const resultList = document.querySelector(".result-list");
const searchBtn = document.querySelector(".search-btn");

inputEl.addEventListener("input", function (e) {
  let currentInput = e.target.value.toLowerCase();

  if (currentInput) {
    resultList.classList.remove("hidden");
    let newFruitArr = fruits.filter((fruit) =>
      fruit.toLowerCase().includes(currentInput)
    );

    console.log(newFruitArr);
    let resultHtmlArr = newFruitArr.map((newFruit) => {
      return `<li>${newFruit}</li>`;
    });

    resultList.innerHTML = resultHtmlArr.join("");
  } else {
    removeSearchResult();
  }
});

searchBtn.addEventListener("click", function () {
  const value = inputEl.value;
  const url = `http://www.google.com/search?q=${value}`;
  window.open(url, "_blank");
  removeSearchResult();
});

resultList.addEventListener("click", function (e) {
  console.log(e.target);
  inputEl.value = e.target.textContent;
  removeSearchResult();
});

const removeSearchResult = function () {
  while (resultList.firstChild) {
    resultList.removeChild(resultList.firstChild);
  }
  resultList.classList.add("hidden");
};
