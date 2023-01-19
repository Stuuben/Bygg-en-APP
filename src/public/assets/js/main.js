let nameInput = document.getElementById("name");
let urlInput = document.getElementById("url");
let summonButton = document.getElementById("summon");
let uploadButton = document.getElementById("uploadButton");
let previousButton = document.getElementById("previousButton");
let nextButton = document.getElementById("nextButton");
let pTag = document.getElementById("pTag");
let catImageDiv = document.getElementById("catImg");

let currentCatIndex = 0;
let catsData = [];

summonButton.addEventListener("click", () => {
  console.log("Summon Click");
});

uploadButton.addEventListener("click", () => {
  console.log("Upload Click");
  console.log(nameInput.value + urlInput.value);
  fetch("https://sheetdb.io/api/v1/9bojdg20qf1vr", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: [
        {
          id: crypto.randomUUID(),
          name: nameInput.value,
          url: urlInput.value,
        },
      ],
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
});

previousButton.addEventListener("click", () => {
  console.log("click previous");
  catImageDiv.innerHTML = "";
  currentCatIndex -= 1;
  renderCat(catsData);
});
nextButton.addEventListener("click", () => {
  console.log("Click next!");
  catImageDiv.innerHTML = "";
  currentCatIndex += 1;
  console.log(catsData.length);

  renderCat(catsData);
});

/* class Cat {
  constructor(name, url) {
    this.name = name;
    this.url = url;
  }
}

let cat1 = new Cat(
  "Kitten",
  "https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png"
);
let cat2 = new Cat(
  "Mr.Gray",
  "https://images.hindustantimes.com/img/2022/08/07/550x309/cat_1659882617172_1659882628989_1659882628989.jpg"
);
let cat3 = new Cat(
  "Catch fog",
  "https://static.boredpanda.com/blog/wp-content/uploads/2020/01/1-5e2abf6e7e1de__700.jpg"
);
 */

function renderCat(catsData) {
  console.log(catsData);

  pTag.innerHTML = "";

  pTag.innerHTML = catsData[currentCatIndex].name;

  let catImage = document.createElement("img");

  catImage.src = catsData[currentCatIndex].url;

  catImageDiv.appendChild(catImage);

  console.log(catsData[currentCatIndex]);
  /*  let catImage = document.getElementById("catImage");
  console.log(catImage);

  if (!catImage) {
    catImage = document.createElement("img");
    catImage.setAttribute("id", "catImage");
    catImageDiv.appendChild(catImage);
  }
  catImage.src = cats[i].url;

  pTag.innerHTML = cats[i].name; */
}

fetch("https://sheetdb.io/api/v1/9bojdg20qf1vr")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    catsData = data;
    renderCat(data);
  });
