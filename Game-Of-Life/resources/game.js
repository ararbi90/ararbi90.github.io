document.addEventListener('DOMContentLoaded', function() {
    /*
    html componets being used to manipulate
    */
    var container = document.querySelector(".container");
    var startButton = document.querySelector("#startButton");
    var resetButton = document.querySelector("#resetButton");
    var pauseButton = document.querySelector("#pauseButton");
    var fasterButton = document.querySelector("#fasterButton");
    var slowerButton = document.querySelector("#slowerButton");
    var generationCount = document.querySelector("#generationCount");
    var nextGenTimeSpan = document.querySelector("#nextGenTime");
    /*
    Matrix size
    */
    var x = 50;
    var y = 100;
    /*
    Time to change states
    */
    var nextGenTime = 2000;
    var currentTime = nextGenTime;
    /*
    Time interval variable
    */
    var interval = null;
    /*
    All directions traverable in the matrix
    */
    var dirs = [[1,0], [-1, 0], [0, 1], [0, -1], [1,1], [-1, -1], [-1, 1], [1, -1]];
    /*
    Variable used to keeo track of generation
    */
    var generation = 0;
    /*
    Matrix containing spaces
    */
    var matrix = new Array();
    /*
    These two matracies are used to updated state
    */
    var tempMatrix = new Array(x);
    var tempCopy = new Array(x);
    /*
    Create space elements
    */
    for(let i = 0; i < x; i++){
        var row = new Array();
        for(let j = 0; j < y; j++){
            var space = document.createElement("div");
            space.classList.add('space');
            var newContent = document.createTextNode(i);
            container.appendChild(space);
            row.push(space);
        }
        matrix.push(row);
    }
    /*
    Initialize 2d array
    */
    for(var i = 0; i < x; i++){
        tempMatrix[i] = (new Array(y));
        tempCopy[i] = (new Array(y));
    }
    
    /**
     * Reset Call back used to bring game to starting position
     */
    resetButton.addEventListener("click", () =>{
        if(interval != null){
            clearInterval(interval);
        }
        reset();
        currentTime = nextGenTime;
        startButton.disabled = false;
        startButton.style.opacity = "1";
        pauseButton.style.opacity = "1";
        generation = 0;
        nextGenTimeSpan.innerHTML = currentTime;
        generationCount.innerHTML = generation;
        nextGenTimeSpan.innerHTML = currentTime;
    })

    /**
     * Used to pasue game
     */
    pauseButton.addEventListener("click", () =>{
        if(interval != null){
            clearInterval(interval);
        }
        startButton.disabled = false;
        pauseButton.style.opacity = "0.6";
        startButton.style.opacity = "1";
    })

    /**
     * Used to start execution
     */
    startButton.addEventListener("click", () =>{
        startButton.disabled = true;
        startButton.style.opacity = "0.6";
        pauseButton.style.opacity = "1";
        interval = setInterval(update, currentTime);
    })

    /**
     * Slow down the change of states
     */
    slowerButton.addEventListener("click", () =>{
        if(currentTime >= nextGenTime * 5 || !startButton.disabled) return;
        if(interval != null){
            clearInterval(interval);
        }
        currentTime += 100;
        interval = setInterval(update, currentTime);
        nextGenTimeSpan.innerHTML = currentTime;
    })

    /**
     * Speed up the change of state
     */
    fasterButton.addEventListener("click", () =>{
        if(currentTime <= 100 || !startButton.disabled) return;
        if(interval != null){
            clearInterval(interval);
        }
        currentTime -= 100;
        interval = setInterval(update, currentTime);
        nextGenTimeSpan.innerHTML = currentTime;
    })

    /**
     * Update the matrix for the next generation
     */
    const update = () => {
        /**
         * Clear the two matracies
         */
        for(let i = 0; i < x; i++){
            for(let j = 0; j < y; j++){
                if(matrix[i][j].classList.contains("person")){
                    tempMatrix[i][j] = 1;
                    tempCopy[i][j] = 1;
                }
                else{
                    tempMatrix[i][j] = 0;
                    tempCopy[i][j] = 0;
                }
            }
        }

        /**
         * Create next state
         */
        for(let i = 0; i < x; i++){
            for(let j = 0; j < y; j++){
                var count  = 0;
                dirs.forEach((dir) =>{
                    let dx = i + dir[0];
                    let dy = j + dir[1];
                    if(!isValid(dx,dy) || isValid(dx,dy) && tempMatrix[dx][dy] === 1){
                        count++;
                    }
                })
                if(tempMatrix[i][j] === 1 && (count < 2 || count > 3)){
                    tempCopy[i][j] = 0;
                }
                else if(tempMatrix[i][j] === 1 && (count === 2 || count === 3)){
                    tempCopy[i][j] = 1;
                }
                else if(tempMatrix[i][j] === 0 && count === 3){
                    tempCopy[i][j] = 1;
                }
            }
        }

        /**
         * Update the UI
         */
        for(let i = 0; i < x; i++){
            for(let j = 0; j < y; j++){
                if(tempCopy[i][j] === 1){
                    matrix[i][j].classList.add("person");
                    matrix[i][j].classList.remove("space");
                }
                else{
                    matrix[i][j].classList.remove("person");
                    matrix[i][j].classList.add("space");
                }
            }
        }
        generation++;
        generationCount.innerHTML = generation;
    }

    /**
     * Check if coordinate is valid
     * @param {Number} dx x coordinate 
     * @param {Number} dy y coordinate
     */
    const isValid = (dx, dy) =>{
        return dx >= 0 && dx < x && dy >=0 && dy < y; 
    }
    
    /**
     * Reset the game to original position
     */
    const reset = () =>{
        for(let i = 0; i < x; i++){
            var row = new Array();
            for(let j = 0; j < y; j++){
                matrix[i][j].classList.remove("person");
                matrix[i][j].classList.add("space");
            }
            matrix.push(row);
        }
        var initSpaces = Math.floor((Math.random() * 1000))

        for(let i = 0; i < initSpaces; i++){
            let dx = Math.floor((Math.random() * x));
            let dy = Math.floor((Math.random() * y));
            matrix[dx][dy].classList.remove("space");
            matrix[dx][dy].classList.add("person");
        }
    }

    reset()
 });
