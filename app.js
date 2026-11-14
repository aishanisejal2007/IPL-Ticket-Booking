
// Reusable Toast Notification Function
function showToast(message) {

    let toast = document.getElementById("toast");

    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toast";

        toast.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: #101c3a;
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            font-size: 15px;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.4s ease;
        `;

        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.style.opacity = "1";

    clearTimeout(window.toastTimer);

    window.toastTimer = setTimeout(function () {
        toast.style.opacity = "0";
    }, 2500);
}


// Main JavaScript Functionality
document.addEventListener("DOMContentLoaded", function () {

    // Smooth Scrolling and Toast Notification
    const bookButtons = document.querySelectorAll(".book-btn");

    bookButtons.forEach(function (button) {

        button.addEventListener("click", function (event) {

            event.preventDefault();

            const bookingSection = document.getElementById("booking");

            if (bookingSection) {

                bookingSection.scrollIntoView({
                    behavior: "smooth"
                });

                showToast("Taking you to the booking form!");
            }
        });
    });


    // Team Filter
    const teamFilter = document.getElementById("teamFilter");

    if (teamFilter) {
        teamFilter.addEventListener("change", filterMatches);
    }


    // Ticket Prices
    const prices = {
        General: 800,
        Premium: 1500,
        VIP: 3000
    };


    // Booking Form
    const bookingForm = document.getElementById("bookingForm");

    if (!bookingForm) return;


    // Update Booking Summary
    function updateSummary() {

        const match = document.getElementById("match").value;
        const stand = document.getElementById("stand").value;

        const quantity =
            Number(document.getElementById("quantity").value) || 0;

        const price = prices[stand] || 0;

        document.getElementById("summaryMatch").textContent =
            match || "Not selected";

        document.getElementById("summaryStand").textContent =
            stand || "Not selected";

        document.getElementById("summaryPrice").textContent = price;

        document.getElementById("summaryQuantity").textContent = quantity;

        document.getElementById("total").textContent = price * quantity;
    }


    bookingForm.addEventListener("input", updateSummary);


    // Save Booking in Table
    bookingForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const match = document.getElementById("match").value;
        const stand = document.getElementById("stand").value;

        const quantity =
            Number(document.getElementById("quantity").value);

        const name = document.getElementById("name").value;

        const amount = prices[stand] * quantity;

        const table = document.getElementById("bookingRecords");

        if (table.querySelector("td[colspan]")) {
            table.innerHTML = "";
        }

        const row = table.insertRow();

        row.innerHTML = `
            <td>${Date.now()}</td>
            <td></td>
            <td></td>
            <td></td>
            <td>${quantity}</td>
            <td>₹${amount}</td>
        `;

        row.cells[1].textContent = name;
        row.cells[2].textContent = match;
        row.cells[3].textContent = stand;

        showToast("Booking added successfully!");

        bookingForm.reset();

        updateSummary();
    });


    updateSummary();

});


// Team Filter Function
function filterMatches() {

    const filter = document.getElementById("teamFilter").value;

    const rows = document.querySelectorAll("#matchTable tbody tr");

    rows.forEach(function (row) {

        const teams = row.dataset.teams;

        row.style.display =
            filter === "all" || teams.includes(filter) ? "" : "none";

    });
}
