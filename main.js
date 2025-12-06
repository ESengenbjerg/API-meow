// Elements in HTML
const button = document.querySelector("button");
const article = document.querySelector("article");

// ---------- GIF ----------
const imageBox = document.querySelector(".gifImages");

// List with GIFs
const images = [
  "assets/bake.gif",
  "assets/christmasTree.gif",
  "assets/cookies.gif",
  "assets/greeting.gif",
  "assets/greeting2.gif",
  "assets/waiting.gif",
];

// Create img for GIFs
const gifImage = document.createElement("img");
gifImage.alt = "GIFs with Pusheen the super cute cat";

//Start value for indexed array
let index = 0;

// ----------EVENT LISTENER ----------
button.addEventListener("click", () => {
  const count = document.querySelector('input[name="factCount"]:checked').value;
  const url = `https://meowfacts.herokuapp.com/?count=${count}`;

  // Remove existing result:
  const deleteResult = document.querySelector(".resultBox");
  if (deleteResult) {
    deleteResult.remove();
  }

  const deleteImage = document.querySelector(".gifImages img");
  if (deleteImage) {
    deleteImage.remove();
  }

  //Create div for both results
  const resultBox = document.createElement("div");
  resultBox.classList.add("resultBox");

  // Fetch facts from API
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const facts = data.data;

      // Add class to resultbox
      resultBox.classList.add("resultGreen");

      // Create p elements for each fact:
      facts.forEach((fact) => {
        const p = document.createElement("p");
        p.textContent = fact;
        resultBox.appendChild(p);
      });

      //Append resultDiv to container/article
      article.appendChild(resultBox);

      //---------- Slideshow ----------
      gifImage.src = images[index];

      index++;

      //Start from 0 when reaching end of array
      if (index >= images.length) {
        index = 0;
      }

      //Append image to site
      imageBox.appendChild(gifImage);
    })
    .catch((error) => {
      console.error("Error fetching quotes:", error);

      //Add error class to resultBox
      resultBox.classList.add("error");

      const p = document.createElement("p");
      p.textContent = "Could not load facts. Try again later.";
      resultBox.appendChild(p);

      //Append errorDiv to container/article
      article.appendChild(resultBox);
    });
});
