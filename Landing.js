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
    const searchBtn = flightsForm.querySelector('.btn-show-flights');

    const dateInputs = flightsForm.querySelectorAll('input[type="date"]');
    const departDateInput = dateInputs[0];
    const returnDateInput = dateInputs[1];

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

    searchBtn.addEventListener('click', (e) => 
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
});