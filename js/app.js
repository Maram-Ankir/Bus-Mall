// 'use strict';


var productImage = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];
var productName = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass']
var leftImage = document.getElementById('left-image');
var rightImage = document.getElementById('right-image');
var centerImage = document.getElementById('center-image');
let counts = 0;
let maxAttempts = 25;
let leftIndex; //storing the img
let rightIndex;
let centerIndex;
let allImages = [];



function Product(name, source) {
    this.name = name;
    this.source = source;
    this.votes = 0;
    this.shown = 0;
    allImages.push(this);
}

console.log(allImages);

// // instances


// new Product('bag','../img/bag.jpg' );
// new Product('banana','../img/banana.jpg' );
// new Product('bathroom','../img/bathroom.jpg' );
// new Product('boots','../img/boots.jpg' );
// new Product('bubblegum','../img/bubblegum.jpg' );
// new Product('chair','../img/chair.jpg' );
// new Product('cthulhu','../img/cthulhu.jpg' );
// new Product('dog-duck','../img/dog-duck.jpg' );
// new Product('dragon','../img/dragon.jpg' );
// new Product('pet-sweep','../img/pet-sweep.jpg' );
// new Product('scissors','../img/scissors.jpg' );
// new Product('shark','../img/shark.jpg' );
// new Product('sweep','../img/sweep.png' );
// new Product('tauntaun','../img/tauntaun.jpg' );
// new Product('unicorn','../img/unicorn.jpg' );
// new Product('usb','../img/usb.gif' );
// new Product('water-can','../img/water-can.jpg' );
// new Product('wine-glass','../img/wine-glass.jpg' );
for (var i = 0; i < productImage.length; i++) {
    new Product(productName[i], `../img/${productImage[i]}`);
}
console.log(allImages)

function renderThreeImages() {
    leftIndex = genrateRandomIndex();
    rightIndex = genrateRandomIndex();
    centerIndex = genrateRandomIndex();

    //   console.log(leftIndex);
    //  console.log(rightIndex);
    //  console.log(centerIndex);

    while (rightIndex === leftIndex) {
        leftIndex = genrateRandomIndex();   
    }

      while( rightIndex === centerIndex || leftIndex === centerIndex ){
        centerIndex = genrateRandomIndex();
      }

    leftImage.src = allImages[leftIndex].source;
    allImages[leftIndex].shown++;
    rightImage.src = allImages[rightIndex].source;
    allImages[rightIndex].shown++;
    centerImage.src = allImages[centerIndex].source;
    allImages[centerIndex].shown++;
    console.log("shown" + allImages[centerIndex].shown)

}

renderThreeImages();


leftImage.addEventListener('click', handleClicking);
rightImage.addEventListener('click', handleClicking);
centerImage.addEventListener('click', handleClicking);


function handleClicking(event) {
    //   console.log(event.target.id);
    counts++;
    if (maxAttempts >= counts) {
        console.log(counts)
        console.log(event.target)
        if (event.target.id === 'left-image') {
            allImages[leftIndex].votes++;
        } else if (event.target.id === 'right-image') {
            allImages[rightIndex].votes++;
        } else if (event.target.id === 'center-image') {
            allImages[centerIndex].votes++;
        }
        renderThreeImages();
        console.log(allImages);
    } else {
       
        leftImage.removeEventListener('click', handleClicking);
        rightImage.removeEventListener('click', handleClicking);
        centerImage.removeEventListener('click', handleClicking);

    }
}

let button = document .getElementById('btn');
button.addEventListener('click',showList);
function showList(){
    renderList();
    button.removeEventListener('click',showList);
}


function renderList() {
    let ul = document.getElementById('unList');
    for (let i = 0; i < allImages.length; i++) {
        let li = document.createElement('li');
        ul.appendChild(li);
        li.textContent = `${allImages[i].name} it has ${allImages[i].votes} Votes ${allImages[i].shown} shown`;
    }
}

function genrateRandomIndex() {
    return Math.floor(Math.random() * allImages.length);

}


// console.log(genrateRandomIndex());

