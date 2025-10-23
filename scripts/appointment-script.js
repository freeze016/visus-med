// Appointment Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('appointmentForm');
    const successMessage = document.getElementById('successMessage');

    // Set minimum date to today
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            date: document.getElementById('date').value,
            time: document.getElementById('time').value,
            message: document.getElementById('message').value
        };

        // Validate form
        if (!validateForm(formData)) {
            return;
        }

        // In a real application, this would send data to a server
        console.log('Form submitted with data:', formData);

        // Show success message
        showSuccessMessage();

        // Reset form
        form.reset();
    });

    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        // Format: +998 XX XXX-XX-XX
        if (value.length > 0) {
            if (!value.startsWith('998')) {
                value = '998' + value;
            }
            
            let formatted = '+' + value.substring(0, 3);
            if (value.length > 3) {
                formatted += ' ' + value.substring(3, 5);
            }
            if (value.length > 5) {
                formatted += ' ' + value.substring(5, 8);
            }
            if (value.length > 8) {
                formatted += '-' + value.substring(8, 10);
            }
            if (value.length > 10) {
                formatted += '-' + value.substring(10, 12);
            }
            
            e.target.value = formatted;
        }
    });

    // Date validation - don't allow Sundays
    dateInput.addEventListener('change', function(e) {
        const selectedDate = new Date(e.target.value);
        const dayOfWeek = selectedDate.getDay();

        if (dayOfWeek === 0) { // Sunday
            alert('Воскресенье - выходной день. Пожалуйста, выберите другую дату.');
            e.target.value = '';
        }
    });

    // Time validation based on day
    const timeInput = document.getElementById('time');
    timeInput.addEventListener('change', function(e) {
        if (!dateInput.value) {
            alert('Сначала выберите дату');
            e.target.value = '';
            return;
        }

        const selectedDate = new Date(dateInput.value);
        const dayOfWeek = selectedDate.getDay();
        const time = e.target.value;

        // Convert time to minutes for easier comparison
        const [hours, minutes] = time.split(':').map(Number);
        const timeInMinutes = hours * 60 + minutes;

        // Monday-Friday: 9:00-18:00
        // Saturday: 9:00-13:00
        if (dayOfWeek >= 1 && dayOfWeek <= 5) {
            if (timeInMinutes < 540 || timeInMinutes > 1080) { // 9:00 = 540, 18:00 = 1080
                alert('Рабочие часы: Пн-Пт с 9:00 до 18:00');
                e.target.value = '';
            }
        } else if (dayOfWeek === 6) {
            if (timeInMinutes < 540 || timeInMinutes > 780) { // 9:00 = 540, 13:00 = 780
                alert('Рабочие часы: Суббота с 9:00 до 13:00');
                e.target.value = '';
            }
        }
    });
});

// Form validation
function validateForm(data) {
    if (!data.name || data.name.trim().length < 2) {
        alert('Пожалуйста, введите корректное имя');
        return false;
    }

    if (!data.phone || data.phone.length < 10) {
        alert('Пожалуйста, введите корректный номер телефона');
        return false;
    }

    if (!data.date) {
        alert('Пожалуйста, выберите дату');
        return false;
    }

    if (!data.time) {
        alert('Пожалуйста, выберите время');
        return false;
    }

    // Validate that date is not in the past
    const selectedDate = new Date(data.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
        alert('Нельзя выбрать дату в прошлом');
        return false;
    }

    return true;
}

// Show success message
function showSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    successMessage.classList.add('show');

    // Auto-hide after 5 seconds
    setTimeout(function() {
        closeSuccessMessage();
    }, 5000);
}

// Close success message
function closeSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    successMessage.classList.remove('show');
}

// Close success message when clicking outside
document.getElementById('successMessage')?.addEventListener('click', function(e) {
    if (e.target === this) {
        closeSuccessMessage();
    }
});

// Back to top functionality
let backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '↑';
backToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #2563eb;
    color: white;
    border: none;
    font-size: 24px;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
`;

document.body.appendChild(backToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.visibility = 'visible';
    } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.visibility = 'hidden';
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

backToTopBtn.addEventListener('mouseenter', () => {
    backToTopBtn.style.transform = 'scale(1.1)';
});

backToTopBtn.addEventListener('mouseleave', () => {
    backToTopBtn.style.transform = 'scale(1)';
});

console.log('Страница записи на приём загружена успешно!');
