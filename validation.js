document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('userInfoForm');
    var nameInput = document.getElementById('name');
    var nameHint = document.getElementById('nameHint');
    var phone = document.getElementById('phone');
    var birthDate = document.getElementById('birthDate');

   
    nameInput.addEventListener('input', function() {
        validateNameInput();
    });

    function validateNameInput() {
        var nameValue = nameInput.value;
        var nameRegex = /^[A-Za-z\s]+$/;

        if (!nameRegex.test(nameValue) && nameValue !== "") {
            // checks for requierments and turns text red if they are wrong (real-time validation)
            nameHint.textContent = "Your name should be without special characters or numbers";
            nameHint.classList.add('error');
            nameInput.style.borderColor = 'red';
            return false;
        } else {
        
            nameHint.textContent = "Your name without special characters or numbers";
            nameHint.classList.remove('error');
            nameInput.style.borderColor = '';
            return true;
        }
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        var isNameValid = validateNameInput(); // name validation
        var isPhoneValid = validatePhoneNumber(phone.value); // number validation
        var isBirthDateValid = validateBirthDate(birthDate.value); // birth date validation

        if (isNameValid && isPhoneValid && isBirthDateValid) {
            form.submit(); // submits the form i everything is valid
        } else {
            alert('Please correct the errors before submitting.');
        }
    });

    function validatePhoneNumber(phoneNumber) {
        var phoneRegex = /^\+[1-9]\d{1,14}$/;
        if (!phoneRegex.test(phoneNumber)) {
            alert('Please enter a valid phone number in international format (e.g., +1234567890).');
            return false;
        }
        return true;
    }
    
    function validateBirthDate(birthDateString) {
        var parts = birthDateString.split('-');
        var year = parseInt(parts[0], 10);
        var month = parseInt(parts[1], 10) - 1; 
        var day = parseInt(parts[2], 10);

        var today = new Date();
        var birthDate = new Date(year, month, day);
        if (birthDate > today) {
            alert('Birth date cannot be in the future.');
            return false;
        }

        if (month == 1 && day == 29 && !((year % 4 == 0 && year % 100 != 0) || year % 400 == 0)) {
            alert('Invalid birth date: not a leap year.');
            return false;
        }

        if (birthDate.getFullYear() !== year || birthDate.getMonth() !== month || birthDate.getDate() !== day) {
            alert('Invalid birth date.');
            return false;
        }

        return true;
    }
});


