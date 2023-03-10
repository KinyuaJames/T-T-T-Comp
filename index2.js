// variables for the HTML element
const box = document.querySelectorAll('#cell')
const sttatus = document.querySelector('#status')
const restarts = document.querySelector('#restart')
const playy =  document.querySelector('#playy')

playingWith = ''

// setting up the scores
scores = {
    x: 0,
    o: 0,
    draws: 0,
}

// declaring variables for when game is running, the player(current player) and winning conditions
let running = false;
let player = 'X'; //current start game player
let computer = 'O';

let selected = ["","","","","","","","",""]; //an array to add the clicked cell
let winConditions = [
    ['0','1','2'],
    ['3','4','5'],
    ['6','7','8'],
    ['0','3','6'],
    ['1','4','7'],
    ['2','5','8'],
    ['0','4','8'],
    ['2','4','6']
]

let available = [];
restarts.addEventListener('click',restartBtn)
computerWon = false;
startGame()
clickable = true;

// event listener for restarting the game
function startGame() {
    box.forEach(pick => pick.addEventListener('click',boxClicked))
    running = true;
}


// y = document.querySelector('#script')
// console.log(y)



function availablePicks(){
    available= []
    for (let x = 0; x < selected.length; x++) {
        const pick = selected[x];
        if (!pick) {
            available.push(x)
        }
    }
}
function compPick() {
    clickable = false;
    if (running) {
        setTimeout(function()
        {
            x = Math.floor((Math.random()*(available.length)))
            iPick = available[Math.floor((Math.random()*(available.length)))]
            
            
            // console.log(x)
            box[iPick] = computer
            
            selected[iPick] = computer
            box[iPick].textContent = computer
            checkWin()
            if (!roundWon && !draw) {
                sttatus.textContent = `${player} turn`
            }
            clickable = true
        },2000 )
    }


    
}

// when a cell is clicked
function boxClicked() {
    if (running) {
        if (clickable) {
            
            const boxIndex = this.getAttribute('cellIndex')
            updateBox(this, boxIndex) //update value when a box is clicked
            availablePicks()
            if (!roundWon && !draw) {
                sttatus.textContent = `${computer} turn`
            }
            changePlayer()//change the player if no winner
        }
        
    }

    
}

// updating the cell on the browser
function updateBox(pick , index) {
    selected[index] = player//update the 'selected' array with the player value(X OR O) to the 
    pick.textContent = player //update a box with the player value
    checkWin()

}

// change player
function changePlayer(){
    compPick()
}

// checking if the game is won
function checkWin(){
    roundWon = false;
    draw = false;
    whoWon = ''
    for (let x = 0; x < winConditions.length; x++) { //iterate through the winCondition array
        const condition = winConditions[x]; // this will be the first condition in the iterating array
        
        const check1 = selected[condition[0]]//asign the first object in the condition array to this variable and so on below...
        const check2 = selected[condition[1]]
        const check3 = selected[condition[2]]
            
        if (check1 == "" || check2 == "" || check3 == "" ) { //check for empty spaces
            continue
        }
        if (check1 == check2 && check2 == check3  ) {//check if the values are same hence a winner
            if (check1 == 'X') {// check if winner is X
                scores.x +=1 
                roundWon = true;
            }
            else if (check1 == 'O') {//check if winner is O
                scores.o +=1
                roundWon = true;
            }
            whoWon = check1
            sttatus.textContent = `${check1} wins`
            running = false //close the game if there is a winner
            break;
        }
    }
                
    if(!selected.includes("")){ //check if there are empty spaces
        if (!roundWon) { //check if the round is won
            scores.draws += 1 //if no its a draw so add 1 to the draw
            draw = true
            sttatus.textContent = "draw"
            running = false;
        }
    }
    document.querySelector('#drawScores').textContent = scores.draws
    document.querySelector('#xScores').textContent = scores.x
    document.querySelector('#oScores').textContent = scores.o
    
    if (whoWon == computer ) {
        computerWon = true;
        
    }
    else{
        computerWon = false
    }
    // else if (whoWon == player && whoWon == "X") {
    //     player == 'O'
    // }
    if (roundWon) {
        sttatus.textContent = `${whoWon} WINS!!`
        running =false
        
    }
    else if(draw){
        sttatus.textContent = `its a DRAW!!`

    }
    
}

// function for restarting the game
function restartBtn() {
    // player = `${player}`
    
    sttatus.textContent = `${whoWon} turn`
    selected = ["","","","","","","","",""] //resetting the selected boxes
    box.forEach(pick => pick.textContent = '') //resetting the boxes
    running = true;
    // computerWon = false;
    clickable = true
    if (computerWon == true) {
        clickable = false;
        compPick()
    }
    else{
        computerWon= false
    }
}