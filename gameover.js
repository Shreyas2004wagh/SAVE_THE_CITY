let playAgainBtn = document.getElementById("playagainbtn")
let message  = document.getElementById("message")
let names = document.querySelector("#name p")
let score = localStorage.getItem("score")
let scoreBoard = document.querySelector("#score span")
let highscore = document.querySelector("#highscore span")
let homeBtn = document.querySelector("#home")

playAgainBtn.addEventListener("click", () => {
    location.href = "game.html"
})


homeBtn.addEventListener("click", () => {
    location.href = "index.html"
})

function generateNumber(min,max) {
    return Math.floor(Math.random()*(max-min))+min;
}

randomWinMessages = [
     `<p style="color: green; font-size: 40px;">Congrats, For winning try other levels too.</p>`,
     `<p style="color: green; font-size: 40px;">Incredible job! Your dedication and quick thinking have averted disaster. The city applauds your heroism.</p>`,
     `<p style="color: green; font-size: 40px;">You've emerged victorious! The city skyline stands tall, untouched by danger. You are the champion!</p>`
    
]

randomLoserMessages = [
    `<p style="color: green; font-size: 40px;">Don't give up! Every setback is a setup for a comeback. Try again and master the challenge!</p>`,
    `<p style="color: green; font-size: 40px;">It's okay! Even heroes face obstacles. Learn from this defeat and come back stronger next time.</p>`,
   `<p style="color: green; font-size: 40px;">You'll get them next time! The city believes in your abilities. Keep practicing and saving the day!</p>`,
    `<p style="color: green; font-size: 40px;">Defeat is just a detour on the road to success. Brush off the dust and take another shot at victory!</p>`,
    `<p style="color: green; font-size: 40px;">The city may be in distress now, but with determination, you can turn the tide. Keep striving for greatness!</p>`,
    `<p style="color: green; font-size: 40px;">Every failure is a stepping stone to success. Analyze what went wrong, adapt, and rise again!</p>`,
    `<p style="color: green; font-size: 40px;">Even the best face challenges. Use this defeat as fuel to refine your skills and face the next mission head-on.</p>`,
    `<p style="color: green; font-size: 40px;">Every game over is a chance to start afresh. Your next attempt could be the one that saves the city!</p>`,
    `<p style="color: green; font-size: 40px;">Chin up! You're on the path to mastery. Take a deep breath, refocus, and conquer the challenge ahead.</p>`,
    `<p style="color: green; font-size: 40px;">Remember, Rome wasn't built in a day. Your journey to victory is just beginning. Keep playing and improving!</p>`
   
]


window.onload = function() {
    names.innerText += localStorage.getItem("playername")
    highscore.innerText = localStorage.getItem("highscore")
    if(score < 10) {
        message.innerHTML += randomLoserMessages[generateNumber(0,randomLoserMessages.length)]
        scoreBoard.innerText = score
    } else if (score > 0) {
        message.innerHTML += randomWinMessages[generateNumber(0,randomWinMessages.length)]
        scoreBoard.innerText = score
    }
}

homeBtn.addEventListener("click", () => {
    location.href = "index.html"
})

function generateNumber(min,max) {
    return Math.floor(Math.random()*(max-min))+min;
}