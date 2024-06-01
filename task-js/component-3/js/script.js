(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('booking-form');

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const phone = document.getElementById('phone');
      const checkinDate = document.getElementById('checkin-date');
      const checkoutDate = document.getElementById('checkout-date');
      const adults = document.getElementById('adults');
      const children = document.getElementById('children');

      validatePhone(phone);

      validateDates(checkinDate, checkoutDate);

      validateGuests(adults, children);

    });
  });


  function validatePhone(input) {
    const regex = /^\+7[\s()-]*([0-9][\s()-]*){10}$/;

    const digits = input.value.replace(/\D/g, '');
    const isValid = regex.test(input.value) && digits.length === 11;

    validateField(input, isValid);
  }

  function validateDates(checkinInput, checkoutInput) {
    const dateFormat1 = /^\d{4}-\d{2}-\d{2}$/;
    const dateFormat2 = /^\d{2}\.\d{2}\.\d{4}$/;

    const checkinValue = checkinInput.value;
    const checkoutValue = checkoutInput.value;

    let checkinDate, checkoutDate;

    if (dateFormat1.test(checkinValue)) {
      checkinDate = new Date(checkinValue);
    } else if (dateFormat2.test(checkinValue)) {
      const [day, month, year] = checkinValue.split('.');
      checkinDate = new Date(`${year}-${month}-${day}`);
    }

    if (dateFormat1.test(checkoutValue)) {
      checkoutDate = new Date(checkoutValue);
    } else if (dateFormat2.test(checkoutValue)) {
      const [day, month, year] = checkoutValue.split('.');
      checkoutDate = new Date(`${year}-${month}-${day}`);
    }

    const isValid = checkinDate && checkoutDate && (checkoutDate - checkinDate) >= (4 * 24 * 60 * 60 * 1000);

    validateField(checkinInput, isValid);
    validateField(checkoutInput, isValid);
  }

  function validateField(input, isValid) {
    if (isValid) {
      input.classList.remove('field-error');
      input.classList.add('field-correct');
    } else {
      input.classList.remove('field-correct');
      input.classList.add('field-error');
    }
  }

  function validateGuests(adultsInput, childrenInput) {
    const adults = parseInt(adultsInput.value, 10) || 0;
    const children = parseInt(childrenInput.value, 10) || 0;
    const roomType = document.querySelector('input[name="room-type"]:checked').value;

    let isValid = true;

    if (adults < 1) {
      isValid = false;
    }
    if (children > adults) {
      isValid = false;
    }

    switch (roomType) {
      case 'single':
        if (adults > 1) {
          isValid = false;
        }
        break;
      case 'family':
        if (adults < 2 || children < 1) {
          isValid = false;
        }
        break;
    }

    validateField(adultsInput, isValid);
    validateField(childrenInput, isValid);
  }


})();
