



let score = 0;
let cross = true;
let audio = new Audio("audios/gamebg.mp3");
audio.loop = true;
let audiogo = new Audio("audios/gameOver.mp3");

document.getElementById('startAudioButton').addEventListener('click', () => {
    audio.play().catch(error => {
        console.error("Error playing audio:", error);
    });
});

document.onkeydown = function(e) {
    const dino = document.querySelector('.d1');
    const gameOver = document.querySelector('.gameOver');
    const obstacle = document.querySelector('.obstacle');

    if (!gameOver.style.visibility || gameOver.style.visibility !== 'visible') { // Check if game is not over
        if (e.keyCode == 38) {
            dino.classList.add('animateDino');
            setTimeout(() => {
                dino.classList.remove('animateDino');
            }, 700);
        }
        if (e.keyCode == 39) {
            let dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
            if (dinoX + 120 <= window.innerWidth - dino.offsetWidth) {
                dino.style.left = (dinoX + 120) + 'px';
            }
        }
        if (e.keyCode == 37) {
            let dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
            if (dinoX - 100 >= 0) {
                dino.style.left = (dinoX - 100) + 'px';
            }
        }
    }
};

setInterval(() => {
    const dino = document.querySelector('.d1');
    const gameOver = document.querySelector('.gameOver');
    const obstacle = document.querySelector('.obstacle');

    let dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    let dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('bottom'));

    let ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    let oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('bottom'));

    let offsetX = Math.abs(dx - ox);
    let offsetY = Math.abs(dy - oy);

    if (offsetX < 80 && offsetY < 70) {
        gameOver.style.visibility = 'visible';
        obstacle.classList.remove('obstaBruno');
        audiogo.play();
        audio.pause();
        setTimeout(() => {
            audiogo.pause();
        }, 2000);
    } else if (offsetX < 150 && cross && !gameOver.style.visibility) { 
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            let aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            let newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + 's';
        }, 500);
    }
}, 100);

function updateScore(score) {
    const scoreCnt = document.querySelector('.scoreCnt');
    scoreCnt.innerHTML = "Your Score : " + score;
}


