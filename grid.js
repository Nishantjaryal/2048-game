const gridSize = 4;
const cellSize = 17;
const cellGaps = 2;

const Score = document.getElementById("Score")
const highestScore = document.getElementById("highestScore")

let myScore = 0;

export class Grid {
    #cells;

    constructor(gridElement) {
        gridElement.style.setProperty("--grid-size", `${gridSize}`)
        gridElement.style.setProperty("--cell-size", `${cellSize}vmin`)
        gridElement.style.setProperty("--cell-gaps", `${cellGaps}vmin`)
        this.#cells = createCellElements(gridElement).map((cellEle, index) => {
            return new Cell(
                cellEle,
                index % gridSize,
                Math.floor(index / gridSize))
        })
    }

    get cellsByColumn() {
        return this.#cells.reduce((cellGrid, cell) => {
            cellGrid[cell.x] = cellGrid[cell.x] || []
            cellGrid[cell.x][cell.y] = cell
            return cellGrid
        }, [])
    }
    get cellsByRow() {
        return this.#cells.reduce((cellGrid, cell) => {
            cellGrid[cell.y] = cellGrid[cell.y] || []
            cellGrid[cell.y][cell.x] = cell
            return cellGrid
        }, [])
    }

    get #emptyCells() {
        return this.#cells.filter(cell => cell.tile == null)
    }


    get cells() {
        return this.#cells
    }

    set cells(val){
        this.#cells = null
    }


    randomEmptyCell() {
        const randomIndex = Math.floor(Math.random() * this.#emptyCells.length)
        return this.#emptyCells[randomIndex]
    }
}

class Cell {

    #cellEle
    #x
    #y
    #tile
    #mergeTile

    constructor(cellEle, x, y) {
        this.#cellEle = cellEle;
        this.#x = x;
        this.#y = y;

    }


    get x() {
        return this.#x
    }

    get y() {
        return this.#y
    }

    get tile() {
        return this.#tile
    }


    set tile(value) {
        this.#tile = value;
        if (value == null) return
        this.#tile.x = this.#x
        this.#tile.y = this.#y
    }

    get mergeTile() {
        return this.#mergeTile
    }

    set mergeTile(value) {
        this.#mergeTile = value
        if (value == null) {
            return
        }
        this.#mergeTile.x = this.#x
        this.#mergeTile.y = this.#y
    }



    canAccept(tile) {
        return (this.tile == null || (this.mergeTile == null && this.tile.value === tile.value))
    }

    mergeTiles() {
        if (this.tile == null || this.mergeTile == null) return
        this.tile.value = this.tile.value + this.mergeTile.value

        changeScore(this.tile.value)

        this.mergeTile.remove()
        this.mergeTile = null
    }
}

function createCellElements(GridElement) {
    const cells = [];
    for (let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cells.push(cell)
        GridElement.append(cell)
    }
    return cells;

}

function changeScore(data) {
    if (!localStorage.getItem("HighestScore")) {
        localStorage.setItem("HighestScore", 0)
    }else{
        highestScore.textContent = parseInt(localStorage.getItem("HighestScore")) ;
    }
    myScore += data;
    if (parseInt(localStorage.getItem("HighestScore")) < myScore) {
        localStorage.setItem("HighestScore", myScore)
        highestScore.textContent = myScore;
    }
    Score.textContent = myScore;

}

changeScore(0);



export function cleanBoard() {
    const list = document.querySelectorAll(".tile");
    list.forEach((Thetile)=>{

        Thetile.remove()
    })
  
    myScore = 0
    Score.textContent = myScore;

}

