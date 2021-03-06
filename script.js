const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    // deixa input vermelho
    function showError(input, message) {
        const formControl = input.parentElement;
        formControl.className = 'form-control error';
        const small = formControl.querySelector('small');
        small.innerText = message;
    }

    // deixa input verde
    function showSuccess(input) {
        const formControl = input.parentElement;
        formControl.className = 'form-control success';
    }

    // retorna valores com letra maiuscula
    function getFieldName(input){
        return input.id.charAt(0).toUpperCase() + input.id.slice(1)
    }

    // checa tamanho do valor
    function checkLength(input, min, max) {
        if(input.value.length < min){
            showError(input, `${getFieldName(input)} muest be at least ${min} characters`);
        }else if(input.value.length > max){
            showError(input, `${getFieldName(input)} muest be at less than ${max} characters`);
        }else{
            showSuccess(input); 
        }
    }

    // checa se os passwords sao iguais
    function checkPasswordEqual(input1, input2) {
        if(input1.value !== input2.value) {
            showError(input2, 'Passwords do not match')
        }
    }

    function checkEmail(input) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        // return re.test(String(input).toLocaleLowerCase());
        if(re.test(input.value.trim()   )) {
            showSuccess(input);
        }else {
            showError(input, `Email is not valid`);
        }
    }

    function checkRequired(inputArr) {
        inputArr.forEach(function(input) {
            if(input.value.trim() === '') {
                showError(input, `${getFieldName(input)} is required`);
            }else {
                showSuccess(input);
            }
        })
    }

    checkRequired([username, email, password, password2]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkEmail(email);
    checkPasswordEqual(password, password2);

})

