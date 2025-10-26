const form = document.getElementById('form');
const email = document.getElementById('email');
const username = document.getElementById('username');
const password = document.getElementById('password');
const errorMessage = document.getElementById('error-message');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    let errors = [];
    if(email){
        errors = validateSignUp(email, username, password);
    }
    else{
        errors = validateLogin(username, password);
    }
    if(errors.length > 0){
        errorMessage.innerText = errors.join(', ');
    } else {
        errorMessage.innerText = '';
        try{
            if(form.querySelector('button[name="register"]') || email){
                if(!form.querySelector('input[name="register"]')){
                    const hidden = document.createElement('input');
                    hidden.type = 'hidden';
                    hidden.name = 'register';
                    hidden.value = '1';
                    form.appendChild(hidden);
                }
            } else if(form.querySelector('button[name="login"]')){
                if(!form.querySelector('input[name="login"]')){
                    const hidden = document.createElement('input');
                    hidden.type = 'hidden';
                    hidden.name = 'login';
                    hidden.value = '1';
                    form.appendChild(hidden);
                }
            }
        } catch (err) {
            console.warn('Failed to attach hidden submit input', err);
        }
        form.submit();
    }
});

function validateSignUp(email, username, password){
    let errors = [];
    if(email.value === '' || email == null){
        errors.push('Email tidak boleh kosong');
    }
    else if(!email.value.includes('@')){
        errors.push('Email tidak valid');
    }
    if(username.value === '' || username == null){
        errors.push('Username tidak boleh kosong');
    }
    if(password.value === '' || password == null){
        errors.push('Password tidak boleh kosong');
    }
    else if(password.value.length < 8){
        errors.push('Password harus memiliki minimal 8 karakter');
    }
    return errors;
}

function validateLogin(username, password) {
    let errors = [];
    if(username.value === '' || username == null){
        errors.push('Username tidak boleh kosong');
    }
    if(password.value === '' || password == null){
        errors.push('Password tidak boleh kosong');
    }
    return errors;
}

