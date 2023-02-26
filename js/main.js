/*----- constants -----*/
// Players' sums at the start of the game
let dealerSum = 0;
let yourSum = 0;

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











  /*----- event listeners -----*/


  /*----- functions -----*/

