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
}


// create game class

// create a new field instance and print the fields

// ask for user input while the current position is not the hat position 

  // update userposition and run the loop again

// if current position is hole position (you lose)

// if current position is hat, you win!





// create a field instance using the generated grid and print it
const myField = new Field();
console.log(myField.print());