/*----- constants -----*/
// Players' sums at the start of the game
const dealerSum = 0;
const yorSum = 0;

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
    createDeck();
    suffleDeck
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
     console.log(deck)   
}

//We have the deck and now we need to shuffle a function.
// Definition of the function suffleDeck (also add the variable at the top when the window load)
function shuffleDeck() {
    //for loop? Math.random?

}







  /*----- event listeners -----*/


  /*----- functions -----*/

