/*----- constants -----*/

// Players cards' sums at the start of the game
let dealerCardSum = 0;
let yourCardSum = 0;

// Scores
let dealerScore = 0;
let yourScore = 0;

  /*----- state variables -----*/
// Keeping track of the number of Ace to see if stay < 21
let dealerAceCount = 0;
let yourAcecount = 0; 

// keep track of the hidden cards of the dealer
let hiddenCard;
let deck;  

// Allows you to hit when yourSum < 21
let actionHit = true

  /*----- cached elements  -----*/
// ** START THE GAME ** //

//Buttons & Actions

let startBtn = document.querySelector('.start-btn');
let welcomeMessage = document.getElementById('global-message');

startBtn.addEventListener('click', function() {
  welcomeMessage.textContent = "Let's get started! " + message;
});

// to start we need some card to distribute => create the deck
// Call a function when the window onload 
window.onload = function() {
  deck = createDeck(); // we have the cards with the function ("createDeck()"). we add "deck =" to save the card in the deck variable to use them during the game
  deck = shuffleDeck(); // use the variable deck corresponding to shuffled cards generate by the function "shuffleDeck()"
  startGame();
}

function createDeck() {
  let suits = ['S','H','D','C'];
  let values = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
  deck = []; //initiate with empthy array before creating a for loop to go through the 2 arrays

//For loop to go through the 2 arrays (all "suits" first and after "values") 
//so A-S, 2-S, 3-S...K-S and after A-H until K-H, etc.
  for (let i = 0; i < suits.length; i++) {
      for (let j = 0; j < values.length; j++) {
          deck.push(values[j] + "-" + suits[i]); 
      }
  }
   //console.log(deck)
  return deck;
}

//We have the deck and now we need to shuffle a function + randomly select the cards.
// Definition of the function suffleDeck (also add the variable at the top when the window load)
function shuffleDeck() {
  for (let i = 0; i < deck.length; i++) { // Go through all the cards in the array/deck
      let j = Math.floor(Math.random() * deck.length); // Generate a random number between 0-51 and Math.random between 0-1.Math.floor to remove the decimals
      [deck[i], deck[j]] = [deck[j], deck[i]]; // to swap 2 cards with 2 other cards by creating an array of 2 elements
  }
  return deck; // return the shuffled deck
}

// ** CARDS DISTRIBUTION ** //

function dealHands() {
  let dealerHand = [];
  let yourHand = [];

  //deal Two cards to the You (player) - loop iterate twice
  for (let i = 0; i < 2; i++) {  
    let yourCard = deck.pop(); // remove last card of the deck
    yourHand.push(yourCard);
    let yourCardDiv = document.createElement('div');
  }                             
}




// Declare 2 variables for a first and second card with random value between 2-11 and do their sum.
let firstCard = 3
let secondCard = 3
let sum = firstCard + secondCard
let message = ""; //Declaration of a variable for the message with a value as an empty string
let hasBlackJack = false; // variable to track the state of the game for the players, see if the player cash out, still active in the game (not bust)
let isActive = true; // Player(you) is still active in the game

   dealerCardSum = document.querySelector("#dealerCardSum"); // See the sum of the Dealer's cards 1/2
   yourCardSum = document.querySelector("#yourCardSum");
   yourHand = document.querySelector("#your-cards");


if (sum <  21) {
  dealerCardSum.textContent = sum; // See the sum of the Dealer's cards 2/2
  yourCardSum.textContent = sum;
	  message = "Do you want to hit a card or stand?"; // welcomeMessage.textContent = "Do you want to hit a card or stand?";
} else if (sum === 21) {
	  message = "Yeah, you have got a Blackjack"; // welcomeMessage.textContent = "Yeah, you have got a Blackjack";
	  hasBlackJack = true;
} else {
    message = "You bust, sorry! You can still play again"; // welcomeMessage.textContent = "You bust, sorry! You can still play again";
	  let isActive = false;      
}

// check the scores and update them
//  dealerScore = document.querySelector("#dealer-scores")
//  dealerScore.textContent = XXXXXX;
//  yourScore = document.querySelector("#your-scores")
//  yourScore.textContent = XXXXX;

let hitButton = document.querySelector('input[value="Hit"]');
let standButton = document.querySelector('input[value="Stand"]');


// ** RENDER THE GAME ** //

function startGame() {
  hiddenCard = deck.pop();
  dealerCardSum += getValue(hiddenCard);
  dealerAceCount += checkAce(hiddenCard);
  console.log(hiddenCard);
  console.log(dealerCardSum );
}

//Card's Value

function checkValue(card) {
    let info = card.split("-"); //give composition of the card as an array e.g ["10","D"]
    let value = info[0];
    if (isNaN(value)) {
        if (value === "A") {
            return 11;
        } else {
        return 10;
    }
    return isaNum(value);
  }
}

function checkAce(card) {     //number of Ace
    if (card[0] === "A") {
        return 1;
    }
        return 0;          
}




///????? work on that
// Dealer deals 2 cards to each from a shuffle deck
// the function "dealCards()" call "shuffleDeck()" to make sure it's shuffle before giving the cards
function dealCards() {
  shuffleDeck();
  dealerHand.push(deck.pop());
  dealerHand.push(deck.pop());

  yourHand.push(deck.pop());
  yourHand.push(deck.pop());
}
 










// ** Winning Conditions **


//State of the Game – the console logs to check if it is working
//console.log(hasBlackJack)
//console.log(isActive)
//console.log(message)





// What to do With Ace's Counts? When sum>21 or not - posibility to reduce the value of Ace
// Hint: Ace's values = 10 or 1 points






// Function to HIT


// Function to STAND






  /*----- event listeners -----*/


  /*----- functions -----*/

