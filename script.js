const wrapper = document.querySelector(".grid-wrapper");
const columns = document.getElementsByClassName("grid-column");


let indexes = [
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    ''
]

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
        if (indexes[i] == '' && turn.player && gameIsRuning) {
            columns[i].innerHTML = player.charachter;
            indexes[i] = player.charachter;
            turn.player = false;
            turn.comp = true;
        }
    })
}


check = (first, second, third) => {
    if (indexes[first] === indexes[second] && indexes[first] === indexes[third] && indexes[first] != '') {
        return true;
    } else {
        return false;
    }
}

isFull = () => {
    let flag = true;
    indexes.forEach(index => {
        if (index === '') {
            flag = false;
        }
    })

    return flag;
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
                let index = getRandomNumber(0, 8);
                while (indexes[index] != '') {
                    index = getRandomNumber(0, 8);
                }
                indexes[index] = comp.charachter;
                columns[index].innerHTML = comp.charachter;
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
            return indexes[i];
        }
    }

    // Checking Columns
    for (let i = 0; i <= 2; i++) {
        if (check(i, i + 3, i + 6)) {
            return indexes[i];
        }
    }

    // Checking Diameters
    for (let i = 0; i <= 2; i += 2) {
        if (i == 0) {
            if (check(i, i + 4, i + 8)) {
                return indexes[i];
            }
        } else {
            if (check(i, i + 2, i + 4)) {
                return indexes[i];
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

