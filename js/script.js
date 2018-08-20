var myCanvas = document.querySelector(".game-canvas");
var ctx = myCanvas.getContext("2d");


var totalScore = 0;

//Avatar object and its image
var avatarImg = new Image();
avatarImg.src = "./images/avatar.jpeg"
var avatar = {
    x: 375,
    y: 450,
    width: 50,
    height: 50,
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
        this.y += 1;
        
        if (this.y < -this.height) {
            this.x = 1000;
        }

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
        this.y += 1;
        
        if (this.y < -this.height) {
            this.x = 1000;
        }

        if (this.y > 500 + this.height) {
            this.y = - this.height;
        }

        ctx.drawImage(beerImg, this.x, this.y, this.width, this.height);  
};

var beer1 = new Beer;
var beer2 = new Beer;


var allBeers = [ beer1, beer2 ];

//-----------------------------------------------------------

function drawScene () {
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);

    avatar.drawMe();

    allBooks.forEach(function(oneBook) {
        oneBook.drawMe();

        if (collision(avatar, oneBook)) {
            totalScore += 1;
        }
    
    });
    
    allBeers.forEach(function(oneBeer) {
        oneBeer.drawMe();

        if (collision(avatar, oneBeer)) {
            totalScore -= 50;
        }

    });

    
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
        
        case 32: //space bar
        case 38: //up arrow
            avatar.y -=10;
            break;
            
        case 39://right arrow
            avatar.x += 10;
            break;

        case 40://down arrow
            avatar.y +=10;
            break;
    }

    avatar.controlBoundaries();
};



function collision (rectA, rectB) {
    return rectA.y + rectA.height >= rectB.y
        && rectA.y <= rectB.y + rectB.height
        && rectA.x + rectA.width >= rectB.x
        && rectA.x <= rectB.x + rectB.width;
};