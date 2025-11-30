//------------CREATING THE CARDS------------//

const images = []; // Creating the list of card data objects
for (let i = 1; i <= 10; i++) {
  images.push({
    src: `images/card${i}.png`, //property
    //flipped: false, //property
  });
}

//------------DOM REGION FOR BOARD AND IMAGES------------//

const cards = [...images, ...images].map((card) => ({ ...card })); // "..." spread operator, adds images array twice to create copies
const board = document.getElementById("game-board"); //targeting the game-board container

//cardData is my object. cardData.src is the string inside of my object.
cards.forEach((cardData) => {
  //in every loop takes an element from images array
  const card = document.createElement("div");
  card.classList.add("card"); //creating dividers for each card, keeps both front and back sides of the card

  card.cardData = cardData; // attach the JS object to the DOM element

  const front = document.createElement("img"); //creating front side of the img element
  front.src = cardData.src; //source is current card image
  front.classList.add("front");

  const back = document.createElement("img"); //creating back side of the img element
  back.src = "images/backside.png";
  back.classList.add("back");

  //order is important for CSS//
  card.appendChild(front); //adding front img to the card
  card.appendChild(back); //adding back img to the card
  board.appendChild(card); //adding cards to the board
});

//------------CARD MATCHING LOGIC------------//

const cardsElements = document.querySelectorAll(".card");

let hasFlippedCard = false;
let firstCard, secondCard;

function flipCard() {
  this.classList.add("flip");

  //first click
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    //console.log(hasFlippedCard);
    //console.log(firstCard);
  } else {
    //second click
    hasFlippedCard = false;
    secondCard = this;
  }
  //console.log(secondCard);
}
cardsElements.forEach((card) => card.addEventListener("click", flipCard));
