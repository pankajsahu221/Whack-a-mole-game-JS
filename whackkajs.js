const holes = document.querySelectorAll(".hole");
const score = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");
const startBtn = document.querySelector(".start-btn");
const highscore = document.querySelector(".hscore");
const btns = document.querySelectorAll(".btn");
let lastHole;
let timeUp;
let counter = 0;

// setting the highscore
highscore.textContent = getLocalStorage();
// get random time
function randomTime(min , max){
    return Math.round( Math.random() * (max - min) + min );
}

// get random hole
function randomHole(holes){
    const idx = Math.floor( Math.random() * holes.length );
    const hole = holes[idx];

    if(lastHole === hole){
        console.log("oh no it's the same hole");
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

function peep(){
    const time = randomTime(300, 950); /* min=200ms , max=1000ms */
    const hole = randomHole(holes);

    hole.classList.add("up");
    setTimeout(function(){
         hole.classList.remove("up");
         if(!timeUp) peep();
    }, time );
}

function startGame(){
    startBtn.classList.add("hide-btn");
    score.textContent = 0;
    timeUp = false;
    counter = 0;
    peep();
    setTimeout(function(){
        timeUp = true;
        startBtn.classList.remove("hide-btn");
    }, 21000 );
}

function bonk(e){
    // console.log(e) we can see isTrusted=true if we clicked it
    if(!e.isTrusted) return;
    counter++;
    this.classList.remove("up");
    score.textContent = counter;

    let hscore = getLocalStorage();
    if( counter > hscore ){
        localStorage.setItem("hscore",JSON.stringify(counter));
        highscore.textContent = counter;
    }
}

moles.forEach(function(mole){
     mole.addEventListener("click",bonk);
})

// btns.forEach(function(btn){
//      btn.addEventListener("click",function(){
            
//      })
// })


// *************************
// **** LOCAL STORAGE ******
// *************************
function getLocalStorage(){
   return localStorage.getItem("hscore")?JSON.parse(localStorage.getItem("hscore")):0;
}