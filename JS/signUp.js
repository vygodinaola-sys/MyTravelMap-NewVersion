$(document).ready(function() {
    $('#signUpForm').on('submit', function(e) {
        e.preventDefault();

        const fullName = $('#fullName');
        const email = $('#email');
        const password = $('#password');
        const confirmPassword = $('#confirmPassword');

        const nameError = $('#nameError');
        const emailError = $('#emailError');
        const passwordError = $('#passwordError');
        const confirmError = $('#confirmError');

        let isValid = true;

        if (fullName.val().trim().length < 2) {
            nameError.css('display', 'block');
            fullName.css('border-color', '#ef4444');
            isValid = false;
        } else {
            nameError.css('display', 'none');
            fullName.css('border-color', '#e5e7eb');
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.val())) {
            emailError.css('display', 'block');
            email.css('border-color', '#ef4444');
            isValid = false;
        } else {
            emailError.css('display', 'none');
            email.css('border-color', '#e5e7eb');
        }

        if (password.val().length < 6) {
            passwordError.css('display', 'block');
            password.css('border-color', '#ef4444');
            isValid = false;
        } else {
            passwordError.css('display', 'none');
            password.css('border-color', '#e5e7eb');
        }

        if (confirmPassword.val() !== password.val() || confirmPassword.val() === "") {
            confirmError.css('display', 'block');
            confirmPassword.css('border-color', '#ef4444');
            isValid = false;
        } else {
            confirmError.css('display', 'none');
            confirmPassword.css('border-color', '#e5e7eb');
        }

        if (isValid) {
            localStorage.setItem('registeredUserName', fullName.val().trim());
            
            alert('Account created successfully! Welcome to the adventure.');
            window.location.href = 'index.html';
        }
    });
});