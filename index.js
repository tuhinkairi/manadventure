//here we setting the basic values
var score = 0
var increment = true
const audiostart = new Audio('Ahrix_-_New_Era(256k).mp3')
audiostart.play()
gameover.innerHTML = '<h1>Welcome to the Man-Adventure - created by Tuhinkairi</h1>'
setTimeout(()=>{
    document.getElementById('gameover').style.visibility='hidden'
},4000)

const gameoveraudio = new Audio('ting1.mp3')
document.getElementById('score').innerHTML = `<h2>game score = ${score}</h2>`

//setting the button movement
document.onkeydown = (e) => {
    // console.log('data down', e.keyCode);
    const player = document.getElementById('player');
    if (e.keyCode == 38) {
        player.classList.add('jumpanimation');
        setTimeout(() => {
            player.classList.remove('jumpanimation')
        }, 700)


    }
    else if (e.keyCode == 37) {
        pleft = parseInt(window.getComputedStyle(player, null).getPropertyValue('left'))
        player.style.left = (pleft - 100) + 'px'
        player.style.transform = 'rotateY(180deg)'
        
    }
    else if (e.keyCode == 39) {
        //setting the movement value
        pleft = parseInt(window.getComputedStyle(player, null).getPropertyValue('left'))
        player.style.left = (100 + pleft) + 'px'
        player.style.transform = 'rotateY(0deg)'

    }
}
//detect the collition
setInterval(() => {
    const player = document.getElementById('player')
    const gameover = document.getElementById('gameover')
    const enemy = document.getElementById('enemy')

    // here getting the basic value for charecters and the obsticals for their on screen position 
    dx = parseInt(window.getComputedStyle(player, null).getPropertyValue('left'))
    dy = parseInt(window.getComputedStyle(player, null).getPropertyValue('bottom'))
    ox = parseInt(window.getComputedStyle(enemy, null).getPropertyValue('left'))
    oy = parseInt(window.getComputedStyle(enemy, null).getPropertyValue('bottom'))

    // getting diffrence from obsticals
    xdis = Math.abs(dx - ox)
    ydis = Math.abs(dy - oy)

    // if the diffrance is less then 92 in x axis and 30 from y-axis then we decler the game over
    // note we take a upper lowest value for the game over 
    if (xdis < 92 && ydis < 30) {
        gameover.innerHTML = `<h1>Game Over - ${score}</h1>`
        gameover.style.visibility='visible'
        enemy.classList.remove('movement')
        audiostart.pause()
        gameoveraudio.play()
    }
    else if (increment && xdis < 90) {
        audiostart.play()        
        if(audiostart.currentTime==audiostart.duration){
            audiostart.play()
        }
        //here we set the values for when we wanna update now if increment is true and xdis is less then the over value then we increment the value and the after increment the value we make increment the value to faluse so they can cross eachothers. and then after a certen moment we increase the value to true
        score += 100;
        document.getElementById('score').innerHTML = `<h2>game score = ${score}</h2>`
        increment = false
        setTimeout(() => {
            increment = true
        }, 1000)
        // console.log(document.getElementById('enemy').style.animationDuration)
// if the score is vagses is 0 then we decrease the animation duration for the speed increment
        if (score % 1 == 0) {
            aduration = parseFloat(window.getComputedStyle(enemy, null).getPropertyValue('animation-duration'))
            if (aduration <= 2) {
                aduration = 2
            }
            else {

                setTimeout(() => {
                    //here we set a time out to avoid the collition istantly!
                    document.getElementById('enemy').style.animationDuration = aduration - 0.2 + 's'
                }, 100)
            }
        }

    }
}, 100)

