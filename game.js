const man = document.getElementById("man")
let scoreBoard = document.querySelector("#score > span")
let timer = document.querySelector("#time > span ")
let playBtn = document.getElementById("play")
let instruction = document.getElementById("instruction")
let pop = new Audio("assets/mixkit-bonus-earned-in-video-game-2058.wav")
let score = 0
let time = 30


playBtn.addEventListener("click",() => {
    instruction.style.display = "none"
    generatebombs()
    gameLoop()
    setInterval(stopWatch,1000)
    let bgm = new Audio("assets/mixkit-kidding-around-9.mp3")
    bgm.currentTime = 4
    bgm.play()
})

// controls

document.addEventListener("mousemove",(e) => {
    const mouseX = e.clientX
    if(mouseX > 80 && mouseX < window.innerWidth-75 ) 
    {
        man.style.left = mouseX - man.clientWidth/2 + "px"
    }
})

const gameContainer = document.getElementById("gamebody");

man.addEventListener("touchmove", (e) => {
        const touch = e.touches[0];
        const newPosition = touch.clientX;
        moveman(newPosition);
});

function moveman(newPosition) {
    const gameWidth = gameContainer.clientWidth;
    const man = man.clientWidth;
    const halfman = man / 2;
    let leftPosition = newPosition - halfman;
    let position
    if(leftPosition >= 0 && leftPosition < gameWidth - man){
        position = newPosition - halfman;
    }
    man.style.left = `${position}px`;
}

// Generating bombs

let allbombs = [
    `<img class=allbombs id=bomb src=assets/Bomb1.png>`,
    `<img class=allbombs id=bomb1 id=bomb src=assets/Bomb.png>`,
    `<img class=allbombs id=bomb src=assets/bomb3.png>`,
    `<img class=allbombs id=bomb src=assets/bomb4.png>`,
    `<img class=allbombs id=bomb src=assets/Bomb1.png>`,
    `<img class=allbombs id=virus src=assets/Bomb1.png>`
    

  
]






function generateNumber(min,max) {
    return Math.floor(Math.random()*(max-min))+min;
}



let currentbomb;
let bombs = document.querySelector(".bombs")









function generatebombs() {
    if (localStorage.getItem("difficulty") == "easy") {
        bombs.innerHTML += allbombs[generateNumber(0,allbombs.length)]


        currentbomb = document.querySelector(".bombs .allbombs:last-child")


        


        const screenWidth = window.innerWidth;
        const bombWidth = currentbomb.clientWidth;
        const maxTranslateX = screenWidth - bombWidth;
        let viewWidth = generateNumber(10,maxTranslateX / screenWidth * 100)
        currentbomb.style.transform = `translateX(${viewWidth}vw)`
        let second = generateNumber(1,5)
        currentbomb.style.animationDuration = `${second}s`
        man.style.width = 120 + "px"
        man.style.top = 80 + "%"
    }
    
    else if (localStorage.getItem("difficulty") == "medium") {
        bombs.innerHTML += allbombs[generateNumber(1,6)]

        

        currentbomb = document.querySelector(".bombs .allbombs:last-child")

        const screenWidth = window.innerWidth;
        const bombWidth = currentbomb.clientWidth;
        const maxTranslateX = screenWidth - bombWidth;
        let viewWidth1 = generateNumber(10,maxTranslateX / screenWidth * 100)
        currentbomb.style.transform = `translateX(${viewWidth1}vw)`
        let second = generateNumber(1,3)
        currentbomb.style.animationDuration = `${second}s`
        man.style.width = 80 + "px"
        man.style.top = 80 + "%"
    }
    
    else if (localStorage.getItem("difficulty") == "difficult") {
        bombs.innerHTML += allbombs[generateNumber(1,6)]

       

        currentbomb = document.querySelector(".bombs .allbombs:last-child")


        


        const screenWidth = window.innerWidth;
        const bombWidth = currentbomb.clientWidth;
        const maxTranslateX = screenWidth - bombWidth;
        let viewWidth = generateNumber(10,maxTranslateX / screenWidth * 100)
        currentbomb.style.transform = `translateX(${viewWidth}vw)`
        let second = generateNumber(1,1)
        currentbomb.style.animationDuration = `${second}s`
        man.style.width = 40 + "px"
        man.style.top = 80 + "%"
        
        
    
    }
   
}

// bomb escapes

function bombEscaped(){
    if (localStorage.getItem("difficulty") == "easy" && currentbomb.getBoundingClientRect().top >= window.innerHeight){
        currentbomb.style.display = "none"
       
        score -= 2
        if (score < 0) score = 0
        updateScore()
        generatebombs()
    }else if (localStorage.getItem("difficulty") == "medium" && currentbomb.getBoundingClientRect().top >= window.innerHeight){
        currentbomb.style.display = "none"
        score -= 5
        if (score < 0) score = 0

        updateScore()
        generatebombs()
    }else if (localStorage.getItem("difficulty") == "difficult" && currentbomb.getBoundingClientRect().top >= window.innerHeight) {
        currentbomb.style.display = "none"
        score -= 10
        if (score < 0) score = 0
        updateScore()
        generatebombs()
    }
    else if(detectCollision(currentbomb,man)) {
        currentbomb.style.display = "none"
        score++
        playPopSound()
        updateScore()
        generatebombs()
    }
   
    gameOver()
}

function playPopSound() {
    pop.currentTime = 0;
    pop.play();
}

function updateScore() {
    scoreBoard.innerText = score;
}

// Render and collision

function gameLoop(){
    bombEscaped();
    Collision(); 
    requestAnimationFrame(gameLoop);
}

function Collision() {
    detectCollision(currentbomb,man)
}

function detectCollision(element1, element2) {
    let rect1 = element1.getBoundingClientRect();
    let rect2 = element2.getBoundingClientRect();
    
    return !(rect1.right <= rect2.left || 
        rect1.left >= rect2.right || 
        rect1.bottom <= rect2.top || 
        rect1.top >= rect2.bottom);
    }
    
// Timer and highscore

function stopWatch() {
    --time
    timer.innerText = time
    if (time<=0) {
        location.href = "gameover.html"
        localStorage.setItem("score",score)
    }
}




let highscore = parseInt(localStorage.getItem("highscore")) || 0;

function gameOver() {
    if (score > highscore) {
        highscore = score
        localStorage.setItem("highscore",highscore)
    }
}



