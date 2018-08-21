var myCanvas = document.querySelector(".game-canvas");
var ctx = myCanvas.getContext("2d");


//Avatar object and its image
var avatarImg = new Image();
avatarImg.src = "./images/avatar.png"
var avatar = {
    x: 375,
    y: 440,
    width: 60,
    height: 60,
    isActive: true,
    drawMe: function () {
        ctx.drawImage(avatarImg, this.x, this.y, this.width, this.height);
    },
    controlBoundaries: function () {
        if (this.x < 0) {
            this.x = 0;
        }

        if (this.y < 0) {
            this.y = 0;
        }

        if (this.x > 800 - this.width) {
            this.x = 800 - this.width;
        }

        if (this.y > 500 - this.height) {
            this.y = 500 - this.height;
        }
    }
};


//Books object
var bookImg = new Image();
bookImg.src = "./images/books.png"

function Book (myX, myY) {
    this.x = Math.floor(Math.random() * 700);
    this.y = -50;
    this.width = 50;
    this.height = 50;
}

Book.prototype.drawMe = function () {
        if (avatar.isActive) {
            this.y += 1;
        }
                
        ctx.drawImage(bookImg, this.x, this.y, this.width, this.height);  
};

var allBooks = [ ];

function createBookArray() {
    setInterval(function(){ 
        var book = new Book; 
        allBooks.push(book);
    }, 3000);
}




//Beers object
var beerImg = new Image();
beerImg.src = "./images/beers.png"

function Beer (myX, myY) {
    this.x = Math.floor(Math.random() * 700);
    this.y = -75;
    this.width = 100;
    this.height = 100;
}

Beer.prototype.drawMe = function () {
        if (avatar.isActive) {
            this.y += 1;
        }
    
        ctx.drawImage(beerImg, this.x, this.y, this.width, this.height);  
};

var allBeers = [];

function createBeerArray() {
    setInterval(function(){ 
        var beer = new Beer; 
        allBeers.push(beer);
    }, 4000);
}





//Variable definition
var totalScore = 0;
var gameInfo= document.querySelector(".game-info");
var result = document.querySelector(".result");
var instructions = document.querySelector(".instructions");
var brainStatusImage = document.querySelector(".brain-img");
var currentImage = "happy";
var currentLevel = "none";
var startGame = document.querySelector(".start");
var startScene = document.querySelector(".start-scene");


//Game over
var gameOver = {
    x:200,
    y:200,
    opacity:0,
    drawMe: function () {
        if(this.opacity<1) {
            this.opacity += 0.05;
        }
        //fade in the text with globalAlpha
        ctx.globalAlpha = this.opacity;
        ctx.font = "70px arial";
        ctx.fillStyle ="rebeccapurple";
        ctx.fillText("Game Over", this.x, this.y);

        ctx.lineWidth = 2;
        ctx.strokeStyle = "black";
        ctx.strokeText("Game Over", this.x, this.y);
        ctx.globalAlpha = 1;

    }
};


//Congrats

var congrats = {
    x: 200,
    y: 200,
    opacity:0,
    drawMe: function () {
        if(this.opacity<1) {
            this.opacity += 0.05;
        }
        ctx.globalAlpha = this.opacity;
        ctx.font = "70px arial";
        ctx.fillStyle ="red";
        ctx.fillText("Congrats!!", this.x, this.y);

        ctx.lineWidth = 3;
        ctx.globalAlpha = 1;
    }
}


//-----------------------------------------------------------


function collision (rectA, rectB) {
    return rectA.y + rectA.height >= rectB.y
        && rectA.y <= rectB.y + rectB.height
        && rectA.x + rectA.width >= rectB.x
        && rectA.x <= rectB.x + rectB.width;
};


function drawScene () {
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);

    avatar.drawMe();
    

    if ((totalScore % 8 !== 0 && totalScore > 0) || totalScore === 0) {

        instructions.innerHTML = "Catch the books to get more skilled! Avoid the beers, you'll party later!"
        
        allBooks.forEach(function(oneBook) {
            oneBook.drawMe();

            if (collision(avatar, oneBook)) {
                totalScore += 1;
                oneBook.y = - oneBook.height;
            }
        
        });
    
        allBeers.forEach(function(oneBeer) {
            oneBeer.drawMe();
            if (collision(avatar, oneBeer)) {
                totalScore -= 25;
                oneBeer.y = - oneBeer.height;
                if (currentImage !== "beer"){
                    brainStatusImage.src="./images/beer-brain.gif";
                    currentImage = "beer";
                }        
            }     
        });
    }

    if (totalScore % 8 === 0 && totalScore > 0) {

        instructions.innerHTML = "Your brain is full! Avoid books or your brain will explode and grab a beer to unlock your brain! "

        if (currentImage !=="full" ) {
            brainStatusImage.src="./images/full-brain.gif";
            currentImage = "full";
        }

        allBooks.forEach(function(oneBook) {
            oneBook.drawMe();

            if (collision(avatar, oneBook)) {
                totalScore -= 25;
                oneBook.y = - oneBook.height;
                if (currentImage !== "explosion"){
                    brainStatusImage.src="./images/brain-explosion.gif";
                    currentImage = "explosion";
                }
            }            
        });
    
        allBeers.forEach(function(oneBeer) {
            oneBeer.drawMe();
            if (collision(avatar, oneBeer)) {
                totalScore += 1;
                oneBeer.y = - oneBeer.height;        
            }     
        });
    }

    

    if (totalScore % 9 === 0 && totalScore > 0 && currentImage !=="happy" ) {
        brainStatusImage.src="./images/happy-brain.gif";
        currentImage = "happy";
    }

    if (totalScore < 0 ){
        avatar.isActive = false;
        gameOver.drawMe();
        instructions.innerHTML = "Sorry, you lost!" 
    }

    
    if (totalScore >= 5 && totalScore < 10 && currentLevel !== "first") { 
        var newDiv = document.createElement("div");
        newDiv.classList.add("general");
        newDiv.classList.add("result");
        gameInfo.appendChild(newDiv);       
        newDiv.innerHTML= "You've completed the first week! Keep up the good work!";
        currentLevel = "first";   
    }

    if (totalScore >= 10 && totalScore < 15) {
        var result = document.querySelector(".result");
        result.innerHTML= "You've completed the second week! Keep up the good work!";
    }

    if (totalScore >= 15 && totalScore < 20 ) {
        var result = document.querySelector(".result");
        result.innerHTML= "You've completed the third week! Keep up the good work!";
    }

    if (totalScore >= 20 && totalScore < 25 ) {
        var result = document.querySelector(".result");
        result.innerHTML= "You've completed the fourth week! Almost there!";
    }

    if (totalScore > 25 ) {
        var result = document.querySelector(".result");
        result.innerHTML= "Congrats! You are now a junior web developer!";
        congrats.drawMe();
        avatar.isActive= false;
        instructions.innerHTML = "You've won!"
        if (currentImage !== "winner"){
            brainStatusImage.src="./images/winner.gif";
            brainStatusImage.style.width = "150px";
            currentImage = "winner";
        }
    }
    
    requestAnimationFrame (function () {
    drawScene();
    });
}


startGame.onclick =function () {
    createBookArray();
    createBeerArray();
    drawScene();
    startScene.style.display = "none";
    myCanvas.style.display = "block";

}

document.onkeydown = function (event) {
    switch (event.keyCode) {
        case 37: //left arrow
            avatar.x -=10;
            break;
                        
        case 39://right arrow
            avatar.x += 10;
            break;
   
    }

    avatar.controlBoundaries();
};

