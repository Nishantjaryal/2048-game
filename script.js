import { Grid, cleanBoard } from "./grid.js"
import Tile from "./tile.js"



const reload = document.getElementById("reload")
const breakOver = document.getElementById("breakOver")
const gameBoard = document.getElementById("game-board")

const grid = new Grid(gameBoard)

grid.randomEmptyCell().tile = new Tile(gameBoard)
grid.randomEmptyCell().tile = new Tile(gameBoard)
setupInput()


function setupInput() {
    window.addEventListener("keydown", hanleInput)
}

function hanleInput(e) {
    switch (e.key) {
        case "ArrowUp":
            if (!canMoveUp()) {
                setupInput()
                return
            }
            moveUp()
            break;
        case "ArrowDown":
            if (!canMoveDown()) {
                setupInput()
                return
            }
            moveDown()
            break;
        case "ArrowLeft":
            if (!canMoveLeft()) {
                setupInput()
                return
            }
            moveLeft()
            break;
        case "ArrowRight":
            if (!canMoveRight()) {
                setupInput()
                return
            }
            moveRight()
            break;

        default:
            setupInput()
            return
    }


    grid.cells.forEach(cell => cell.mergeTiles())
    const newTile = new Tile(gameBoard)
    grid.randomEmptyCell().tile = newTile

    if (!canMoveUp() && !canMoveDown() && !canMoveLeft() && !canMoveRight()) {
        console.log("well played, game is over!")

        whenOver();




        // grid.cells.forEach((cell)=>{
        //     cell = null;
        // })
        // cleanBoard()
        // grid.randomEmptyCell().tile = new Tile(gameBoard)
        // grid.randomEmptyCell().tile = new Tile(gameBoard)


    }
    setupInput();
}

function moveUp() {

    return slideTiles(grid.cellsByRow)

}
function moveDown() {

    return slideTiles(grid.cellsByRow.map(row => [...row].reverse()))


}
function moveLeft() {
    return slideTiles(grid.cellsByColumn)


}
function moveRight() {
    return slideTiles(grid.cellsByColumn.map(column => [...column].reverse()))


}
function slideTiles(cells) {
    cells.forEach(group => {
        for (let i = 1; i < group.length; i++) {
            const cell = group[i];
            if (cell.tile == null) continue
            let lastValidTile = null;
            for (let j = i - 1; j >= 0; j--) {
                const moveToCell = group[j]
                if (!moveToCell.canAccept(cell.tile)) break
                lastValidTile = moveToCell
            }
            if (lastValidTile != null) {
                if (lastValidTile.tile != null) {
                    lastValidTile.mergeTile = cell.tile
                }
                else {
                    lastValidTile.tile = cell.tile
                }
                cell.tile = null
            }
        }
    });
}

function canMoveUp() {
    return canMove(grid.cellsByRow)
}
function canMoveDown() {
    return canMove(grid.cellsByRow.map(row => [...row].reverse()))
}
function canMoveLeft() {
    return canMove(grid.cellsByColumn)
}
function canMoveRight() {
    return canMove(grid.cellsByColumn.map(column => [...column].reverse()))
}

function canMove(cells) {
    return cells.some(group => {
        return group.some((cell, index) => {
            if (index === 0) return false
            if (cell.tile == null) return false
            const moveToCell = group[index - 1]
            return moveToCell.canAccept(cell.tile)
        })
    })
}

function whenOver() {
    document.getElementById("replay").style.display = "flex"
}

reload.addEventListener("click", () => {

    // Refresh the page
    location.reload();

})

breakOver.addEventListener("click", () => {
    // to close the tab
    window.close();

})