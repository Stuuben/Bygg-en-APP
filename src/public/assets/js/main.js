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
  window.location.reload();
});

previousButton.addEventListener("click", () => {
  console.log("click previous");
  catImageDiv.innerHTML = "";
  currentCatIndex -= 1;
  if (currentCatIndex <= 0) {
    currentCatIndex = 0;
  }
  renderCat(catsData);
});
nextButton.addEventListener("click", () => {
  console.log("Click next!");
  catImageDiv.innerHTML = "";
  currentCatIndex += 1;
  console.log(catsData.length);

  renderCat(catsData);
});

function renderCat(catsData) {
  console.log(catsData);

  pTag.innerHTML = "";

  pTag.innerHTML = catsData[currentCatIndex].name;

  let catImage = document.createElement("img");

  catImage.src = catsData[currentCatIndex].url;

  catImageDiv.appendChild(catImage);

  console.log(catsData[currentCatIndex]);

  if (!catImage) {
    catImage = document.createElement("img");
    catImage.setAttribute("id", "catImage");
    catImageDiv.appendChild(catImage);
  }
}

fetch("https://sheetdb.io/api/v1/9bojdg20qf1vr")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    catsData = data;
    renderCat(data);
  });
