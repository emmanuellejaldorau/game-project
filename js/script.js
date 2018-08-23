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
var brainStatusImage = document.querySelector(".brain-img");
var currentImage = "happy";
var currentLevel = "none";
var startGame = document.querySelector(".start");
var startScene = document.querySelector(".start-scene");
var avatarScene = document.querySelector(".avatar-scene")
var avatarGirlButton = document.querySelector(".avatar-girl");
var avatarBoyButton = document.querySelector(".avatar-boy");
var endScene = document.querySelector(".end-scene");
var playAgainStatus = "not displayed";
var playAgainButton = document.querySelector(".play-again");
var avatar;

//Avatar object and its image
var avatarGirlImg = new Image();
avatarGirlImg.src = "./images/avatar-girl.png"
var avatarGirl = {
    x: 375,
    y: 440,
    width: 60,
    height: 60,
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

        if (this.x > 800 - this.width) {
            this.x = 800 - this.width;
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
    y: 440,
    width: 60,
    height: 60,
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

Book.prototype.drawMe = function (avatar) {
        if (avatar.isActive) {
            this.y += 1;
                        
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
    this.width = 100;
    this.height = 100;
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
    x:200,
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
    x: 200,
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



function drawScene (avatar) {
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);

    avatar.drawMe();
        

    if ((totalScore % 8 !== 0 && totalScore > 0 && totalScore < 26) || totalScore === 0) {

        instructions.innerHTML = "<h2>Playing rules</h2><p>Catch the books to get more skilled!</p> <p>Avoid the beers, you'll party later!</p>"
        changeGif("happy","./images/happy-brain.gif");

        allBooks.forEach(function(oneBook) {
            oneBook.drawMe(avatar);

            if (collision(avatar, oneBook)) {
                totalScore += 1;
                oneBook.y = - oneBook.height;
            }
        
        });
    
        allBeers.forEach(function(oneBeer) {
            oneBeer.drawMe(avatar);
            if (collision(avatar, oneBeer)) {
                totalScore -= 25;
                oneBeer.y = - oneBeer.height;
                changeGif("beer","./images/beer-brain.gif");    
            }     
        });
    }

    if (totalScore % 8 === 0 && totalScore > 0) {

        instructions.innerHTML = "<h2>Playing rules</h2><p>Your brain is full!</p> <p>Avoid books or your brain will explode and grab a beer to unlock your brain!</p> "
        
        changeGif("full","./images/full-brain.gif");

        allBooks.forEach(function(oneBook) {
            oneBook.drawMe(avatar);

            if (collision(avatar, oneBook)) {
                totalScore -= 25;
                oneBook.y = - oneBook.height;
                changeGif("explosion","./images/brain-explosion.gif");
            }            
        });
    
        allBeers.forEach(function(oneBeer) {
            oneBeer.drawMe(avatar);
            if (collision(avatar, oneBeer)) {
                totalScore += 1;
                oneBeer.y = - oneBeer.height;        
            }     
        });
    }

    if (totalScore < 0 ){
        gameOver.drawMe();
        instructions.innerHTML = "Sorry, you lost!"; 
        if (playAgainStatus !== "displayed") {
            endScene.style.display = "block";
            var playAgainStatus = "diplayed";
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
        var result = document.querySelector(".result");
        result.innerHTML= "<p class ='trophy'>🏆🏆</p><p>You've completed the second week! Keep up the good work!</p>";
    }

    if (totalScore >= 15 && totalScore < 20 ) {
        var result = document.querySelector(".result");
        result.innerHTML= "<p class ='trophy'>🏆🏆🏆</p><p>You've completed the third week! Keep up the good work!</p>";
    }

    if (totalScore >= 20 && totalScore < 25 ) {
        var result = document.querySelector(".result");
        result.innerHTML= "<p class ='trophy'>🏆🏆🏆🏆</p><p>You've completed the fourth week! Almost there!</p>";
    }

    if (totalScore > 25) {
        var result = document.querySelector(".result");
        result.innerHTML= "<p class ='trophy'>🏆🏆🏆🏆🏆</p><p>Congrats! You are now a junior web developer!</p>";
        congrats.drawMe();
        avatar.isActive = false;
        instructions.innerHTML = "You've won!";
        changeGif("winner","./images/winner.gif");
        brainStatusImage.style.width = "150px";
        if (playAgainStatus !== "displayed") {
            // animation();
            endScene.style.display = "block";
            var playAgainStatus = "diplayed";
        }
    }

    
    requestAnimationFrame (function () {
    drawScene(avatar);
    });
}


startGame.onclick =function () {
    startScene.style.display = "none";
    avatarScene.style.display= "flex";
    

}

avatarGirlButton.onclick =function () {
    animation();
    createBookArray();
    createBeerArray();
    avatar = avatarGirl;
    drawScene(avatar);
    avatarScene.style.display = "none";
    myCanvas.style.display = "block";
}

avatarBoyButton.onclick =function () {
    animation();
    createBookArray();
    createBeerArray();
    avatar = avatarBoy;
    drawScene(avatar);
    avatarScene.style.display = "none";
    myCanvas.style.display = "block";
}

playAgainButton.onclick = function () {
    window.location.href="index.html";
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

