var myCanvas = document.querySelector(".game-canvas");
var ctx = myCanvas.getContext("2d");



//Avatar object and its image
var avatarImg = new Image();
avatarImg.src = "./images/avatar.jpeg"
var avatar = {
    x: 375,
    y: 450,
    width: 50,
    height: 50,
    isCrashed: false,
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
bookImg.src = "./images/books.jpg"

function Book (myX, myY) {
    this.x = Math.floor(Math.random() * 800);
    this.y = Math.floor(Math.random() * 500);
    this.width = 50;
    this.height = 50;
}

Book.prototype.drawMe = function () {
        if (avatar.isCrashed) {

        }
        else {
        this.y += 1;}
        
        if (this.y > 500 + this.height) {
            this.y = - this.height;
        }

        ctx.drawImage(bookImg, this.x, this.y, this.width, this.height);  
};

var book1 = new Book;
var book2 = new Book;
var book3 = new Book;
var book4 = new Book;
var book5 = new Book;
var book6 = new Book;

var allBooks = [ book1, book2, book3, book4, book5, book6 ];


//Beers object
var beerImg = new Image();
beerImg.src = "./images/biere.jpg"

function Beer (myX, myY) {
    this.x = Math.floor(Math.random() * 800);
    this.y = Math.floor(Math.random() * 500);
    this.width = 100;
    this.height = 75;
}

Beer.prototype.drawMe = function () {
        if (avatar.isCrashed) {

        }
        else {
        this.y += 1;}
        
        if (this.y > 500 + this.height) {
            this.y = - this.height;
        }

        ctx.drawImage(beerImg, this.x, this.y, this.width, this.height);  
};

var beer1 = new Beer;
var beer2 = new Beer;


var allBeers = [ beer1, beer2 ];



//Results
var totalScore = 0;
var showScore = document.querySelector(".total-score");
var result = document.querySelector(".result");


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
        ctx.font = "70px monospace";
        ctx.fillStyle ="rebeccapurple";
        ctx.fillText("Game Over", this.x, this.y);

        ctx.lineWidth = 2;
        ctx.strokeStyle = "black";
        ctx.strokeText("Game Over", this.x, this.y);
        ctx.globalAlpha = 1;

    }
};


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

    allBooks.forEach(function(oneBook) {
        oneBook.drawMe();

        if (collision(avatar, oneBook)) {
            totalScore += 1;
            showScore.innerHTML = "Score:" + totalScore;
            oneBook.y = - oneBook.height;
        }
        
    });
    
    allBeers.forEach(function(oneBeer) {
        oneBeer.drawMe();
        if (collision(avatar, oneBeer)) {
            totalScore -= 50;
            showScore.innerHTML = "Score:" + totalScore;
            oneBeer.y = - oneBeer.height;        }

        
    });

    if (totalScore < 0 ){
        avatar.isCrashed = true;
        gameOver.drawMe();
    }
    
    if (totalScore >= 5 && totalScore < 10 ) {
        result.innerHTML= "You've completed the first week! Keep up the good work!";
    }

    if (totalScore >= 10 && totalScore < 15 ) {
        result.innerHTML= "You've completed the second week! Keep up the good work!";
    }

    if (totalScore >= 15 && totalScore < 20 ) {
        result.innerHTML= "You've completed the third week! Keep up the good work!";
    }

    if (totalScore >= 20 && totalScore < 25 ) {
        result.innerHTML= "You've completed the fourth week! Keep up the good work!";
    }

    if (totalScore >= 25 && totalScore < 30 ) {
        result.innerHTML= "You've completed the fifth week! Keep up the good work!";

    }
    
    if (totalScore >= 30 && totalScore < 35 ) {
        result.innerHTML= "You've completed the sixth week! Almost there!";
    }

    if (totalScore >= 35 && totalScore < 40 ) {
        result.innerHTML= "You've completed the seventh week! Almost there!";
    }

    if (totalScore >= 40 && totalScore < 45 ) {
        result.innerHTML= "You've completed the eigth week! Almost there!";
    }

    if (totalScore >= 45 ) {
        result.innerHTML= "Congrats! You are now a junior web developer!";
    }


    requestAnimationFrame (function () {
    drawScene();
    });
}

drawScene();

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






