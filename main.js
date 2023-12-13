const prompt = require('prompt-sync')({sigint: true});

// field character types
const hatCharacter = '^';
const holeCharacter = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

// config of grid size and number of holes
const gridHeight = 10;
const gridWidth = 10;
const holesWanted = 15;
const gridTotal = gridHeight * gridWidth;


// generates a random cell number
function getRandomCell(numOfCells) {
  return Math.floor(Math.random()*numOfCells)
}


// setup the class for the field
class Field {
  constructor() {
    this.grid = this.generateGrid(gridTotal);
    this.currentRow = 0;
    this.currentColumn = 0;
    this.currentPosition = this.grid[this.currentRow][this.currentColumn];
    this.gameState = 'play';
  }
  // print method
  print() {
    let printArr = '';
    for (let i = 0; i < gridHeight; i++) {
      // convert each nested arrat to a string on a new line
      printArr += `${this.grid[i].join('')} \n`;
    }
    return printArr;
  }
  // generate grid of characters
  generateGrid = (gridSize) => {
    let array = [];
    for (let i = 0; i < gridSize; i++) {
      array.push(fieldCharacter);
    }
    // set player start position
    array[0] = pathCharacter;
    // generate hat position (grid size - 1, then add 1 so that the hat doesn't take the start position)
    const hatPostition = getRandomCell(gridSize-1) + 1;
    array[hatPostition] = hatCharacter;
    // if player wants more than 0 holes - generate holes
    if(holesWanted > 0) {
      let holesCreated = 0;
      do {
        let holePosition = getRandomCell(gridSize);
        // if cell is fieldCharacter turn it into a hole
        if (array[holePosition] === fieldCharacter) {
          array[holePosition] = holeCharacter;
          holesCreated ++;
        }
      } while (holesCreated < holesWanted);
    }
    // Divide grid array into desired rows
    let nestedArray = []
    for(let i = 0; i < array.length; i += gridWidth) {
      nestedArray.push(array.slice(i, i + gridWidth));
    }
    return nestedArray;
  }
  // Update currentposition
  updateCurrentPosition(direction) {
    //console.log(direction);
    let row = this.currentRow;
    let column = this.currentColumn;
    console.log(`your position was ${this.currentPosition}`);
    //let newPosition = this.grid[row][column];
    //this.currentPosition = newPosition;
    //this.grid[row][column] = pathCharacter;
    //console.log(this.grid[0][5]);
    console.log(`your row is ${row}`)

    if(direction === 'u') {
        if (row > 0) {
          // calc new coordinates
          row -= 1;
        } else {
          console.log('you can\'t go up');
        }
    }
    if(direction === 'l') { 
      return 'you put left';
    }
      // logic for right
    if(direction === 'r') {
        if (column !== gridWidth-1) {
          // calc new coordinates
          this.currentColumn += 1;
          let newPosition = this.grid[this.currentRow][this.currentColumn];
          // update current position
          this.currentPosition = newPosition;
          if (this.currentPosition === holeCharacter) {
            // if is hole you die
            this.gameState = "lose";
            console.log(`the gamestate is ${this.gameState}`);
          } else if (this.currentPosition === hatCharacter) {
            // else if hat you win
            this.gameState = "win";
          } else {
            // else update to star
            this.grid[this.currentRow][this.currentColumn] = pathCharacter;
          }
        } else {
          return 'you can\'t go right';
        }
    }
    if(direction === 'd') {
        return 'you put down';
    }
    
    // testing logs
    console.log(`your new position is ${this.currentPosition}`);
    console.log(`your current row is ${this.currentRow}`);
    console.log(`your current column is ${this.currentColumn}`);
  }
}


// create game class
class Game {
  constructor() {
  }
  playGame() {
    // create playfield
    const myField = new Field();
    // render playfield
    console.log(myField.print());
    // ask for direction
    while (myField.gameState === 'play') {
    let askQuestion = prompt('Which direction would you like to go?');
    //console.log(askQuestion);
    // handle user input
    let handleInput = this.handleUserInput(askQuestion);
    console.log(handleInput);
    // if valid direction was entered update current position and re-render field
    if (handleInput !== 'please enter u, d, l, or r') {
      myField.updateCurrentPosition(askQuestion);
      // re-render field
      console.log(myField.print());
    }
    } 
    if (myField.gameState === 'lose') {
      console.log ('GAME OVER');
    } else if (myField.gameState === 'win') {
      console.log('You found your hat, you win!');
    } else {
      console.log('something went wrong ....');
    }
  }
  handleUserInput(input) {
    const direction = input;
    switch(direction) {
      case 'u':
        return 'you put up';
      case 'l': 
        return 'you put left';
      case 'r':
        return 'you put right';
      case 'd':
        return 'you put down';
      default:
        return 'please enter u, d, l, or r';
    }
  }
}


// create a field instance using the generated grid and print it
const game = new Game();
game.playGame();