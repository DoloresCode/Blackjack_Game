/*----- constants -----*/
// Players cards' sums at the start of the game
let dealerCardSum = 0;
let yourCardSum = 0;
// Wins
let dealerWins = 0;
let yourWins = 0;
// keep track of the hidden cards of the dealer
let hiddenCard;
let deck;  

let youhasBlackJack = false;
let dealerhasBlackJack = false; // variable to track the state of the game for the players, see if the player cash out, still active in the game (not bust)
let youAreActive = true;   // Player(you) is still active in the game
let dealerIsActive = true;

// Variables
let startButtonDisabled = false;
let yourCards = document.getElementById("your-cards");
let dealerCards = document.getElementById("dealer-cards");
let dealerCardScoreDiv = document.querySelector("#dealerCardSum"); // See the sum of the Dealer's cards 1/2
let yourCardScoreDiv = document.querySelector("#yourCardSum");
let startBtn = document.querySelector('.start-btn');
let welcomeMessage = document.getElementById('global-message');
let dealerHand = [];
let yourHand = [];
let dealerHandValues = [];
let yourHandValues = [];
let yourWinsDisplay = document.getElementById("your-wins");
let dealerWinsDisplay = document.getElementById("dealer-wins");
let hitButton = document.getElementById("hit-button");
let standButton = document.getElementById("stand-button");
let resetBtn = document.getElementById("reset-btn");

// ** START THE GAME ** //

function startGame() {
  deck = createDeck(); // we have the cards with the function ("createDeck()"). we add "deck =" to save the card in the deck variable to use them during the game
  deck = shuffleDeck(deck); // use the variable deck corresponding to shuffled cards generate by the function "shuffleDeck()"
  yourHand = [];
  dealerHand = [];
  yourHandValues = [];
  dealerHandValues = [];
  yourCards.innerHTML = "";
  dealerCards.innerHTML = "";
  welcomeMessage.textContent = "Let's get started!";
  enableHitButton();
  enableStandButton();
  deal();
  yourWinsDisplay.textContent = "Player Wins: " + yourWins;
  dealerWinsDisplay.textContent = "Dealer Wins: " + dealerWins;
}

startBtn.addEventListener("click", startGame);

function deal() {
  dealHands(deck);
  convertInitialCardsToValues();
  redefineYourHandScore();
  checkInitialHandResults();
  dealerCardScoreDiv.textContent = "?";
  yourCardScoreDiv.textContent = yourCardSum;
  hiddenCard = dealerHand[0]; // I assign the value of the dealer's hidden card
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
  return deck;
}

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
  //deal Two cards to You (player) - loop iterate twice
  for (let i = 0; i < 2; i++) {  
    let yourCard = deck.pop(); // remove last card of the deck array to store them in the variable yourCard
    let dealerCard = deck.pop();
    yourHand.push(yourCard); // add the card to the hand
    dealerHand.push(dealerCard);
    let yourCardImg = document.createElement('img'); //create a new div element in HTML file
    let dealerCardImg = document.createElement('img'); 
    yourCardImg.src = "./cards/" + yourCard + ".png"; //set the source of the card image
    yourCards.append(yourCardImg); // append yourCardImg to yourCards element
    if (i === 0){
      dealerCardImg.src = "./cards/BACK.png";
    } else {
      dealerCardImg.src = "./cards/" + dealerCard + ".png";
    }
    dealerCards.append(dealerCardImg);
  };
}

// ** CALCULATE THE SUM OF THE HANDS & UPDATE THEM ** //

function convertInitialCardsToValues() {
  //for (let i = 0; i < dealerHand.length; i++) {
  //  dealerHandValues.push(convertCardToValue(dealerHand[i]));
  //}
  dealerHand.forEach((card) => { // equivalent to above loop; just another syntax
    dealerHandValues.push(convertCardToValue(card));
  });
  yourHand.forEach((card) => {
    yourHandValues.push(convertCardToValue(card))
  });
}

//convert Card To Value

function convertCardToValue(card) {
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

function redefineYourHandScore(){
  yourCardSum = yourHandValues.reduce((accumulator, value) => accumulator + value)
  let firstAceIndex = yourHandValues.indexOf(11)
  if (yourCardSum > 21 && firstAceIndex > -1) {
      yourHandValues[firstAceIndex] = 1
      redefineYourHandScore()
  }
}

function redefineDealerHandScore(){
  dealerCardSum = dealerHandValues.reduce((accumulator, value) => accumulator + value)
  let firstAceIndex = dealerHandValues.indexOf(11)
  if (dealerCardSum > 21 && firstAceIndex > -1) {
      dealerHandValues[firstAceIndex] = 1
      redefineDealerHandScore()
  }
}

// ** DETERMINE THE STATUS OF THE PLAYERS & UPDATE THEM, GIVE THEM THE CHOICE TO ACT ACCORDINGLY ** //

function checkInitialHandResults() { 
  if (yourCardSum === 21) {
    welcomeMessage.textContent = "Blackjack! You win!";
    disableHitButton();
    disableStandButton();
    youhasBlackJack = true;
    dealerhasBlackJack = false;
    youAreActive = false;
    dealerIsActive = false;
    yourWins += 1;
  } else if (yourCardSum < 21) {
    welcomeMessage.textContent = "Do you want to hit a card or stand?";
    youhasBlackJack = false;
    dealerhasBlackJack = false;
    youAreActive = true;
    dealerIsActive = true;
  }
  
  redefineYourHandScore(); 
  yourCardScoreDiv.textContent = yourCardSum; // Update the score divs
  dealerCardScoreDiv.textContent = "?";
  updateWinCounts(); 
}

function hit() {
    let yourCard = deck.pop();
    let yourCardImg = document.createElement('img');
    yourCardImg.src = "./cards/" + yourCard + ".png";
    yourHand.push(yourCard);
    yourCards.append(yourCardImg);
    yourHandValues.push(convertCardToValue(yourCard));
    redefineYourHandScore();
    yourCardScoreDiv.textContent = yourCardSum;
    evaluateUserHandScore();
  }

function disableHitButton() {
  hitButton.onclick = "";
}

function disableStandButton() {
  standButton.onclick = "";
}

function enableHitButton() {
  hitButton.onclick = hit;
}

function enableStandButton() {
  standButton.onclick = stand;
}

function stand() {
  disableHitButton();
  disableStandButton();
  evaluateUserHandScore();

  // Show dealer's hidden card - Flip the card face up
  let hiddenCardImg = dealerCards.children[0];
  hiddenCardImg.src = "./cards/" + hiddenCard + ".png";
  dealerCardScoreDiv.textContent = dealerCardSum;   //display dealer card sum

  // evaluate dealer's hand and take actions 
  dealerTakeAction();
}

function dealerTakeAction() {
  redefineDealerHandScore();
  dealerCardScoreDiv.textContent = dealerCardSum;

  while (dealerCardSum < 17) {
    welcomeMessage.textContent = "Dealer must deal a card!"; 
    let dealerCard = deck.pop();
    let dealerCardImg = document.createElement('img');
    dealerCardImg.src = "./cards/" + dealerCard + ".png";
    dealerCards.append(dealerCardImg);
    dealerHand.push(dealerCard);
    dealerHandValues.push(convertCardToValue(dealerCard));
    redefineDealerHandScore();
    dealerCardScoreDiv.textContent = dealerCardSum;
    updateWinCounts();
  }

  if (dealerCardSum > 21) {  
    welcomeMessage.textContent = "Dealer busts, you win!";
    yourWins += 1;
  } else if (dealerCardSum === 21) {
    welcomeMessage.textContent = "Dealer has Blackjack! You lose!";
    let hiddenCardImg = dealerCards.children[0];
    hiddenCardImg.src = "./cards/" + hiddenCard + ".png";
    dealerCardScoreDiv.textContent = dealerCardSum;
    dealerCardScoreDiv.textContent = 21;
    dealerWins += 1;
  } else if (yourCardSum === dealerCardSum) {  
    welcomeMessage.textContent = "It's a tie! No one wins or loses!";
  } else if (yourCardSum > dealerCardSum) {   
    welcomeMessage.textContent = "Congratulations! You win!";
    yourWins += 1;
  } else if (yourCardSum < dealerCardSum) {   
    welcomeMessage.textContent = "You lose!";
    dealerWins += 1;
  }
  updateWinCounts();
}

// ** SOME WINNING CONDITIONS ** //

function evaluateUserHandScore() {  
  if (yourCardSum > 21) { //check if You bust (here, yes!)
    welcomeMessage.textContent = "You bust! Dealer wins.";
    youAreActive = false;
    dealerIsActive = false;
    youhasBlackJack = false;
    dealerhasBlackJack = false;
    dealerWins += 1;
    updateWinCounts();
    disableHitButton();
    disableStandButton();
  } else if (yourCardSum === 21) {
    welcomeMessage.textContent = "21! Blackjack! You win!";
    youAreActive = false;
    dealerIsActive = false;
    youhasBlackJack = true;
    dealerhasBlackJack = false;
    yourWins += 1;
    updateWinCounts();
    disableHitButton();
    disableStandButton();
  }  
}

function updateWinCounts() {
  yourWinsDisplay.textContent = "Player Wins: " + yourWins;
  dealerWinsDisplay.textContent = "Dealer Wins: " + dealerWins;
}

function reset() {
    youAreActive = true;
    dealerIsActive = true;
    deck = createDeck();
    deck = shuffleDeck;
    dealerCardSum = 0;
    yourCardSum = 0;
    yourWins = 0;
    dealerWins = 0;
    youhasBlackJack = false;
    dealerhasBlackJack = false;

    // remove the cards displayed
    let yourCards = document.getElementById("your-cards");
    let dealerCards = document.getElementById("dealer-cards");
    yourCards.innerHTML = "";
    dealerCards.innerHTML = "";
  
    // Reset Sum Players' Hands displayed on screen
    dealerCardScoreDiv.textContent = "";
    yourCardScoreDiv.textContent = "";

    // Reset wins displayed on screen
    yourWinsDisplay.textContent = "Player Wins: " + "";
    dealerWinsDisplay.textContent = "Dealer Wins: " + "";

    // Reset message displayed on screen
    let welcomeMessage = document.getElementById("global-message");
    welcomeMessage.textContent = "Let's get started!";
}
resetBtn.addEventListener("click", reset)