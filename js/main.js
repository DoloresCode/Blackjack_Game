/*----- constants -----*/
// Players' sums at the start of the game
let dealerSum = 0;
let yourSum = 0;

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
// ** START THE GAME **
//Button: START GAME - when we click

let startBtn = document.querySelector('.start-btn');
let welcomeMessage = document.getElementById('welcome-message');

startBtn.addEventListener('click', function() {
  welcomeMessage.textContent = "Let's get started!";
});

// to start we need some card to distribute => create the deck
// Call a function when the window onload 
window.onload = function() {
    deck = createDeck(); // we have the cards with the function ("createDeck()"). we add "deck =" to save the card in the deck variable to use them during the game
    deck = shuffleDeck(); // use the variable deck corresponding to shuffled cards generate by the function "shuffleDeck()"
}

function createDeck() {
    let types = ['S','H','D','C'];
    let values = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
    deck = []; //initiate with empthy array before creating a for loop to go through the 2 arrays

//For loop to go through the 2 arrays (all "types" first and after "values") 
//so A-S, 2-S, 3-S...K-S and after A-H until K-H, etc.
    for (let i = 0; i < types.length; i++) {
        for (let j = 0; j < values.length; j++) {
            deck.push(values[j] + "-" + types[i]); 
        }
    }
     //console.log(deck)
    return deck;
}

//We have the deck and now we need to shuffle a function + randomy selecting the cards.
// Definition of the function suffleDeck (also add the variable at the top when the window load)
function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) { // Go through all the cards in the array/deck
        let j = Math.floor(Math.random() * deck.lenght); // Genarate a random number between 0-51 and Math.random betweenn 0-1.Math.floor to remove the decimals
        [shuffleDeck[i], shuffleDeck[j]] = [shuffleDeck[j], shuffleDeck[i]]; // to swap the values of the two variables
    }
    return shuffleDeck;
}



//



// What to do With Ace's Counts? When sum>21 or not - posibility to reduce the value of Ace
// Hint: Ace's values = 10 or 1 points






// Function to HIT


// Function to STAND


// Winning Conditions
// Declare 2 variables for a first and second card with random value between 2-11 and do their sum.
let firstCard = 3
let secondCard = 6
let sum = firstCard + secondCard
let message = ""; //Declaration of a variable for the message with a value as an empty string
let hasBlackJack = false; // variable to track the state of the game for the players, see if the player cash out, still active in the game (not bust)
let isActive = true;   

if (sum <  21) {
	  message = "Do you want to hit a card or stand?";
} else if (sum === 21) {
	  message = "Yeah, you have got a Blackjack";
	  hasBlackJack = true;
} else {
    message = "You bust, sorry! You can still play again";
	  let isActive = false;      
}

//State of the Game – the console logs to check if it is working
//console.log(hasBlackJack)
//console.log(isActive)
console.log(message)











  /*----- event listeners -----*/


  /*----- functions -----*/

