const wrapper = document.querySelector(".grid-wrapper");
const columns = document.getElementsByClassName("grid-column");


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
let len = 0;

let turn = {
    player: false,
    comp: false
}


let player = {
    name: ''
};

let comp = {
};

let winner;

const charachters = {
    x: 'x',
    o: 'o'
}

let gameIsRuning = false;

player.charachter = charachters.o;
comp.charachter = charachters.x;

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


compMove = () => {
    const first = [0, 2, 4, 6, 8];
    if(isEmpety()) {
        let index = getRandomNumber(0, 4);
        indexes.value[first[index]] = comp.charachter;
        indexes.len++;
        columns[first[index]].innerHTML = comp.charachter;
    } else {
        if(indexes.len === 1) {
            first.splice(2, 1);
            let index = getRandomNumber(0, 3);
            while(indexes.value[first[index]] != '') {
                index = getRandomNumber(0, 3);
            }
            indexes.value[first[index]] = comp.charachter;
            indexes.len++;
            columns[first[index]].innerHTML = comp.charachter;
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
            if(isPlayerWining()) {
                // ==================== go from here =========================
            }
        }
    }
}


isPlayerWining = () => {
// should be defined
}

check = (first, second, third) => {
    if (indexes.value[first] === indexes.value[second] && indexes.value[first] === indexes.value[third] && indexes.value[first] != '') {
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

startGame();
compTurn();

