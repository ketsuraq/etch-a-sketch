
let colorPickerButton = document.querySelector('.color-picker');
colorPickerButton.style.backgroundColor = 'black';

colorPickerButton.addEventListener('click', createModal);

let selectedColor = 'black';

function createModal() {
    let modal = document.createElement('div');
    let overlay = document.createElement('div');

    modal.classList.add('modal');
    overlay.classList.add('overlay');
    modal.textContent = 'Pick a color!';

    document.body.appendChild(modal);
    document.body.appendChild(overlay);

    modalColors((color) => {
        selectedColor = color;
        colorPickerButton.style.backgroundColor = selectedColor;
        document.body.removeChild(modal);
        document.body.removeChild(overlay);
    }, modal);
}

function modalColors(callback, modal) {
    let colorArray = ['red', 'crimson', 'salmon', 
                    'hotpink', 'deeppink', 'pink',
                    'orange', 'sienna', 'coral',
                    'yellow', 'gold', 'moccasin',
                    'purple', 'indigo', 'violet',
                    'green', 'darkgreen', 'lime',
                    'deepskyblue', 'blue', 'aqua',
                    'gray', 'black', 'white'];

    let row;
    for (let i = 0; i < colorArray.length; i++){
        if (i % 3 == 0) {
            row = document.createElement('div');
            row.classList.add('color-row');
            modal.appendChild(row);
        }
        let colorPick = document.createElement('button');
        colorPick.classList.add('color-pick');
        colorPick.style.backgroundColor = colorArray[i];
        colorPick.style.height = '40px';
        colorPick.style.width = '40px';
        colorPick.style.border = 'none';
    
        colorPick.addEventListener('click', function() {
            callback(colorArray[i]);
        });
    
        row.appendChild(colorPick);
    }
}


let slider = document.querySelector('.slider');
let gridSize;
let sliderValue

slider.addEventListener('input', function(event) {
    sliderValue = event.target.value;

    let sliderText = document.querySelector('.slidervalue');
    sliderText.textContent = `${sliderValue} x ${sliderValue}`;

    gridSize = sliderValue;

    createGrid(parseInt(sliderValue));
})


let canvas = document.querySelector('.canvas');

function createGrid(gridSize) {
    canvas.innerHTML = '';
    let cellSize = 100 / gridSize;

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            cell.style.width = `${100 / gridSize}%`;
            cell.style.height = `${100 / gridSize}%`;
            
            cell.addEventListener('mousedown', function() {
                cell.style.backgroundColor = selectedColor;
            });
            let mouseDown = false;

            canvas.addEventListener('mousedown', () => {
                mouseDown = true;
            })
            canvas.addEventListener('mouseup', () => {
                mouseDown = false;
            })

            cell.addEventListener('mouseover', function() {
                if (mouseDown) {
                    cell.style.backgroundColor = selectedColor;
                }
            })

            canvas.appendChild(cell);
        }
    }
};

createGrid(16);

let drawMode = document.querySelector('.draw-mode');
drawMode.addEventListener('click', function() {
    selectedColor = colorPickerButton.style.backgroundColor;
})

let eraseMode = document.querySelector('.erase-mode');
eraseMode.addEventListener('click', function() {
    selectedColor = 'white';
})

let clearMode = document.querySelector('.clear');
clearMode.addEventListener('click', function() {
    let cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.style.backgroundColor = 'white';
    });
})

let fillMode = document.querySelector('.fill-mode');
fillMode.addEventListener('click', function() {
    let cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.style.backgroundColor = selectedColor;
    })
})

let rainbowMode = document.querySelector('.rgb-mode');
rainbowMode.addEventListener('click', function() {
    let randomRed = Math.floor(Math.random() * 255);
    let randomGreen = Math.floor(Math.random() * 255);
    let randomBlue = Math.floor(Math.random() * 255);
    selectedColor = `rgb(${randomRed}, ${randomGreen}, ${randomBlue})`;
})