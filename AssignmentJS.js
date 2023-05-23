const VALUES = {
    "QUEEN": 10,
    "JACK": 10,
    "KING": 10,
    "ACE": 11
}

let drawnCards = []
let cardValues = []
let deckId = ""
let sum 

let element = document.getElementById("start")
element.addEventListener('click', () => newGame() , restartGame() )



let cardImages = document.getElementById("card-images")
cardImages.addEventListener('wheel', () => alert(`Your total is ${sumOfCards(drawnCards)}!`))

let element2 = document.getElementById("submit")
element2.addEventListener("click", () => {submitCards(sum)} )

addEventListener('keypress', event => {
    if (event.code === 'Space') {
    drawCards(1)
    }
  }) 



//Second start button press to restart game
function restartGame(parent){
let clickCounter= 0;
window.onload = function(){
    document.getElementById("start").onclick = function() {
     clickCounter++;
     if (clickCounter > 1) {
    sum = 0
    cardValues = []
    drawnCards = []
    var e = document.getElementById("card-images");     
        var child = e.lastElementChild; 
        while (child) {
            e.removeChild(child);
            child = e.lastElementChild;
}}}}}



 //Step 1: get new deck of cards & draw two cards
function newGame() {
    fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
    .then(function(response){
    return response.json();
    })
    .then(function(response){
    deckId = response.deck_id 
    submit.style.visibility = "visible";
    return drawCards(2)

    })
   
      
}
//Step 2: draw card to add to hand
function drawCards(count) {
    return fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${count}`)
    .then(function(response){
        return response.json();
    })
    .then(function(response){
    console.log(response)
        for(card of response.cards){
            drawnCards.push(card) 
        }
    return response
    })
    .then(function(response){
    displayCards(response.cards)
    })
}
      

function displayCards(cards){
    for (card of cards) {
    var elem = document.createElement("img");
    elem.setAttribute("src", card.image);
    document.getElementById("card-images").appendChild(elem);
    }
} 


//Step 3: get value of cards
function sumOfCards(cards) {
    for (card of cards) {
        if (card.value in VALUES){
            cardValues.push(VALUES[card.value])
        }
        else (cardValues.push(Number(card.value)))
    }

    sum = cardValues.reduce((total, card) => {
        return total + card
    }, 0)
    cardValues = []
    return sum
}




    
 // Step 5: Checking if you win

function submitCards(sum){
if (sum < 17) {
    alert('Sorry you lose! The house had 17!')
}
else if (sum == 17) {
    alert ('Push! Here is your money back')
}
else if (sum  >= 18 && sum < 21) {
    alert('CONGRATULATIONS you win! The house had 17!')
}

else if (sum == 21 ){
    alert('CONGRATULATIONS you win! You get a payout of 1.5x')
    }

else if (sum > 21) {alert ('Sorry you\'ve bust!')}

else {alert('Please add the sum')}
}

//Making submit button appear later


