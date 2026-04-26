document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault(); 

    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    let isFormValid = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
        emailError.style.display = 'block';
        emailInput.style.borderColor = '#e74c3c';
        isFormValid = false;
    } else {
        emailError.style.display = 'none';
        emailInput.style.borderColor = '#ddd';
    }

    if (passwordInput.value.length < 6) {
        passwordError.style.display = 'block';
        passwordInput.style.borderColor = '#e74c3c';
        isFormValid = false;
    } else {
        passwordError.style.display = 'none';
        passwordInput.style.borderColor = '#ddd';
    }
    if (isFormValid) {
        console.log("נתונים נשלחים:", {
            email: emailInput.value,
            password: passwordInput.value
        });
        alert('התחברת בהצלחה! מעביר אותך לדף הבית...');
        window.location.href = 'index.html';
    }
});