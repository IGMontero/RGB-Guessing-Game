var colorDisplay = document.querySelector("#colorDisplay");
var colorButtons = document.getElementsByClassName("square");
var winnerColor = undefined;
var squareNumber = 6;
var winnerIndex = undefined;
var messageDisplay = document.querySelector("#messageDisplay");
var newColorsButton = document.querySelector("#newColors");
var easyButton = document.querySelector("#easyButton");
var hardButton = document.querySelector("#hardButton");
var h1 = document.querySelector("h1");
var gameOver = false;
var gameStarted = false;

//Game:

//Start game
startGame();
//Add event listener


//Buttons

easyButton.addEventListener("click",function(){
	if(!gameOver && !gameStarted){
		easyButton.classList.add("selected");
		hardButton.classList.remove("selected");

		squareNumber = 3;
		startGame();
	}
	
});


hardButton.addEventListener("click",function(){
	if(!gameOver && !gameStarted){
		hardButton.classList.add("selected");
		easyButton.classList.remove("selected");
		squareNumber = 6;
		startGame();
	}
	
});


newColorsButton.addEventListener("click" , startGame);

//Functions

function generateColor(){
var r = Math.floor(Math.random()*255);
var g = Math.floor(Math.random()*255);
var b = Math.floor(Math.random()*255);
return "rgb("+r+","+g+","+b+")";
};

function startGame(){
	gameStarted = false;
	gameOver = false;
	messageDisplay.textContent = "";
	h1.style.backgroundColor = "steelblue";
	winnerColor = generateColor();
	colorDisplay.textContent = winnerColor;
	winnerIndex = Math.floor(Math.random() * squareNumber);
	console.log(winnerIndex);
	colorButtons[winnerIndex].style.backgroundColor = winnerColor;

	//Genero color para los cuadrados visibles
	for(var i=0;i<squareNumber;i++){
		if(i!=winnerIndex){
			colorButtons[i].style.backgroundColor = generateColor();
		}
	}

	//Hago desaparecer los invisibles
	for(var i = squareNumber;i<6;i++){
		colorButtons[i].style.backgroundColor = "#232323";
	}

	//Agrego los eventos de click a los visibles
	for(var i=0;i<squareNumber;i++){
	colorButtons[i].addEventListener("click",pickSquare);
	}

	//Saco los eventos a los invisibles
	for(var i = squareNumber;i<6;i++){
		colorButtons[i].removeEventListener("click",pickSquare);
	}
}

function changeColors(color){
	h1.style.backgroundColor = color;
	for(var i = 0; i<squareNumber;i++){
		colorButtons[i].style.backgroundColor = color;
	}
}


function pickSquare(){
	if(!gameOver){
		if(!gameStarted){
			gameStarted = true;
		}
		if(this === colorButtons[winnerIndex]){
			messageDisplay.textContent = "You Won!";
			changeColors(winnerColor);
			gameOver = true;

		}else{
			this.style.backgroundColor = "#232323";
			messageDisplay.textContent = "Try Again!";
		}
	}
}