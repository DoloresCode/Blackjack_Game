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
let yourWinsDisplay = document.getElementById("your-wins");
let dealerWinsDisplay = document.getElementById("dealer-wins");
let hitButton = document.getElementById("hit-button");
let standButton = document.getElementById("stand-button");
let youhasBlackJack = false;
let dealerhasBlackJack = false; // variable to track the state of the game for the players, see if the player cash out, still active in the game (not bust)
let youAreActive = true;   // Player(you) is still active in the game
let dealerIsActive = true;
let keepScore = false;
let canHit = true;

// ** START THE GAME ** //

function startGame() {
  deck = createDeck(); // we have the cards with the function ("createDeck()"). we add "deck =" to save the card in the deck variable to use them during the game
  deck = shuffleDeck(deck); // use the variable deck corresponding to shuffled cards generate by the function "shuffleDeck()"
  yourHand = [];
  dealerHand = [];
  yourCards.innerHTML = "";
  dealerCards.innerHTML = "";
  welcomeMessage.textContent = "Let's get started!";
  deal();
  enableHitButton();
  enableStandButton();
  checkInitialHandResults();
}

function deal() {
  [dealerHand, yourHand] = dealHands(deck);
  [dealerHandValues, yourHandValues] = convertCardsToValues(dealerHand, yourHand);
  [dealerCardSum, yourCardSum] = evaluateInitialHands(dealerHandValues, yourHandValues);
  yourCardScoreDiv.textContent = yourCardSum;
  hiddenCard = dealerHand[0]; // I assign the value of the dealer's hidden card
  keepScore = true;
  //dealerTakeAction();
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
    
    //let yourCards = document.getElementById("your-cards");
    //let dealerCards = document.getElementById("dealer-cards");
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
  //for (let i = 0; i < dealerHand.length; i++) {
  //  dealerHandValues.push(checkValue(dealerHand[i]));
  //}
  dealerHand.forEach((card) => { // equivalent to above loop; just another syntax
    dealerHandValues.push(checkValue(card));
  });
  yourHand.forEach((card) => { // equivalent to above loop; just another syntax
    yourHandValues.push(checkValue(card))
  });
  return [dealerHandValues, yourHandValues];
}

function evaluateInitialHands(dealerHandValues, yourHandValues){
  let yourSum = 0;
  let dealerSum = 0;
  yourSum = redefineHandScore(yourHandValues); // sum up the values in yourHandValues arrays and assign the result to "yourSum". reduces() method that reduces an array of values into a single value
  dealerSum = redefineHandScore(dealerHandValues);

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
  checkInitialHandResults() 
}

function redefineHandScore(handValues){
  let handScore = handValues.reduce((accumulator, value) => accumulator + value)
  if ( handScore > 21) {
      let firstAceIndex = handValues.indexOf(11) // returns 0
      if (firstAceIndex > -1){ // if there is an 11 in the index ...
          handValues[firstAceIndex] = 1
          redefineHandScore(handValues)
      }
  }
  
  return handScore
}

// ** DETERMINE THE STATUS OF THE PLAYERS & UPDATE THEM , GIVE THEM THE CHOICE TO ACT ACCORDINGLY ** //

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
  } else if (dealerCardSum === 21) {
    welcomeMessage.textContent = "Dealer has Blackjack! You lose!";
    let hiddenCardImg = dealerCards.children[0];
    hiddenCardImg.src = "./cards/" + hiddenCard + ".png";
    dealerCardScoreDiv.textContent = dealerCardSum;
    dealerCardScoreDiv.textContent = 21;
    disableHitButton();
    disableStandButton();
    youhasBlackJack = false;
    dealerhasBlackJack = true;
    youAreActive = false;
    dealerIsActive = false;
    dealerWins += 1;
  } else if (yourCardSum < 21) {
    welcomeMessage.textContent = "Do you want to hit a card or stand?";
    youhasBlackJack = false;
    dealerhasBlackJack = false;
    youAreActive = true;
    dealerIsActive = true;
  }
  
  yourCardSum = redefineHandScore(yourHandValues); 
  dealerCardSum = redefineHandScore(dealerHandValues); 

  // Update the score divs
  yourCardScoreDiv.textContent = yourCardSum;
  dealerCardScoreDiv.textContent = "?";

  evaluateUserHandScore(); //evaluate the players'score
  updateWinCounts(); 
}

// Hit and Stand Buttons text's turn red when we click and color reset after 1000 milliseconds (= 1 second)

function hit() {
  if (youAreActive && canHit) {
    let yourCard = deck.pop();
    let yourCardImg = document.createElement('img');
    yourCardImg.src = "./cards/" + yourCard + ".png";
    yourHand.push(yourCard);
    yourCards.append(yourCardImg);
    [_, yourHandValues] = convertCardsToValues([], yourHand);  
    yourCardSum = redefineHandScore(yourHandValues);
    yourCardScoreDiv.textContent = yourCardSum;
    evaluateUserHandScore();
  }
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
  yourCardSum = redefineHandScore(yourHandValues); // reduce the value of ace if the sum is over 21
  dealerCardSum = redefineHandScore(dealerHandValues);
  canHit = false; // so the player(you can't hit at that moment)
  disableHitButton();
  disableStandButton();
  dealerIsActive = true;
  evaluateUserHandScore();

  // Show dealer's hidden card - Flip the card face up
  let hiddenCardImg = dealerCards.children[0];
  hiddenCardImg.src = "./cards/" + hiddenCard + ".png";
  dealerCardScoreDiv.textContent = dealerCardSum;   //display dealer card sum

  // evaluate dealer's hand and take actions !!! NOT WORKING
  dealerTakeAction();
}

function dealerTakeAction() {
  while (dealerIsActive && dealerCardSum < 17) {
    welcomeMessage.textContent = "Dealer must deal a card!"; ///////****to make work */
    let dealerCard = deck.pop();
    let dealerCardImg = document.createElement('img');
    dealerCardImg.src = "./cards/" + dealerCard + ".png";
    dealerCards.append(dealerCardImg);
    dealerHand.push(dealerCard);
    [dealerHandValues, _] = convertCardsToValues(dealerHand, _);
    dealerCardSum = redefineHandScore(dealerHandValues);
    dealerCardScoreDiv.textContent = dealerCardSum;
    updateWinCounts();
  }

  if (dealerCardSum > 21) {  
    welcomeMessage.textContent = "Dealer busts, you win!";
    yourWins += 1;
  } else if (yourCardSum === dealerCardSum) {  
    welcomeMessage.textContent = "It's a tie!";
  } else if (yourCardSum > dealerCardSum) {   
    welcomeMessage.textContent = "Congratulations! You win!";
    yourWins += 1;
  } else if (yourCardSum < dealerCardSum) {   
    welcomeMessage.textContent = "You lose!";
    dealerWins += 1;
  }

  updateWinCounts();
}

// ** WINNING CONDITIONS ** //

function evaluateUserHandScore() {  
  if (yourCardSum > 21) { //check if You bust (here, yes!)
    welcomeMessage.textContent = "You bust! Dealer wins.";
    youAreActive = false;
    dealerWins += 1;
    updateWinCounts();
    disableHitButton();
    disableStandButton();
  } else if (yourCardSum === 21) {
    welcomeMessage.textContent = "21! Blackjack! You win.";
    youAreActive = false;
    yourWins += 1;
    updateWinCounts();
  }  
}

function updateWinCounts() {
  yourWinsDisplay.textContent = "Player Wins: " + yourWins;
  dealerWinsDisplay.textContent = "Dealer Wins: " + dealerWins;
}

function restartGame() {
  keepScore = true;
  welcomeMessage.textContent = "Restarting game in 5 seconds...";
  setTimeout(function() {
    startGame();
    welcomeMessage.textContent = "Welcome to the game!";
  }, 5000);
}


function enableStartButton() {
  startButtonDisabled = false;
  startButton.style.backgroundColor = "blue";
  setTimeout(function() {
   startButton.style.backgroundColor = "";
    startButton.onclick = startGame;
    }, 1000);
}
