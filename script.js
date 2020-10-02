const hitSound = new Audio("sounds/swish.m4a");
const loseSound = new Audio("sounds/aww.mp3");
const winSound = new Audio("sounds/cash.mp3");

document.querySelector("#hit").addEventListener("click", hit);
document.querySelector("#deal").addEventListener("click", deal);
document.querySelector("#stand").addEventListener("click", stand);

document.querySelector("#stand").disabled = true;
document.querySelector("#stand").style.color = "black";

var randFirst = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "K", "Q", "A"];
var randSign = ["C", "D", "H", "S"];
var lossesCount = document.querySelector("#losses");
var winsCount = document.querySelector("#wins");
var drawsCount = document.querySelector("#draws");
var myDiv = document.querySelector(".myCards");
var dealerDiv = document.querySelector(".dealerCards");
var myScore = document.getElementById("yourScore");
var dealerScore = document.getElementById("dealerScore");
var array = [];

function check() {
  let me = parseInt(myScore.innerHTML);
  let dealer = parseInt(dealerScore.innerHTML);

  if (dealerScore.innerHTML > 21) {
    document.getElementById("msg").style.color = "green";
    document.querySelector("#msg").innerHTML = "You Win!";
    dealerScore.style.color = "red";
    myScore.style.color = "lightgreen";
    winsCount.innerHTML = parseInt(winsCount.innerHTML) + 1;
    document.querySelector("#stand").disabled = true;
    document.querySelector("#stand").style.color = "rgb(31, 31, 31)";
    document.querySelector("#deal").disabled = false;
    document.querySelector("#deal").style.color = "black";
    winSound.play();
  } else if (me === dealer && dealer >= 17) {
    document.querySelector("#msg").innerHTML = "Draw";
    document.getElementById("msg").style.color = "yellow";
    drawsCount.innerHTML = parseInt(drawsCount.innerHTML) + 1;
    document.querySelector("#stand").disabled = true;
    document.querySelector("#stand").style.color = "rgb(31, 31, 31)";
    document.querySelector("#hit").disabled = true;
    document.querySelector("#hit").style.color = "rgb(31, 31, 31)";
    document.querySelector("#deal").disabled = false;
    document.querySelector("#deal").style.color = "black";
  } else if (me < dealer) {
    document.getElementById("msg").style.color = "red";
    document.querySelector("#msg").innerHTML = "You Lost";
    dealerScore.style.color = "lightgreen";
    myScore.style.color = "red";
    lossesCount.innerHTML = parseInt(lossesCount.innerHTML) + 1;
    document.querySelector("#stand").disabled = true;
    document.querySelector("#stand").style.color = "rgb(31, 31, 31)";
    document.querySelector("#deal").disabled = false;
    document.querySelector("#deal").style.color = "black";
    loseSound.play();
  } else if (me >= dealer) {
    document.querySelector("#stand").disabled = true;
    document.querySelector("#stand").style.color = "rgb(31, 31, 31)";
    document.querySelector("#deal").disabled = true;
    document.querySelector("#deal").style.color = "rgb(31, 31, 31)";
    setTimeout(function () {
      stand();
    }, 700);
  }
}

function hit() {
  document.querySelector("#stand").disabled = false;
  var cardImg = document.createElement("img");
  var X = randFirst[Math.floor(Math.random() * 13)];
  var Y = randSign[Math.floor(Math.random() * 4)];
  cardImg.src = "images/PNG/" + X + Y + ".png";
  myDiv.appendChild(cardImg);
  var card = X + Y;
  array.push(card);

  for (let i = 0; i < array.length; i++) {
    if (array[i - 1] == card && array[i] != card) {
      array.pop();
      X = 0;
      myDiv.removeChild(myDiv.lastChild);
      hit();
      break;
    }
  }

  if (typeof X === "string" && X != "A") {
    myScore.innerHTML = parseInt(myScore.innerHTML) + 10;
  } else if (X === "A" && myScore.innerHTML <= 10) {
    myScore.innerHTML = parseInt(myScore.innerHTML) + 11;
  } else if (X === "A" && myScore.innerHTML > 10) {
    myScore.innerHTML = parseInt(myScore.innerHTML) + 1;
  } else {
    myScore.innerHTML = parseInt(myScore.innerHTML) + X;
  }

  if (myScore.innerHTML == 21) {
    document.querySelector("#hit").disabled = true;
    document.querySelector("#hit").style.color = "rgb(31, 31, 31)";
  } else if (myScore.innerHTML > 21) {
    document.getElementById("msg").style.color = "red";
    document.querySelector("#msg").innerHTML = "You Lost";
    dealerScore.style.color = "lightgreen";
    myScore.style.color = "red";
    lossesCount.innerHTML = parseInt(lossesCount.innerHTML) + 1;
    document.querySelector("#hit").disabled = true;
    document.querySelector("#stand").disabled = true;
    document.querySelector("#hit").style.color = "rgb(31, 31, 31)";
    document.querySelector("#stand").style.color = "rgb(31, 31, 31)";
    loseSound.play();
  }
  hitSound.currentTime = 0;
  hitSound.play();
}

function stand() {
  document.querySelector("#hit").disabled = true;
  document.querySelector("#hit").style.color = "rgb(31, 31, 31)";

  var cardImg = document.createElement("img");
  var X = randFirst[Math.floor(Math.random() * 13)];
  var Y = randSign[Math.floor(Math.random() * 4)];
  cardImg.src = "images/PNG/" + X + Y + ".png";
  dealerDiv.appendChild(cardImg);
  var card = X + Y;
  array.push(card);

  for (let i = 0; i < array.length; i++) {
    if (array[i - 1] == card && array[i] != card) {
      array.pop();
      X = 0;
      dealerDiv.removeChild(dealerDiv.lastChild);
      break;
    }
  }

  if (typeof X === "string" && X != "A") {
    dealerScore.innerHTML = parseInt(dealerScore.innerHTML) + 10;
  } else if (X === "A" && dealerScore.innerHTML <= 10) {
    dealerScore.innerHTML = parseInt(dealerScore.innerHTML) + 11;
  } else if (X === "A" && dealerScore.innerHTML > 10) {
    dealerScore.innerHTML = parseInt(dealerScore.innerHTML) + 1;
  } else {
    dealerScore.innerHTML = parseInt(dealerScore.innerHTML) + X;
  }
  check();
  hitSound.currentTime = 0;
  hitSound.play();
}

function deal() {
  while (myDiv.firstChild) {
    myDiv.removeChild(myDiv.firstChild);
  }
  while (dealerDiv.firstChild) {
    dealerDiv.removeChild(dealerDiv.firstChild);
  }
  myScore.innerHTML = 0;
  dealerScore.innerHTML = 0;
  document.querySelector("#msg").innerHTML = "Let" + "'" + "s Play";
  document.getElementById("msg").style.color = "#FFFCF9";
  document.querySelector("#hit").disabled = false;
  document.querySelector("#hit").style.color = "black";
  document.querySelector("#stand").disabled = true;
  document.querySelector("#stand").style.color = "black";
  myScore.style.color = "#FFFCF9";
  dealerScore.style.color = "#FFFCF9";
  array = [];
}
