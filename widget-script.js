function createForm(restaurantPaths, title) {
    const formDiv = document.getElementById("reservationForm");

    const formTitle = document.createElement("h2");
    formTitle.innerText = title;

    // If more than one restaurant, create the dropdown, else hide it and use the only restaurant
    let selectedRestaurantUrl;
    if (restaurantPaths.length > 1) {
        // Dropdown for selecting the restaurant
        const restaurantLabel = document.createElement("label");
        restaurantLabel.setAttribute("for", "restaurant");
        restaurantLabel.innerText = "Select Restaurant:";
        const restaurantSelect = document.createElement("select");
        restaurantSelect.id = "restaurant";
        restaurantSelect.required = true;

        // Populate the dropdown with restaurant options
        restaurantPaths.forEach(restaurant => {
            const option = document.createElement("option");
            option.value = restaurant.url;
            option.innerText = restaurant.restaurantName;
            restaurantSelect.appendChild(option);
        });

        // Append the restaurant dropdown to the form
        formDiv.appendChild(restaurantLabel);
        formDiv.appendChild(restaurantSelect);

        // Set selected restaurant URL based on dropdown
        selectedRestaurantUrl = restaurantSelect.value;
        restaurantSelect.addEventListener('change', function () {
            selectedRestaurantUrl = restaurantSelect.value;
        });
    } else {
        // If only one restaurant, use it and hide the selector
        selectedRestaurantUrl = restaurantPaths[0].url;
    }

    // Date Input
    const dateLabel = document.createElement("label");
    dateLabel.setAttribute("for", "date");
    dateLabel.innerText = "Select Date:";
    const dateInput = document.createElement("input");
    dateInput.type = "date";
    dateInput.id = "date";
    dateInput.required = true;

    // Set min date to tomorrow
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const formattedDate = tomorrow.toISOString().split('T')[0];
    dateInput.min = formattedDate;

    // Time Input with minute restriction
    const timeLabel = document.createElement("label");
    timeLabel.setAttribute("for", "time");
    timeLabel.innerText = "Select Time:";
    const timeInput = document.createElement("input");
    timeInput.type = "time";
    timeInput.id = "time";
    timeInput.required = true;

    timeInput.addEventListener('change', function () {
        let timeValue = timeInput.value;
        if (timeValue) {
            let [hours, minutes] = timeValue.split(':');
            minutes = Math.round(minutes / 15) * 15;
            if (minutes === 60) {
                minutes = 0;
                hours = (parseInt(hours) + 1).toString().padStart(2, '0');
            }
            timeInput.value = `${hours}:${minutes.toString().padStart(2, '0')}`;
        }
    });

    // Guests Input
    const guestsLabel = document.createElement("label");
    guestsLabel.setAttribute("for", "guests");
    guestsLabel.innerText = "Number of Guests:";
    const guestsInput = document.createElement("input");
    guestsInput.type = "number";
    guestsInput.id = "guests";
    guestsInput.min = "2";
    guestsInput.value = "2";
    guestsInput.required = true;

    // Submit Button
    const submitButton = document.createElement("button");
    submitButton.innerText = "Continue";
    submitButton.onclick = function () {
        constructUrlAndRedirect(selectedRestaurantUrl);
    };

    // Append remaining elements to the form div
    formDiv.appendChild(dateLabel);
    formDiv.appendChild(dateInput);
    formDiv.appendChild(timeLabel);
    formDiv.appendChild(timeInput);
    formDiv.appendChild(guestsLabel);
    formDiv.appendChild(guestsInput);
    formDiv.appendChild(submitButton);
}

function constructUrlAndRedirect(restaurantUrl) {
    const baseUrl = restaurantUrl;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const guests = document.getElementById("guests").value;

    if (date && time && guests) {
        const fullUrl = `${baseUrl}?date=${encodeURIComponent(date)} ${encodeURIComponent(time)}&time=${time}&guests=${guests}`;
        window.open(fullUrl, '_blank');
    } else {
        alert("Please fill in all fields.");
    }
}

window.onload = function() {
    createForm(restaurantPaths, title);
};
