// Display objects
var colorDisplay = document.querySelector("#colorDisplay");
var colorSquares = document.querySelectorAll(".color");
var title = document.querySelector(".title");
var winner = document.querySelector(".selectorColor");

// Buttons
var newGame = document.querySelector("#newGame");
var message = document.querySelector("#message");
var diffculty = document.querySelectorAll(".diffculty");

// color array
var colors = [];
var numberOfSquares = 0;

// add listenters

var checkColor = (event) =>{
    var currentSquare = event.target;
    console.log(currentSquare.style.backgroundColor);
    console.log(colorDisplay.innerHTML.toLowerCase())
    if(currentSquare.style.backgroundColor === colorDisplay.innerHTML.toLowerCase())
    {
        message.innerHTML = "You Won!!";
        for(var i = 0; i < numberOfSquares; i++)
        {
            colorSquares[i].style.display = "block";
            colorSquares[i].style.backgroundColor = currentSquare.style.backgroundColor;
        }
        title.style.backgroundColor = currentSquare.style.backgroundColor;
        for(var i = 0; i < diffculty.length; i++)
        {
            if(diffculty[i].classList.contains("selectorColor"))
            {
                diffculty[i].style.backgroundColor = currentSquare.style.backgroundColor;
            }
        }
    }
    else
    {
        message.innerHTML = "Try Again";
        currentSquare.style.backgroundColor = "#232323";
    }
}

for(var i = 0; i < colorSquares.length; i++)
{
    colorSquares[i].addEventListener("click", checkColor)
}

var createNewGame = () =>{
    numberOfSquares = diffculty[0].classList.contains("selectorColor") ? 3 : 6;
    colors = [];
    for(var i = 0; i < colorSquares.length; i++)
    {
        colorSquares[i].style.display = "none";
    }
    for(var i = 0; i < numberOfSquares; i++)
    {
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);
        colors.push("rgb(" + r + ", " + g + ", " + b + ")");
        colorSquares[i].style.backgroundColor = colors[i];
        colorSquares[i].style.display = "block";       
    }
    colorDisplay.innerHTML = colors[Math.floor(Math.random() * numberOfSquares)].toUpperCase();
    title.style.backgroundColor = "#3B76A9";
    for(var i = 0; i < diffculty.length; i++)
    {
        if(diffculty[i].classList.contains("selectorColor"))
        {
            diffculty[i].style.backgroundColor = null;
            diffculty[i].classList.add("selectorColor")
        }
    }
    title.style.backgroundColor = "#3B76A9";
    message.innerHTML = "";
    return;
}

var diffcultyChange = (event) =>{
    if(!event.target.classList.contains("selectorColor"))
    {
        for(var i = 0; i < diffculty.length; i++)
        {
            diffculty[i].style.backgroundColor = null;
        }
        for(var i = 0; i < diffculty.length; i++)
        {
            diffculty[i].classList.toggle("selectorColor");
        }
        createNewGame();
    }
}

newGame.addEventListener("click", createNewGame);
for(var i = 0; i < diffculty.length; i++)
{
    diffculty[i].addEventListener("click", diffcultyChange);
}

// inti game
createNewGame();