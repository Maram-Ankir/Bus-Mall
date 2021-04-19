// 'use strict';


var productImage = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];
var productName = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass']
var rightImage = document.getElementById('right-image');
var centerImage = document.getElementById('center-image');
var leftImage = document.getElementById('left-image');


let container = document.getElementById('sec-one');
let counts = 0;
let maxAttempts = 5;
let leftIndex; //storing the img
let rightIndex;
let centerIndex;
let allImages = [];
let arrOfnames = [];
let arrOfVotes = [];
let arrOfShown = [];
var arrImages = [leftIndex,centerIndex,rightIndex ];



function Product(name, source) {
    this.name = name;
    this.source = source;
    this.votes = 0;
    this.shown = 0;
    allImages.push(this);
    arrOfnames.push(this.name);
}

// console.log(allImages);

// // instances
for (var i = 0; i < productImage.length; i++) {
    new Product(productName[i], `../img/${productImage[i]}`);
}
// console.log(allImages)

function renderThreeImages() {
    leftIndex = genrateRandomIndex();
    rightIndex = genrateRandomIndex();
    centerIndex = genrateRandomIndex();

    while(leftIndex === rightIndex || leftIndex === centerIndex || centerIndex  === rightIndex ||arrImages.includes(leftIndex) || arrImages.includes(centerIndex)||arrImages.includes(rightIndex)){
        leftIndex = genrateRandomIndex();
        centerIndex = genrateRandomIndex();
        rightIndex = genrateRandomIndex();

      };


// console.log(leftIndex,centerIndex,rightIndex)

   arrImages[0]=leftIndex;
   arrImages[1]=centerIndex;
   arrImages[2]=rightIndex;

console.log(arrImages)
    leftImage.src = allImages[leftIndex].source;
    allImages[leftIndex].shown++;
    rightImage.src = allImages[rightIndex].source;
    allImages[rightIndex].shown++;
    centerImage.src = allImages[centerIndex].source;
    allImages[centerIndex].shown++;
    // console.log("shown" + allImages[centerIndex].shown)

}

renderThreeImages();


container.addEventListener('click',handleClicking);

function handleClicking(event) {
    //   console.log(event.target.id);
    counts++;
    if (maxAttempts >= counts) {
        // console.log(counts)
        // console.log(event.target)
        if (event.target.id === 'left-image') {
            allImages[leftIndex].votes++;
        } else if (event.target.id === 'right-image') {
            allImages[rightIndex].votes++;
        } else if (event.target.id === 'center-image') {
            allImages[centerIndex].votes++;
        }
        renderThreeImages();
        // console.log(allImages);
    } else {
    renderList();
        barChart();

    container.removeEventListener('click',handleClicking)

    }
}

// let button = document .getElementById('btn');
// button.addEventListener('click',showList);
// function showList(){
//     renderList();
//     button.removeEventListener('click',showList);
// }


function renderList() {
    let ul = document.getElementById('unList');
    for (let i = 0; i < allImages.length; i++) {
        arrOfVotes.push(allImages[i].votes);
        arrOfShown.push(allImages[i].shown);
        let li = document.createElement('li');
        ul.appendChild(li);
        li.textContent = `${allImages[i].name} it has ${allImages[i].votes} Votes ${allImages[i].shown} shown`;
    }
    console.log(arrOfVotes)
    console.log(arrOfShown)

}

function genrateRandomIndex() {
    return Math.floor(Math.random() * allImages.length);

}

function barChart(){

var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: arrOfnames,
        datasets: [{
            label: '# of Votes',
            data: arrOfVotes,
            backgroundColor: [
                'rgb(255, 99, 132)',
             
            ],
            borderWidth: 1
         }, {
                label:'# of Shown',
                data: arrOfShown,
                backgroundColor:[
                   'rgb(155, 99, 132)',

                ],
                borderWidth: 1
              
        }]
    },
    

});
}
