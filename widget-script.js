function createForm(restaurantPath, title, environment) {
    const formDiv = document.getElementById("reservationForm");

    const formTitle = document.createElement("h2");
    formTitle.innerText = title;

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
    const formattedDate = tomorrow.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    dateInput.min = formattedDate;

    // Time Input
    const timeLabel = document.createElement("label");
    timeLabel.setAttribute("for", "time");
    timeLabel.innerText = "Select Time:";
    const timeInput = document.createElement("input");
    timeInput.type = "time";
    timeInput.id = "time";
    timeInput.required = true;

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
        constructUrlAndRedirect(restaurantPath, environment);
    };

    // Append elements to the form div
    formDiv.appendChild(formTitle);
    formDiv.appendChild(dateLabel);
    formDiv.appendChild(dateInput);
    formDiv.appendChild(timeLabel);
    formDiv.appendChild(timeInput);
    formDiv.appendChild(guestsLabel);
    formDiv.appendChild(guestsInput);
    formDiv.appendChild(submitButton);
}

function constructUrlAndRedirect(restaurantPath, environment) {
    let baseUrl;

    if (environment.toLowerCase() === 'live') {
        baseUrl = `https://rapid-res.com/restaurant/${restaurantPath}`;
    } else {
        baseUrl = `https://dev-organiser.rapid-res.dev/restaurant/${restaurantPath}`;
    }

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
