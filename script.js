function revealOnScroll() {
    const reveals = document.querySelectorAll('.scroll-reveal');
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const revealTop = reveal.getBoundingClientRect().top;
        const revealPoint = 150;

        if (revealTop < windowHeight - revealPoint) {
            reveal.classList.add('revealed')
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

let currentRoomPrice = 0;

function openBookingModal(roomType, price) {
    document.getElementById('roomType').value = roomType;
    currentRoomPrice = price;
    document.getElementById('bookingModal').style.display = 'block';

    const today = new Date().toISOString().split('T')[0];
    document.getElementById('checkIn').setAttribute('min', today);
    document.getElementById('checkOut').setAttribute('min', today);

    calculateTotal();
}

function closeBookingModal() {
    document.getElementById('bookingModal').style.display = 'none';
}

function calculateTotal() {
    const checkIn = new Date(document.getElementById('checkIn').value);
    const checkOut = new Date(document.getElementById('checkOut').value);

    if (checkIn && checkOut && checkOut > checkIn) {
            const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
            const total = nights * currentRoomPrice;
            document.getElementById('totalPrice').textContent = `₴${total.toLocaleString()}`;
        } else {
            document.getElementById('totalPrice').textContent = '₴0';
    }
}

document.getElementById('checkIn').addEventListener('change', calculateTotal);
document.getElementById('checkOut').addEventListener('change', calculateTotal);

function showSuccessModal() {
    document.getElementById('successModal').style.display = 'block';

    setTimeout(() => {
        closeSuccessModal();
    }, 5000);
}

function closeSuccessModal() {
    document.getElementById('successModal').style.display = 'none';
}

document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    

    
    closeBookingModal();
    showSuccessModal();
    this.reset();
});

window.onclick = function(event) {
    const modal = document.getElementById('bookingModal');
    const successModal = document.getElementById('successModal');
    if (event.target === modal) {
        closeBookingModal();
    }
    if (event.target === successModal) {
        closeSuccessModal();
    }
}

window.addEventListener('load', revealOnScroll);
