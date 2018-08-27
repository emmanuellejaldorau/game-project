//Title animation
var letters = document.querySelectorAll(".letters");

function generateRandomColor() {
    return '#'+Math.floor(Math.random()*16777215).toString(16);
  }
  
  function changeColor() {
    letters.forEach(function(oneLetter) {
    oneLetter.style.color = generateRandomColor();
    });
  }

function animation() {
    var titleAnimation = setInterval(changeColor, 500);
    setTimeout(function(){
        clearInterval(titleAnimation);
        letters.forEach(function(oneLetter){
        oneLetter.style.color ="#fff";
        });
    }, 3000);
};

animation();



//CANVAS
var myCanvas = document.querySelector(".game-canvas");
var ctx = myCanvas.getContext("2d");

//Variable definition
var totalScore = 0;
var gameInfo= document.querySelector(".game-info");
var result = document.querySelector(".result");
var instructions = document.querySelector(".instructions");
var instructionsTitle = document.querySelector(".instructions-title");
var brainStatusImage = document.querySelector(".brain-img");
var brainStatusTitle = document.querySelector(".brain-title");
var currentImage = "happy";
var currentLevel = "none";
var startGame = document.querySelector(".start");
var startScene = document.querySelector(".start-scene");
var avatarScene = document.querySelector(".avatar-scene")
var avatarGirlButton = document.querySelector(".avatar-girl");
var avatarBoyButton = document.querySelector(".avatar-boy");
var endScene = document.querySelector(".end-scene");
var playAgainStatus = "notDisplayed";
var playAgainButton = document.querySelector(".play-again");
var avatar;
var winPointAudio = new Audio("./sounds/winpoint.wav");
var gameOverAudio = new Audio("./sounds/gameover.wav");
var winAudio = new Audio("./sounds/win.wav");
var startAudio = new Audio("./sounds/start.ogg");
var leftArrow = document.querySelector(".left-arrow");
var rightArrow = document.querySelector (".right-arrow");

//Avatar object and its image
var avatarGirlImg = new Image();
avatarGirlImg.src = "./images/avatar-girl.png"
var avatarGirl = {
    x: 375,
    y: 430,
    width: 70,
    height: 70,
    isActive: true,
    drawMe: function () {
        ctx.drawImage(avatarGirlImg, this.x, this.y, this.width, this.height);
    },
    controlBoundaries: function () {
        if (this.x < 0) {
            this.x = 0;
        }

        if (this.y < 0) {
            this.y = 0;
        }

        if (this.x > 900 - this.width) {
            this.x = 900 - this.width;
        }

        if (this.y > 500 - this.height) {
            this.y = 500 - this.height;
        }
    }
};

var avatarBoyImg = new Image();
avatarBoyImg.src = "./images/avatar-boy.png"
var avatarBoy = {
    x: 375,
    y: 430,
    width: 70,
    height: 70,
    isActive: true,
    drawMe: function () {
        ctx.drawImage(avatarBoyImg, this.x, this.y, this.width, this.height);
    },
    controlBoundaries: function () {
        if (this.x < 0) {
            this.x = 0;
        }

        if (this.y < 0) {
            this.y = 0;
        }

        if (this.x > 900 - this.width) {
            this.x = 900 - this.width;
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
    this.width = 60;
    this.height = 60;
}

Book.prototype.drawMe = function (avatar) {
        if (avatar.isActive) {
            this.y += 2;
                        
        ctx.drawImage(bookImg, this.x, this.y, this.width, this.height); 
        } 
};

var allBooks = [ ];

var createBookArray = function() {
    setInterval(function(){ 
        var book = new Book; 
        allBooks.push(book);
    }, 3000);
};





//Beers object
var beerImg = new Image();
beerImg.src = "./images/beers.png"

function Beer (myX, myY) {
    this.x = Math.floor(Math.random() * 700);
    this.y = -75;
    this.width = 110;
    this.height = 110;
}

Beer.prototype.drawMe = function (avatar) {
        if (avatar.isActive) {
            this.y += 1;
            
        ctx.drawImage(beerImg, this.x, this.y, this.width, this.height); 
        } 
};

var allBeers = [];

var createBeerArray = function(){
    setInterval(function(){ 
        var beer = new Beer; 
        allBeers.push(beer);
    }, 4000);
};




//Game over
var gameOver = {
    x:250,
    y:220,
    opacity:0,
    drawMe: function () {
        if(this.opacity<1) {
            this.opacity += 0.05;
        }
        ctx.globalAlpha = this.opacity;
        ctx.font = "70px 'Permanent Marker'";
        ctx.fillStyle ="#8A2BE2";
        ctx.fillText("Game Over", this.x, this.y);
        ctx.lineWidth = 2;
        ctx.globalAlpha = 1;

    }
};


//Congrats

var congrats = {
    x: 250,
    y: 220,
    opacity:0,
    drawMe: function () {
        if(this.opacity<1) {
            this.opacity += 0.05;
        }
        ctx.globalAlpha = this.opacity;
        ctx.font = "70px 'Permanent Marker'";
        ctx.fillStyle ="#3CB371";
        ctx.fillText("CONGRATS!!", this.x, this.y);

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

function changeGif(status, statusImg) {
    if (currentImage !== status) {
        brainStatusImage.src= statusImg;
        currentImage = status;
    }
};

function pointLoop (allItems) {
    allItems.forEach(function(oneItem){
        oneItem.drawMe(avatar);

        if (collision(avatar, oneItem)) {
            totalScore += 1;
            oneItem.y = - oneItem.height;
            winPointAudio.play();
        }
    });
};

function obstacleLoop (allItems, status, statusImg) {
    allItems.forEach(function(oneItem) {
        oneItem.drawMe(avatar);
        if (collision(avatar, oneItem)) {
            totalScore -= 25;
            changeGif(status,statusImg);
            gameOverAudio.play();    
        }     
    });
};



function drawScene (avatar) {
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);

    avatar.drawMe();
        

    if ((totalScore % 8 !== 0 && totalScore > 0 && totalScore < 26) || totalScore === 0) {

        instructions.innerHTML = "<h2 class='instructions-title'>Playing rules</h2><p>Catch the books to get more skilled!</p> <p>Avoid the beers!</p>"
        brainStatusTitle.style.color="#EEB422";
        changeGif("happy","./images/happy-brain.gif");

        pointLoop(allBooks);
        obstacleLoop(allBeers, "beer","./images/beer-brain.gif");

    }

    if (totalScore % 8 === 0 && totalScore > 0) {

        instructions.innerHTML = "<h2 class='instructions-title'>Playing rules</h2><p>Your brain is full!</p> <p>Avoid books and grab a beer instead!</p> ";
        changeGif("full","./images/full-brain.gif");

        obstacleLoop(allBooks, "explosion","./images/brain-explosion.gif");    
        pointLoop(allBeers);

    }

    if (totalScore < 0 ){
        gameOver.drawMe();
        instructions.innerHTML = "Sorry, you've lost!"; 
        brainStatusTitle.style.color="#8A2BE2";
        leftArrow.style.borderColor= "#8A2BE2";
        rightArrow.style.borderColor= "#8A2BE2";
        if (playAgainStatus !== "displayed") {
            endScene.style.display = "block";
            playAgainStatus = "displayed";
        }
    }

    
    if (totalScore >= 5 && totalScore < 10 && currentLevel !== "first") { 
        var newDiv = document.createElement("div");
        newDiv.classList.add("general");
        newDiv.classList.add("result");
        gameInfo.appendChild(newDiv);       
        newDiv.innerHTML= "<p class ='trophy'>🏆</p><p>You've completed the first week! Keep up the good work!</p>";
        currentLevel = "first";   
    }

    if (totalScore >= 10 && totalScore < 15) {
        result = document.querySelector(".result");
        result.innerHTML= "<p class ='trophy'>🏆🏆</p><p>You've completed the second week! Keep up the good work!</p>";
    }

    if (totalScore >= 15 && totalScore < 20 ) {
        result = document.querySelector(".result");
        result.innerHTML= "<p class ='trophy'>🏆🏆🏆</p><p>You've completed the third week! Keep up the good work!</p>";
    }

    if (totalScore >= 20 && totalScore < 25 ) {
        result = document.querySelector(".result");
        result.innerHTML= "<p class ='trophy'>🏆🏆🏆🏆</p><p>You've completed the fourth week! Almost there!</p>";
    }

    if (totalScore > 25) {
        changeGif("winner","./images/winner.gif");
        brainStatusImage.style.width = "150px";
        result = document.querySelector(".result");
        result.innerHTML= "<p class ='trophy'>🏆🏆🏆🏆🏆</p><p>Congrats! You are now a junior web developer!</p>";
        congrats.drawMe();
        brainStatusTitle.style.color="#3CB371";
        leftArrow.style.borderColor= "#3CB371";
        rightArrow.style.borderColor= "#3CB371";
        avatar.isActive = false;
        instructions.innerHTML = "You've won!";
        if (playAgainStatus !== "displayed") {
            winAudio.play();
            animation();
            endScene.style.display = "block";
            playAgainStatus = "displayed";
        }
    }

    
    requestAnimationFrame (function () {
    drawScene(avatar);
    });
}


startGame.onclick =function () {
    winPointAudio.play();
    startScene.style.display = "none";
    avatarScene.style.display= "flex";
    

}

avatarGirlButton.onclick =function () {
    startAudio.play();
    animation();
    createBookArray();
    createBeerArray();
    avatar = avatarGirl;
    drawScene(avatar);
    avatarScene.style.display = "none";
    myCanvas.style.display = "block";
}

avatarBoyButton.onclick =function () {
    startAudio.play();
    animation();
    createBookArray();
    createBeerArray();
    avatar = avatarBoy;
    drawScene(avatar);
    avatarScene.style.display = "none";
    myCanvas.style.display = "block";
}

playAgainButton.onclick = function () {
    winPointAudio.play();
    window.location.href="index.html";
}

leftArrow.onclick = function (event) {
    avatar.x -=50;
    event.preventDefault();
}

rightArrow.onclick = function (event) {
    avatar.x +=50;
    event.preventDefault();
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

