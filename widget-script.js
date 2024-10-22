function createForm(restaurantPath, title) {
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
        constructUrlAndRedirect(restaurantPath);
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

function constructUrlAndRedirect(restaurantPath) {
    const baseUrl = restaurantPath;
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
