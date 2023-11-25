const board = document.querySelector("#board");
const newGridButton = document.querySelector("#newGrid");
const resetGridButton = document.querySelector("#resetGrid");
const rgbCheckbox = document.querySelector("#rgb");
const progressiveCheckbox = document.querySelector("#progressive");
const boardSize = 640;

// Activate RGB mode
let rgbMode = false;
rgbCheckbox.addEventListener('change', () => {
    if (rgbCheckbox.checked === true) {rgbMode = true} else {rgbMode = false};
})

// Activate Progressive Mode
let progressiveMode = false;
progressiveCheckbox.addEventListener('change', () => {
    if (progressiveCheckbox.checked === true) {progressiveMode = true} else {progressiveMode = false};
})

// create grids
function createGrid(gridSize = 16) {
    for (let i = 0; i < gridSize; i++) {
        const vertGrid = document.createElement('div')
        vertGrid.classList.add("vertGrid")
        for (let j = 0; j < gridSize; j++) {
            const horzGrid = document.createElement('div')
            horzGrid.classList.add("horzGrid")
            horzGrid.style.minHeight = boardSize/gridSize + 'px';
            horzGrid.style.minWidth = boardSize/gridSize + 'px';

            horzGrid.addEventListener('mouseover', (e) => {

                if (rgbMode) {
                    e.target.style.backgroundColor = rgbRandomColor();
                } else {
                    e.target.style.backgroundColor = 'black';
                }
                
            });

            vertGrid.appendChild(horzGrid);
        }
        board.appendChild(vertGrid);
    }
    console.log(rgbMode);
}

// Random color function
function rgbRandomColor() {
    return "rgb("+ Math.floor(Math.random() * 255) +", "+ Math.floor(Math.random() * 255) +", "+ Math.floor(Math.random() * 255) +")";
}

// Delete old grid and create new grid
newGridButton.addEventListener('click', (e) => {
    let nGrids = prompt('Enter square grid size (min:16, max:100): ');
    if ((+nGrids > 100 || +nGrids < 16) || typeof +nGrids !== 'number') {
        alert('Invalid input')
    } else {
        board.textContent = '';
        createGrid(+nGrids);
    }
});

// Reset grid colors
resetGridButton.addEventListener('click', (e) => {
    board.childNodes.forEach(child => {
        child.childNodes.forEach(square => {
            square.style.backgroundColor = 'white';
        });
    });
});

createGrid();

