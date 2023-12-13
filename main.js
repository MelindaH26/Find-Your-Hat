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
  updateCurrentPosition(direction) {
    let row = this.currentRow;
    let column = this.currentColumn;
    
    const updatePositionInField = () => {
      let newPosition = this.grid[this.currentRow][this.currentColumn];
      // update current position
      this.currentPosition = newPosition;
      if (this.currentPosition === holeCharacter) {
        // if is hole you die
        this.gameState = "lose";
      } else if (this.currentPosition === hatCharacter) {
      // else if hat you win
        this.gameState = "win";
      } else {
      // else update to star
        this.grid[this.currentRow][this.currentColumn] = pathCharacter;
      }
    }
    
    if(direction === 'u') {
      if (row > 0) {
        this.currentRow -= 1;
        updatePositionInField();
        return true;
      } else {
        return false;
      }
    }
    if(direction === 'l') { 
      if (column > 0 ) {
        this.currentColumn -=1;
        updatePositionInField();
        return true;
      } else {
        return false;
      }
    }
    if(direction === 'r') {
      if (column < gridWidth-1) {
        this.currentColumn += 1;
        updatePositionInField();
        return true;
      } else {
        return false;
      }
    }
    if(direction === 'd') {
      if (row < gridHeight-1) {
        this.currentRow += 1;
        updatePositionInField();
        return true;
      } else {
        return false;
      }
    }
  }
}

// THE MAIN GAMELOOP
const playGame = () => {
  // create playfield and log it to terminal
  const myField = new Field();
  console.log(`\nWelcome to Find Your Hat!.\nNavigate to your hat ^ to win.\nEnter u, l, r or d to move left, up, right or down.\n\n${myField.print()}`);
  while (myField.gameState === 'play') {
    // ask for user input
    let userInput = prompt('Which direction would you like to go? ');
    // if valid direction was entered update current position and re-render field
    if (userInput === 'u' || userInput === 'l' || userInput === 'r' || userInput === 'd') {
      let updateField = myField.updateCurrentPosition(userInput);
      // re-render field
      console.log(`\n${myField.print()}`);
      if (!updateField) {
        console.log('you can\'t go that way!\n');
      }
    } else {
      console.log ('Invalid input. Please enter u, d, l, or r.\n');
    }
  } 
  if (myField.gameState === 'lose') {
    console.log ('You fell in a hole ...\nGAME OVER');
  } else if (myField.gameState === 'win') {
    console.log('You found your hat!\nYOU WIN!');
  } else {
    console.log('something went wrong ....');
  }
}

// run the game
playGame();