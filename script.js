//------------CREATING THE CARDS------------//

// Creating the list of card data objects
const images = [];
for (let i = 1; i <= 10; i++) {
  images.push({
    src: `images/card${i}.png`,
    flipped: false,
  });
}

//------------DOM REGION FOR BOARD AND IMAGES------------//

const cards = [...images, ...images].map((card) => ({ ...card })); // "..." spread operator, adds images array twice to create copies

//shuffle cards
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
shuffle(cards);

const board = document.getElementById("game-board");

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

//------------CARD FLIPPING LOGIC------------//

const cardsElements = document.querySelectorAll(".card");

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

function flipCard() {
  if (lockBoard) return;
  if (this.cardData.flipped) return;
  if (this === firstCard) return;
  this.classList.add("flip");

  //first click
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;

    //console.log(hasFlippedCard);
    //console.log(firstCard);
  }
  //second click
  secondCard = this;

  checkForMatch();
}
//------------CARD FLIPPING LOGIC------------//

//------------CARD MATCHING LOGIC------------//
function checkForMatch() {
  const isMatch = firstCard.cardData.src === secondCard.cardData.src;

  if (isMatch) {
    lockBoard = true;

    setTimeout(() => {
      firstCard.classList.add("matched");
      secondCard.classList.add("matched");
      firstCard.cardData.flipped = true;
      secondCard.cardData.flipped = true;

      resetBoard();
    }, 500);
  } else {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");
      resetBoard();
    }, 1000);
  }
}
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false]; //board is not locked
  [firstCard, secondCard] = [null, null];
}
cardsElements.forEach((card) => card.addEventListener("click", flipCard));

//------------GAME RESET LOGIC------------//
function resetGame() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];

  cardsElements.forEach((card) => {
    card.classList.remove("flip");
    card.classList.remove("matched");
    card.cardData.flipped = false;
  });
}

const resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", resetGame);
