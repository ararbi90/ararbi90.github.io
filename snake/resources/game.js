document.addEventListener('DOMContentLoaded', function() {
    let container = document.querySelector(".container");
    let scoreSpan = document.querySelector("#score");
    let buttons = document.querySelectorAll("#buttonSection button");
    let x = 40;
    let y = 40;

    let dx = 1;
    let dy = 0;

    let time = 200;

    let gameOn = true;
    let countAlternateColor = 0;
    
    let score = 0;

    let interval = null;

    let matrix = new Array(x);
    for(let i = 0; i < x; i++)
    {
        let row = new Array(y);
        for(let j = 0; j < y; j++)
        {
            let space = document.createElement("div");
            space.classList.add("space");
            row[j] = space;
            container.appendChild(space);
        }
        matrix[i] = row;
    }

    // inti snake and apple
    let snakePos = [[0,0], [0,1], [0, 2], [0, 3], [0, 4], [0, 5]]
    let apples = [];
    
    /**
     * Update based on keyname
     * @param {*} keyName key name for direction
     */
    let updateDirection = (keyName) =>{
        if(keyName === "ArrowUp" && dy === 0){
            dx = 0;
            dy = -1;
        }
        else if(keyName === "ArrowDown" && dy === 0){
            dx = 0;
            dy = 1;
        }
        else if(keyName === "ArrowLeft" && dx === 0){
            dx = -1;
            dy = 0;
        }
        else if(keyName === "ArrowRight" && dx === 0){
            dx = 1;
            dy = 0;
        }
        else{
            return;
        }
        updatePos()
    }

    /**
     * Set up button all back
     */
    buttons.forEach((b) => {
        b.addEventListener('click', (evt) =>{
            updateDirection(evt.target.id);
        });
    })

    /**
     * Capture key strokes
     */
    document.addEventListener('keydown', (event) => {
        updateDirection(event.key);
      }, false);


    /**
     * All game updatng logic
     */
    let updatePos = () => {
        if(!gameOn) return;
        let currentHead = snakePos[snakePos.length - 1];
        let newPos = [currentHead[0] + dy, currentHead[1] + dx];
        
        // Edge case to wrap around the matrix
        if(newPos[0] < 0){
            newPos[0] = y - 1;
        }
        else if(newPos[0] >= x){
            newPos[0] = 0;
        }
        else if(newPos[1] < 0){
            newPos[1] = y - 1;
        }
        else if(newPos[1] >= y){
            newPos[1] = 0;
        }

        let crossing = false;

        snakePos.forEach((p) => {
            if(newPos[0] === p[0] && newPos[1] === p[1])
            {
                crossing = true;
            }
        })
        // End the game
        if(crossing){
            clearInterval(interval)
            gameOn = false;
            interval = setInterval(blinkSnake, 300);
        }

        // check if apple is eaten
        let appleIndex = -1;
        apples.forEach((p, i) => {
            if(newPos[0] === p[0] && newPos[1] === p[1])
            {
                appleIndex = i;
            }
        });        
        // Case when apple is eaten
        if(appleIndex > -1)
        {
            // Remove apple
            let currentApple = apples[appleIndex];
            matrix[currentApple[0]][currentApple[1]].classList.remove("apple");
            apples.splice(appleIndex, 1);
            time -= 30;
            if(time > 30)
            {
                clearInterval(interval);
                interval = setInterval(updatePos, time);
            }
            score++;
            scoreSpan.innerHTML = score;
        }
        else
        {
            let tail = snakePos.shift();
            matrix[tail[0]][tail[1]].classList.remove("snake");
        }
        snakePos.push(newPos);
        matrix[newPos[0]][newPos[1]].classList.add("snake");
        generateApples();
    }

    /**
     * Initialize game
     */
    let init = () =>{
        for(let i = 0; i < x; i++)
        {
            for(let j = 0; j < y; j++)
            {
                matrix[i][j].classList.remove("snake");
                matrix[i][j].classList.remove("apple");
            }
        }
        generateApples();
        snakePos.forEach((a) =>{
            matrix[a[0]][a[1]].classList.add("snake");
        })
    }

    /**
     * Generate apples
     */
    let generateApples = () =>
    {
        if(apples.length <= 0)
        {
            let appleX = Math.floor(Math.random() * x);
            let appleY = Math.floor(Math.random() * y);
            apples.push([appleY, appleX]);
            matrix[appleY][appleX].classList.add("apple");
        }
    }

    /**
     * Blink snake when game ends
     */
    let blinkSnake = () => {
        let isSnake = matrix[snakePos[0][0]][snakePos[0][1]].classList.contains("snake")
        snakePos.forEach((p) =>{
            if(isSnake){
                matrix[p[0]][p[1]].classList.remove("snake");
            }
            else{
                matrix[p[0]][p[1]].classList.add("snake");
            }
        })
        countAlternateColor++;
        if(countAlternateColor === 5){
            clearInterval(interval);
            resetGame();
        }
    }

    /**
     * Reset Game
     */
    let resetGame  = () =>{
        snakePos = [[0,0], [0,1], [0, 2], [0, 3], [0, 4], [0, 5]]
        apples = [];
        time = 200;
        countAlternateColor = 0;
        gameOn = true;
        dx = 1;
        dy = 0;
        score = 0;
        scoreSpan.innerHTML = score;
        init();
        interval = setInterval(updatePos, time);
    }

    interval = setInterval(updatePos, time);
    init();
 });
