const alphabetContainer = document.querySelector('.alphabet');


const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

function renderAlphabet(arr){
    for (letter of arr){
        // Crear botones
        const btnLetter = document.createElement('button');
        // Asignar id
        btnLetter.setAttribute('id', letter);
        // Asignar clases
        btnLetter.classList.add('button', 'btn-alphabet');
        //  Asignar value
        btnLetter.innerText = `${letter}`;
        // Agregar los botones dentro del div q los contendra
        alphabetContainer.appendChild(btnLetter);
    }
}

renderAlphabet(alphabet);