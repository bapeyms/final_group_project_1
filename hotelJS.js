document.addEventListener('DOMContentLoaded', () => {

    const staysForm = document.getElementById('stays-form');
    if (!staysForm) return;

    const destinationInput = staysForm.querySelector('input[list="cities"]');
    const dateInputs = staysForm.querySelectorAll('input[type="date"]');
    const checkInInput = dateInputs[0];
    const checkOutInput = dateInputs[1];
    const guestsSelect = staysForm.querySelector('select');
    const searchBtn = staysForm.querySelector('.btn-show-flights');

    const today = new Date().toISOString().split('T')[0];

    checkInInput.min = today;
    checkOutInput.min = today;

    checkInInput.addEventListener('change', () => {
        checkOutInput.min = checkInInput.value;

        if (checkOutInput.value && checkOutInput.value < checkInInput.value) {
            checkOutInput.value = '';
        }
    });

    searchBtn.addEventListener('click', (e) => {
        e.preventDefault();

        let errors = [];

        if (!destinationInput.value) errors.push('Destination');
        if (!checkInInput.value) errors.push('Check-In Date');
        if (!checkOutInput.value) errors.push('Check-Out Date');
        if (!guestsSelect.value) errors.push('Rooms & Guests');

        if (errors.length > 0) {
            alert(
                'Please fill in the following fields:\n- ' +
                errors.join('\n- ')
            );
        } else {
            alert(
                `Searching places in ${destinationInput.value}
                From ${checkInInput.value} to ${checkOutInput.value}`
            );
        }
    });

    const promoLinks = document.querySelectorAll('.add-promo');
    promoLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const input = document.createElement('input');
            input.type = 'text';
            input.placeholder = 'PROMO CODE';
            input.className = 'clean-input';
            input.style.width = '140px';
            input.style.textAlign = 'center';

            link.replaceWith(input);
            input.focus();
        });
    });
});
