const wrapper = document.querySelector(".grid-wrapper");
const columns = document.getElementsByClassName("grid-column");


// buttons
const startBTN = document.querySelector(".btn-start");
const newGameBTN = document.querySelector(".btn-new-game");
const xBTN = document.querySelector(".btn-x");
const oBTN = document.querySelector(".btn-o");

// wrappers
const startWrapper = document.querySelector(".start-wrapper");
const chooseWrapper = document.querySelector(".choose-wrapper");
const newGameWrapper = document.querySelector(".new-game-wrapper");


// variables
let indexes = {
   value:  [
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        ''
    ],
    len: 0
} 

let turn = {
    player: false,
    comp: false
}


let player = {
    charachter: false
};

let comp = {
    charachter: false
};

let winner;

const charachters = {
    x: 'x',
    o: 'o'
}

let gameIsRuning = false;



// UI handling
//=========================== go from here ============================


// click listener for player`s turn
for (let i = 0; i < columns.length; i++) {
    columns[i].addEventListener("click", () => {
        if (indexes.value[i] == '' && turn.player && gameIsRuning) {
            columns[i].innerHTML = player.charachter;
            indexes.value[i] = player.charachter;
            indexes.len++;
            turn.player = false;
            turn.comp = true;
        }
    })
}

// handling comp move in diferent situations
compMove = () => {
    const first = [0, 2, 4, 6, 8];
    if(isEmpety()) {
        let index = getRandomNumber(0, 4);
        indexes.value[first[index]] = comp.charachter;
        indexes.len++;
        columns[first[index]].innerHTML = comp.charachter;
    } else {
        if(indexes.len === 1) {
            if(indexes.value[4] === '') {
                indexes.value[4] = comp.charachter;
                indexes.len++;
                columns[4].innerHTML = comp.charachter;
            } else {
                first.splice(2, 1);
                let index = getRandomNumber(0, 3);
                while(indexes.value[first[index]] != '') {
                    index = getRandomNumber(0, 3);
                }
                indexes.value[first[index]] = comp.charachter;
                indexes.len++;
                columns[first[index]].innerHTML = comp.charachter;
            }
        } else if(indexes.len === 2) {
            if(indexes.value[4] === '') {
                indexes.value[4] = comp.charachter;
                indexes.len++;
                columns[4].innerHTML = comp.charachter;
            } else {
                first.splice(2, 1);
                let index = getRandomNumber(0, 3);
                while(indexes.value[first[index]] != '') {
                    index = getRandomNumber(0, 3);
                }
                indexes.value[first[index]] = comp.charachter;
                indexes.len++;
                columns[first[index]].innerHTML = comp.charachter;
            }
        } else {
            let index = isPlayerWining();
            if(index != -1) {
                indexes.value[index] = comp.charachter;
                indexes.len++;
                columns[index].innerHTML = comp.charachter;
            } else {
                index = isCompWining();
                if(index != -1) {
                    indexes.value[index] = comp.charachter;
                    indexes.len++;
                    columns[index].innerHTML = comp.charachter;
                } else {
                    if(indexes.value[4] === '') {
                        indexes.value[4] = comp.charachter;
                        indexes.len++;
                        columns[4].innerHTML = comp.charachter;
                    } else {
                        index = empetyPlus();
                        if(index != -1) {
                            indexes.value[index] = comp.charachter;
                            indexes.len++;
                            columns[index].innerHTML = comp.charachter;
                        } else {
                            let empetyIndexes = getEmpeties();
                            let index = getRandomNumber(0, empetyIndexes.length - 1);
                            indexes.value[index] = comp.charachter;
                            indexes.len++;
                            columns[index].innerHTML = comp.charachter;
                        }
                    }
                }
            }
        }
    }
}

isCompWining = () => {

    // checking to see if comp can win in rows
    for (let i = 0; i <= 6; i += 3) {
        if((indexes.value[i] === indexes.value[i+1]) && 
            indexes.value[i] === comp.charachter && 
            indexes.value[i+2] === '') {

                return i+2;

        } else if((indexes.value[i] === indexes.value[i+2]) && 
                   indexes.value[i] === comp.charachter && 
                   indexes.value[i+1] === '') {

                return i+1;

        } else if((indexes.value[i+1] === indexes.value[i+2]) && 
                   indexes.value[i+1] === comp.charachter && 
                   indexes.value[i] === '') {

                return i;

        }
    }

    // checking to see if comp can win in columns
    for (let i = 0; i < 3; i++) {
        if((indexes.value[i] === indexes.value[i+3]) && 
            indexes.value[i] === comp.charachter && 
            indexes.value[i+6] === '') {

                return i+6;
        
        } else if((indexes.value[i] === indexes.value[i+6]) && 
                   indexes.value[i] === comp.charachter && 
                   indexes.value[i+3] === '') {

                return i+3;

        } else if((indexes.value[i+3] === indexes.value[i+6]) && 
                   indexes.value[i+3] === comp.charachter && 
                   indexes.value[i] === '') {

                return i;

        }
    }

    // checking to see if comp can win in diameters
    if((indexes.value[0] === indexes.value[4]) && 
        indexes.value[0] === comp.charachter && 
        indexes.value[8] === '') {

            return 8;
    
    } else if((indexes.value[0] === indexes.value[8]) && 
               indexes.value[0] === comp.charachter && 
               indexes.value[4] === '') {

            return 4;

    } else if((indexes.value[4] === indexes.value[8]) && 
               indexes.value[4] === comp.charachter && 
               indexes.value[0] === '') {

            return 0;

    } else if((indexes.value[2] === indexes.value[4]) && 
               indexes.value[2] === comp.charachter && 
               indexes.value[6] === '') {

            return 6;

    } else if((indexes.value[2] === indexes.value[6]) && 
               indexes.value[2] === comp.charachter && 
               indexes.value[4] === '') {

            return 4;

    } else if((indexes.value[4] === indexes.value[6]) && 
               indexes.value[4] === comp.charachter && 
               indexes.value[2] === '') {

            return 2;

    }

    return -1;
}

isPlayerWining = () => {

    // checking to see if player can win in rows
    for (let i = 0; i <= 6; i += 3) {
        if((indexes.value[i] === indexes.value[i+1]) && 
            indexes.value[i] === player.charachter && 
            indexes.value[i+2] === '') {

                return i+2;

        } else if((indexes.value[i] === indexes.value[i+2]) && 
                   indexes.value[i] === player.charachter && 
                   indexes.value[i+1] === '') {

                return i+1;

        } else if((indexes.value[i+1] === indexes.value[i+2]) && 
                   indexes.value[i+1] === player.charachter && 
                   indexes.value[i] === '') {

                return i;

        }
    }

    // checking to see if player can win in columns
    for (let i = 0; i < 3; i++) {
        if((indexes.value[i] === indexes.value[i+3]) && 
            indexes.value[i] === player.charachter && 
            indexes.value[i+6] === '') {

                return i+6;
        
        } else if((indexes.value[i] === indexes.value[i+6]) && 
                   indexes.value[i] === player.charachter && 
                   indexes.value[i+3] === '') {

                return i+3;

        } else if((indexes.value[i+3] === indexes.value[i+6]) && 
                   indexes.value[i+3] === player.charachter && 
                   indexes.value[i] === '') {

                return i;

        }
    }

    // checking to see if player can win in diameters
    if((indexes.value[0] === indexes.value[4]) && 
        indexes.value[0] === player.charachter && 
        indexes.value[8] === '') {

            return 8;
    
    } else if((indexes.value[0] === indexes.value[8]) && 
               indexes.value[0] === player.charachter && 
               indexes.value[4] === '') {

            return 4;

    } else if((indexes.value[4] === indexes.value[8]) && 
               indexes.value[4] === player.charachter && 
               indexes.value[0] === '') {

            return 0;

    } else if((indexes.value[2] === indexes.value[4]) && 
               indexes.value[2] === player.charachter && 
               indexes.value[6] === '') {

            return 6;

    } else if((indexes.value[2] === indexes.value[6]) && 
               indexes.value[2] === player.charachter && 
               indexes.value[4] === '') {

            return 4;

    } else if((indexes.value[4] === indexes.value[6]) && 
               indexes.value[4] === player.charachter && 
               indexes.value[2] === '') {

            return 2;

    }

    return -1;

}

check = (first, second, third) => {
    if (indexes.value[first] === indexes.value[second] && 
        indexes.value[first] === indexes.value[third] && 
        indexes.value[first] != '') {

        return true;

    } else {
        return false;
    }
}

isFull = () => {
    return indexes.len === indexes.value.length;
}

isEmpety = () => {
    return indexes.len === 0;
}

getEmpeties = () => {
    let array = [];
    for (let i = 0; i < indexes.value.length; i++) {
        if (indexes.value[i] === '') {
            array.push(i);
        }
    }

    return array;
}

empetyCorner = () => {
    if(indexes.value[0] === '') {
        return 0;
    } else if(indexes.value[2] === '') {
        return 2;
    } else if(indexes.value[6] === '') {
        return 6;
    } else if(indexes.value[8] === '') {
        return 8;
    } else {
        return -1;
    }
}

empetyPlus = () => {
    if(indexes.value[1] === '') {
        return 1;
    } else if(indexes.value[3] === '') {
        return 3;
    } else if(indexes.value[5] === '') {
        return 5;
    } else if(indexes.value[7] === '') {
        return 7;
    } else {
        return -1;
    }
}

getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * ((max + 1) - min) + min);
}

let compInterval;
compTurn = () => {
    compInterval = setInterval(() => {
        winner = checkEnd();

        if (winner === player.charachter) {
            clearInterval(compInterval);
            console.log("you won");
            turn.comp = false;
            turn.player = false;
            gameIsRuning = false;
        } else if (winner === comp.charachter) {
            clearInterval(compInterval);
            console.log("you lose");
            turn.player = false;
            turn.comp = false;
            gameIsRuning = false;
        } else if (winner === 'draw') {
            clearInterval(compInterval);
            console.log("draw");
            turn.player = false;
            turn.comp = false;
            gameIsRuning = false;
        } else {
            if (turn.comp && gameIsRuning) {
                compMove();
                turn.comp = false;
                turn.player = true;
            }
        }
    }, 200);
}


checkEnd = () => {

    // Checking Rows
    for (let i = 0; i <= 6; i += 3) {
        if (check(i, i + 1, i + 2)) {
            return indexes.value[i];
        }
    }

    // Checking Columns
    for (let i = 0; i <= 2; i++) {
        if (check(i, i + 3, i + 6)) {
            return indexes.value[i];
        }
    }

    // Checking Diameters
    for (let i = 0; i <= 2; i += 2) {
        if (i == 0) {
            if (check(i, i + 4, i + 8)) {
                return indexes.value[i];
            }
        } else {
            if (check(i, i + 2, i + 4)) {
                return indexes.value[i];
            }
        }
    }

    if (isFull()) {
        return 'draw';
    }

    return false;
}

startGame = () => {
    if (player.charachter == 'o') {
        turn.player = true;
    } else {
        turn.comp = true;
    }
    gameIsRuning = true;
}

init = () => {
    indexes.value = [
             '',
             '',
             '',
             '',
             '',
             '',
             '',
             '',
             ''
         ];
    indexes.len = 0;
    turn.player = false;
    turn.comp = false;
    player.charachter = false;
    comp.charachter = false;
    winner = false;
    gameIsRuning = false;
}


startGame();
compTurn();

