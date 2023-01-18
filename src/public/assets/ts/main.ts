import { appendObjectFields } from "@graphql-tools/utils";

let nameInput = document.getElementById("name") as HTMLInputElement;
let urlInput = document.getElementById("url") as HTMLInputElement;
let uploadButton = document.getElementById("uploadButton") as HTMLButtonElement;
let previousButton = document.getElementById(
  "previousButton"
) as HTMLButtonElement;
let nextButton = document.getElementById("nextButton") as HTMLButtonElement;
let pTag = document.getElementById("pTag") as HTMLParagraphElement;
let catImageDiv = document.getElementById("catImg") as HTMLDivElement;

let currentCatIndex = 0;

uploadButton.addEventListener("click", () => {
  console.log("Upload Click");
  console.log(nameInput.value + urlInput.value);
});

previousButton.addEventListener("click", () => {
  console.log("click previous");
  currentCatIndex -= 1;
  renderCat(currentCatIndex);
});
nextButton.addEventListener("click", () => {
  console.log("Click next!");
  currentCatIndex += 1;
  console.log(cats.length);

  renderCat(currentCatIndex);
});

class Cat {
  name: string;
  url: string;
  constructor(name: string, url: string) {
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

let cats: Cat[] = [cat1, cat2, cat3];

function renderCat(i: number) {
  let catImage = document.getElementById("catImage") as HTMLImageElement;
  console.log(catImage);

  if (!catImage) {
    catImage = document.createElement("img") as HTMLImageElement;
    catImage.setAttribute("id", "catImage");
    catImageDiv.appendChild(catImage);
  }
  catImage.src = cats[i].url;
  pTag.innerHTML = cats[i].name;
}
renderCat(0);
