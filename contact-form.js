// Form validation and submission handling
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

// Validation rules
const validationRules = {
    name: {
        validate: (value) => value.trim().length > 0,
        message: 'Name is required'
    },
    email: {
        validate: (value) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(value.trim());
        },
        message: 'Please enter a valid email address'
    },
    message: {
        validate: (value) => value.trim().length > 0,
        message: 'Message is required'
    }
};

// Validate a single field
function validateField(fieldName) {
    const field = document.getElementById(fieldName);
    const errorElement = document.getElementById(fieldName + 'Error');
    const rule = validationRules[fieldName];
    
    if (!rule.validate(field.value)) {
        field.classList.add('error');
        errorElement.textContent = rule.message;
        errorElement.classList.add('show');
        return false;
    } else {
        field.classList.remove('error');
        errorElement.textContent = '';
        errorElement.classList.remove('show');
        return true;
    }
}

// Validate the entire form
function validateForm() {
    let isValid = true;
    for (const fieldName in validationRules) {
        if (!validateField(fieldName)) {
            isValid = false;
        }
    }
    return isValid;
}

// Clear form
function clearForm() {
    contactForm.reset();
    document.querySelectorAll('.error-message').forEach(msg => {
        msg.classList.remove('show');
        msg.textContent = '';
    });
    document.querySelectorAll('input, textarea').forEach(field => {
        field.classList.remove('error');
    });
    successMessage.classList.remove('show');
    successMessage.textContent = '';
}

// Handle form submission
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (validateForm()) {
        // Show success message
        successMessage.textContent = 'Message sent successfully! We will get back to you soon.';
        successMessage.classList.add('show');
        
        // Clear form after 2 seconds
        setTimeout(() => {
            clearForm();
        }, 2000);
    }
});

// Real-time validation on blur
document.getElementById('name').addEventListener('blur', function() {
    validateField('name');
});

document.getElementById('email').addEventListener('blur', function() {
    validateField('email');
});

document.getElementById('message').addEventListener('blur', function() {
    validateField('message');
});
