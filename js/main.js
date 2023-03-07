/*----- constants -----*/
// Players cards' sums at the start of the game
let dealerCardSum = 0;
let yourCardSum = 0;
// Wins
let dealerWins = 0;
let yourWins = 0;
// Keeping track of the number of Ace to see if stay < 21
let dealerAceCount = 0;
let yourAceCount = 0; 

// keep track of the hidden cards of the dealer
let hiddenCard;
let deck;  

// Allows you to hit when yourSum < 21
let actionHit = true

let yourHand = document.querySelector("#your-cards");

// ** START THE GAME ** //

const welcomeMessage = document.getElementById('global-message');

//Buttons & Actions
// to start we need some card to distribute => create the deck
// Call a function when the window onload

window.onload = function startGame() {
  let dealerCardScoreDiv = document.querySelector("#dealerCardSum"); // See the sum of the Dealer's cards 1/2
  let yourCardScoreDiv = document.querySelector("#yourCardSum");
  let startBtn = document.querySelector('.start-btn');
  let welcomeMessage = document.getElementById('global-message');
  let dealerHand = [];
  let yourHand = [];

  deck = createDeck(); // we have the cards with the function ("createDeck()"). we add "deck =" to save the card in the deck variable to use them during the game
  deck = shuffleDeck(deck); // use the variable deck corresponding to shuffled cards generate by the function "shuffleDeck()"

  startBtn.addEventListener('click', () => {
    let yourCards = document.getElementById("your-cards");
    let dealerCards = document.getElementById("dealer-cards");
    yourCards.innerHTML = "";
    dealerCards.innerHTML = "";
    welcomeMessage.textContent = "Let's get started!";
    [dealerHand, yourHand] = dealHands(deck);
    [dealerHandValues, yourHandValues] = convertCardsToValues(dealerHand, yourHand);
    [dealerCardSum, yourCardSum] = evaluateInitialHands(dealerHandValues, yourHandValues);
    yourCardScoreDiv.textContent = yourCardSum;
    //dealerCardScoreDiv.textContent = dealerCardSum;  // comment out so we don't see the dealerCardSore before the player stands
    gameStatus()


    // Check for Blackjack
    // Your turn
        // Hit 
          // evaluate the score (Blackjack or bust?)
        // or Stand
    // Dealer Turn
        // Check the score, then choose Hit / Stand (based on score
          // If Hit, 
            // evaluate the score (Blackjack or bust?)
    // If the Dealer stands
      // Final evaluation (compare scores)
  });
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
function shuffleDeck(deck) {
  shuffledDeck = [];
  for (let i = 1; i > shuffledDeck.length && i < 53; i++) { // for loop to go through all the sheffledDeck. We iterate from 1 and as long as i >53 to put all the card in the stored shuffeled deck
      let j = Math.floor(Math.random() * deck.length); // Generate a random number between 0-51 and Math.random between 0-1.Math.floor to remove the decimals
      shuffledDeck.push(deck[j]);
      deck.splice(j,1);
  }
  return shuffledDeck; // return the shuffled deck
}

// ** DEALER DEALS THE CARDS ** //

function dealHands(deck) {
  let yourHand = [];
  let dealerHand = [];
  //deal Two cards to the You (player) - loop iterate twice
  for (let i = 0; i < 2; i++) {  
    let yourCard = deck.pop(); // remove last card of the deck array to store them in the variable yourCard
    let dealerCard = deck.pop();
    yourHand.push(yourCard); // add the card to the hand
    dealerHand.push(dealerCard);
    let yourCardImg = document.createElement('img'); //create a new div element in HTML file
    let dealerCardImg = document.createElement('img'); 
    yourCardImg.src = "./cards/" + yourCard + ".png"; //set the source of the card image
    
    let yourCards = document.getElementById("your-cards");
    let dealerCards = document.getElementById("dealer-cards");
    yourCards.append(yourCardImg); // append yourCardImg to yourCards element
    if (i === 0){
      dealerCardImg.src = "./cards/BACK.png";
    } else {
      dealerCardImg.src = "./cards/" + dealerCard + ".png";
    }
    dealerCards.append(dealerCardImg);
  };
  return [dealerHand, yourHand];
}

// ** CALCULATE THE SUM OF THE HANDS & UPDATE THEM ** //

function convertCardsToValues(dealerHand, yourHand) {
  let dealerHandValues = [];
  let yourHandValues = [];  
  dealerCardSum = 0;
  dealerAceCount = 0;
  //for (let i = 0; i < dealerHand.length; i++) {
  //  dealerHandValues.push(checkValue(dealerHand[i]));
  //}
  dealerHand.forEach((card) => { // equivalent to above loop; just another syntax
    dealerHandValues.push(checkValue(card));
  });
  console.log(dealerHandValues);
  yourHand.forEach((card) => { // equivalent to above loop; just another syntax
    yourHandValues.push(checkValue(card))
  });
  return [dealerHandValues, yourHandValues];
}

function evaluateInitialHands(dealerHandValues, yourHandValues){
  let yourSum = 0;
  let dealerSum = 0;
  yourSum = yourHandValues.reduce((accumulator, value) => accumulator + value); // sum up the values in yourHandValues arrays and assign the result to "yourSum". reduces() method that reduces an array of values into a single value
  dealerSum = dealerHandValues.reduce((accumulator, value) => accumulator + value);
  if(yourSum === 22){  //meaning 2 Aces - 11 points 2 times
    yourSum =  12;     //1 Ace: 11 points - 2nd Ace: 1 points
  }
  if(dealerSum === 22){
    dealerSum = 12;
  }
  return [dealerSum, yourSum];
}

//Card's Value

function checkValue(card) {
  let info = card.split("-"); //give composition of the card as an array e.g ["10","D"]
  let value = info[0];
  if (isNaN(value)) {     //meaning it's a face card: A, J, Q, K
      if (value === "A") {
        return 11;
    } else {
      return 10;
    } 
  }
  return parseInt(value); // parseInt(), converts a string to a number and if the value is a number it returns a numeric value of the card.
}

function checkAce(card) {
  if(card[0] === "A") {
    return 1;
  }
  return 0;
}

function aceReduction(cardSum, aceCount) {
  while (cardSum > 21 && aceCount > 0) {
    cardSum  -= 10; // change the 11 to 1 to be below 21 points
    aceCount -= 1;
  }
  return [cardSum, aceCount];
}

// ** DETERMINE THE STATUS OF THE PLAYERS & UPDATE THEM , GIVE THEM THE CHOICE TO ACT ACCORDINGLY ** //

let youhasBlackJack = false;
let dealerhasBlackJack = false; // variable to track the state of the game for the players, see if the player cash out, still active in the game (not bust)
let youisActive = true;   // Player(you) is still active in the game
let dealerisActive = true;

function gameStatus() {
  if (yourCardSum === 21) {
    welcomeMessage.textContent = "Blackjack,! You win!";
    disableHitButton();
    disableStandButton();
    youhasBlackJack = true;
    dealerhasBlackJack = false;
    youisActive = true;
    dealerisActive = false;
    youWins += 1;
    
  } else if (dealerCardSum === 21) {
    welcomeMessage.textContent = "Dealer has Blackjack! You lose!";
    disableHitButton();
    disableStandButton();
    youhasBlackJack = false;
    dealerhasBlackJack = true;
    youisActive = false;
    dealerisActive = true;
    dealerWins += 1;
  } else if (yourCardSum <  21) {
    welcomeMessage.textContent = "Do you want to hit a card or stand?";
    youhasBlackJack = false;
    dealerhasBlackJack = false;
    youisActive = true;
    dealerisActive = true;
  }

  let yourWinsDisplay = document.getElementById("your-wins");   
  let dealerWinsDisplay = document.getElementById("dealer-wins");

  yourWinsDisplay.textContent = "Player Wins: " + yourWins;
  dealerWinsDisplay.textContent = "Dealer Wins: " + dealerWins;
}

// Hit and Stand Buttons text's turn red when we click and color reset after 1000 milliseconds (= 1 second)
let hitButton = document.getElementById("hit-button");
hitButton.addEventListener("click", () => {
  hitButton.style.color = "red";
  setTimeout(function() {
    hitButton.style.color = "initial";
  }, 1000);
  hit();

  function hit() {
    let yourCard = deck.pop();
    let yourCardImg = document.createElement('img');
    yourCardImg.src = "./cards/" + yourCard + ".png";
    yourCards = document.getElementById("your-cards").append(yourCardImg);
    yourCardSum += checkValue(yourCard);
    yourAceCount += checkAce(yourCard);
    document.querySelector("#yourCardSum").textContent = yourCardSum;
    gameStatus();
  }
});

function disableHitButton() {
  hitButton.style.backgroundColor = "grey";
  hitButton.removeEventListener("click");
}

function disableStandButton() {
  standButton.style.backgroundColor = "grey";
  standButton.removeEventListener("click");
}

let standButton = document.getElementById("stand-button");
standButton.addEventListener("click", () => {
  stand();
  standButton.style.color = "red";
  setTimeout(function() {
    standButton.style.color = "initial";
  }, 1000);
  
  function stand() {
    dealerCardSum = aceReduction(dealerCardSum, dealerAceCount);
    [yourCardSum, yourAceCount] = aceReduction(yourCardSum, yourAceCount);
    disableHitButton();
    disableStandButton();
    ////document.getElementById("XXXXXXXX") see the hidden card
  }

  if (yourCardSum > 21) { //check if You bust (here, yes!)
    welcomeMessage.textContent = "You bust! Dealer wins.";
    youisActive = false;
    dealerisActive = true;
    dealerWins += 1;
    gameStatus();
  }

});

//** STAND **/






