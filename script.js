let colorPickerButton = document.querySelector('.color-picker');

colorPickerButton.addEventListener('click', createModal);

function createModal() {
    let modal = document.createElement('div');
    let overlay = document.createElement('div');

    modal.classList.add('modal');
    overlay.classList.add('overlay');
    modal.textContent = 'Pick a color!';

    document.body.appendChild(modal);
    document.body.appendChild(overlay);

    modalColors((selectedColor) => {
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
