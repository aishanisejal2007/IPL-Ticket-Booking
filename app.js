
// ===== REUSABLE TOAST NOTIFICATION =====
function showToast(message) {
    let toast = document.getElementById("toast");

    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toast";

        toast.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: #101b3d;
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            font-size: 15px;
            z-index: 2000;
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


// ===== MAIN JAVASCRIPT FUNCTIONALITY =====
document.addEventListener("DOMContentLoaded", function () {

    // ===== HAMBURGER MENU =====
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", function () {
            navMenu.classList.toggle("show-menu");

            const isExpanded = navMenu.classList.contains("show-menu");

            menuToggle.setAttribute("aria-expanded", isExpanded);
            menuToggle.textContent = isExpanded ? "✕" : "☰";
        });

        navMenu.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                navMenu.classList.remove("show-menu");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.textContent = "☰";
            });
        });
    }


    // ===== TEAM FILTER =====
    const teamFilter = document.getElementById("teamFilter");

    if (teamFilter) {
        teamFilter.addEventListener("change", filterMatches);
    }


    // ===== GRID AND LIST VIEW =====
    const matchGrid = document.getElementById("matchGrid");
    const gridViewBtn = document.getElementById("gridViewBtn");
    const listViewBtn = document.getElementById("listViewBtn");

    if (matchGrid && gridViewBtn && listViewBtn) {

        gridViewBtn.addEventListener("click", function () {
            matchGrid.classList.remove("list-view");

            gridViewBtn.classList.add("active-view");
            listViewBtn.classList.remove("active-view");

            showToast("Grid view enabled!");
        });

        listViewBtn.addEventListener("click", function () {
            matchGrid.classList.add("list-view");

            listViewBtn.classList.add("active-view");
            gridViewBtn.classList.remove("active-view");

            showToast("List view enabled!");
        });
    }


    // ===== SMOOTH SCROLLING AND BOOK BUTTONS =====
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


    // ===== TICKET PRICES =====
    const prices = {
        General: 800,
        Premium: 1500,
        VIP: 3000
    };


    // ===== BOOKING FORM =====
    const bookingForm = document.getElementById("bookingForm");

    if (!bookingForm) return;


    // ===== UPDATE BOOKING SUMMARY =====
    function updateSummary(showNotification = false) {

        const match = document.getElementById("match").value;
        const stand = document.getElementById("stand").value;

        const quantity =
            Number(document.getElementById("quantity").value) || 0;

        const price = prices[stand] || 0;
        const total = price * quantity;

        document.getElementById("summaryMatch").textContent =
            match || "Not selected";

        document.getElementById("summaryStand").textContent =
            stand || "Not selected";

        document.getElementById("summaryPrice").textContent = price;

        document.getElementById("summaryQuantity").textContent = quantity;

        document.getElementById("total").textContent = total;

        if (showNotification) {
            showToast("Booking summary updated!");
        }
    }


    // Update summary when form values change
    document.getElementById("match").addEventListener("change", function () {
        updateSummary(true);
    });

    document.getElementById("stand").addEventListener("change", function () {
        updateSummary(true);
    });

    document.getElementById("quantity").addEventListener("change", function () {
        updateSummary(true);
    });


    // ===== SAVE BOOKING IN TABLE =====
    bookingForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const match = document.getElementById("match").value;
        const stand = document.getElementById("stand").value;
        const quantity = Number(document.getElementById("quantity").value);
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
    });


    // Initial booking summary
    updateSummary();

});


// ===== TEAM FILTER FUNCTION =====
function filterMatches() {

    const filter = document.getElementById("teamFilter").value;

    const cards = document.querySelectorAll(".match-card");

    cards.forEach(function (card) {

        const teams = card.dataset.teams;

        card.style.display =
            filter === "all" || teams.includes(filter) ? "" : "none";

    });
}
