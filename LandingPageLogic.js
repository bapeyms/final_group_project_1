document.addEventListener('DOMContentLoaded', () => 
{

    window.switchTab = function(tabName) 
    {
        document.getElementById('tab-flights').classList.remove('active');
        document.getElementById('tab-stays').classList.remove('active');
        document.getElementById('flights-form').classList.add('hidden');
        document.getElementById('stays-form').classList.add('hidden');
        document.getElementById('tab-' + tabName).classList.add('active');
        document.getElementById(tabName + '-form').classList.remove('hidden');
    };

    const flightsForm = document.getElementById('flights-form');
    const fromInput = flightsForm.querySelector('input[placeholder="From"]');
    const toInput = flightsForm.querySelector('input[placeholder="To"]');
    const tripTypeSelect = flightsForm.querySelector('select'); 
    const passengerInput = flightsForm.querySelector('input[type="number"]');
    const classSelect = flightsForm.querySelectorAll('select')[1]; 
    const searchFlightsBtn = flightsForm.querySelector('.btn-show-flights');

    const flightDateInputs = flightsForm.querySelectorAll('input[type="date"]');
    const departDateInput = flightDateInputs[0];
    const returnDateInput = flightDateInputs[1];

    const separator = flightsForm.querySelector('.separator'); 
    const today = new Date().toISOString().split('T')[0];

    departDateInput.min = today;
    returnDateInput.min = today; 

    departDateInput.addEventListener('change', function() 
    {
        const departDate = this.value;
        returnDateInput.min = departDate;

        if (returnDateInput.value && returnDateInput.value < departDate) 
        {
            returnDateInput.value = departDate;
        }
    });

    if (separator) 
    {
        separator.innerHTML = '&#8646;';
        separator.title = "Swap locations";
        separator.style.cursor = "pointer"; 
        
        separator.addEventListener('click', () => 
        {
            const temp = fromInput.value;
            fromInput.value = toInput.value;
            toInput.value = temp;
        });
    }

    function checkDestinations() 
    {
        if (fromInput.value && toInput.value) 
        {
            if (fromInput.value.trim().toLowerCase() === toInput.value.trim().toLowerCase()) 
            {
                alert("Destination cannot be the same as Origin.");
                toInput.value = '';
                toInput.focus();
            }
        }
    }

    fromInput.addEventListener('change', checkDestinations);
    toInput.addEventListener('change', checkDestinations);

    tripTypeSelect.addEventListener('change', (e) => 
    {
        if (e.target.value === 'oneway') 
        {
            returnDateInput.disabled = true;
            returnDateInput.value = '';
        } 
        else 
        {
            returnDateInput.disabled = false;
            if (departDateInput.value) 
            {
                returnDateInput.min = departDateInput.value;
            } 
            else 
            {
                returnDateInput.min = today;
            }
        }
    });

    searchFlightsBtn.addEventListener('click', (e) => 
    {
        let errors = [];
        if (!fromInput.value) errors.push("Origin City (From)");
        if (!toInput.value) errors.push("Destination City (To)");
        if (!departDateInput.value) errors.push("Departure Date");
        if (tripTypeSelect.value !== 'oneway' && !returnDateInput.value) 
        {
            errors.push("Return Date");
        }
        if (!passengerInput.value || passengerInput.value < 1) errors.push("Number of Passengers");
        if (!classSelect.value) errors.push("Travel Class");

        if (errors.length > 0) 
        {
            e.preventDefault();
            alert("Please fill in the following fields:\n- " + errors.join("\n- "));
        } 
        else 
        {
            alert("Searching flight from " + fromInput.value + " to " + toInput.value + "...");
        }
    });

    const staysForm = document.getElementById('stays-form');
    const destinationInput = staysForm.querySelector('input[list="cities"]');
    const stayDateInputs = staysForm.querySelectorAll('input[type="date"]');
    const checkInInput = stayDateInputs[0];
    const checkOutInput = stayDateInputs[1];
    const guestsSelect = staysForm.querySelector('select');
    const searchStaysBtn = staysForm.querySelector('.btn-show-flights');

    checkInInput.min = today;
    checkOutInput.min = today;

    checkInInput.addEventListener('change', function() 
    {
        const checkInDate = this.value;
        
        checkOutInput.min = checkInDate;

        if (checkOutInput.value && checkOutInput.value < checkInDate) 
        {
            checkOutInput.value = ''; 
        }
    });

    searchStaysBtn.addEventListener('click', (e) => 
    {
        let errors = [];

        if (!destinationInput.value) errors.push("Destination");
        if (!checkInInput.value) errors.push("Check-In Date");
        if (!checkOutInput.value) errors.push("Check-Out Date");
        if (!guestsSelect.value) errors.push("Rooms & Guests info");

        if (errors.length > 0) 
        {
            e.preventDefault();
            alert("Please fill in for Stays:\n- " + errors.join("\n- "));
        } 
        else 
        {
            alert(`Searching stays in ${destinationInput.value} from ${checkInInput.value} to ${checkOutInput.value}...`);
        }
    });

    const promoLinks = document.querySelectorAll('.add-promo');
    promoLinks.forEach(link => 
    {
        link.addEventListener('click', (e) => 
        {
            e.preventDefault();
            const input = document.createElement('input');
            input.type = 'text';
            input.placeholder = 'PROMO CODE';
            input.className = 'clean-input';
            input.style.borderBottom = '2px solid #8DD3BB';
            input.style.width = '140px'; 
            input.style.textAlign = 'center';
            link.parentNode.replaceChild(input, link);
            input.focus();
        });
    });

    const subscribeForm = document.querySelector('.subscribe-form');
    if (subscribeForm) 
    {
        subscribeForm.addEventListener('submit', (e) => 
        {
            e.preventDefault();
            const emailInput = subscribeForm.querySelector('input[type="email"]');
            if(emailInput.value) 
            {
                alert("You have successfully subscribed to our newsletter!");
                subscribeForm.reset();
            }
        });
    }

    const modal = document.getElementById("authModal");
    const closeBtn = document.getElementById("closeModal");
    const tabs = document.querySelectorAll(".auth-tab");
    const forms = document.querySelectorAll(".auth-form");
    
    document.querySelectorAll(".login-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            openModal("login");
        });
    });
    document.querySelectorAll(".sign-up-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            openModal("signup");
        });
    });
    
    function openModal(type) {
        modal.classList.add("active");
        switchTab(type);
    }
    
    closeBtn.addEventListener("click", () => {
        modal.classList.remove("active");
    });
    
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("active");
        }
    });
    
    function switchTab(type) {
        tabs.forEach(tab => {
            tab.classList.toggle("active", tab.dataset.form === type);
        });
        forms.forEach(form => {
            form.classList.toggle("active", form.id === type);
        });
    }
    
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            switchTab(tab.dataset.form);
        });
    });
});
