/*
 * These functions below are for various webpage functionalities. 
 * Each function serves to process data on the frontend:
 *      - Before sending requests to the backend.
 *      - After receiving responses from the backend.
 * 
 * To tailor them to your specific needs,
 * adjust or expand these functions to match both your 
 *   backend endpoints 
 * and 
 *   HTML structure.
 * 
 */

async function fetchAndDisplayRates() {
    const tableElement = document.getElementById('rateTable');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/rates', {
        method: 'GET'
    });

    const responseData = await response.json();

    if (tableBody) {
        tableBody.innerHTML = '';
    }
    responseData.forEach(post => {
        const row = tableBody.insertRow();
        Object.values(post).forEach((field, index) => {
            const cell = row.insertCell(index);
            handleField(field, cell);
        });
    });
}

async function createReview(event) {
    event.preventDefault();
    const starCount = document.getElementById('numStars').value;
    const desc = document.getElementById('insertDescription').value;
    const authID = document.getElementById('rateAuthorSelect').value;
    const reciID = document.getElementById('rateRecipientSelect').value;
    const response = await fetch('/rates', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            star_count: starCount,
            description: desc,
            rate_author_id: authID,
            rate_recipient_id: reciID
        })
    });
    const responseData = await response.json();
    if (responseData.success) {
        fetchAndDisplayRates();
        getAvgs();
    } else {
        alert("error!");
    }
}


// nested aggre
async function fetchAndDisplayAboveAverage(event) {
    event.preventDefault();
    var inq = document.getElementById('ineq').value;

    if (inq == "geq") {
        inq = ">=";
    } else if (inq == "eq") {
        inq = "=";
    } else {
        inq = "<=";
    }

    const tableElement = document.getElementById('aboveAverageTable');
    const tableBody = tableElement.querySelector('tbody');
    const response = await fetch('/rates/averageRatings/inequalityNested', {
        method: 'GET',
        headers: {
            inequality: inq
        }
    });

    const responseData = await response.json();

    if (tableBody) {
        tableBody.innerHTML = '';
    }
    responseData.forEach(post => {
        const row = tableBody.insertRow();
        Object.values(post).forEach((field, index) => {
            const cell = row.insertCell(index);
            handleField(field, cell);
        });
    });
}

// ---------------------------------------------------------------
// Initializes the webpage functionalities.
// Add or remove event listeners based on the desired functionalities.

window.onload = function() {
    console.log('window.onload has been called');
    getIDs();
    getAvgs();
    fetchAndDisplayRates();
    document.getElementById("filter").addEventListener("submit", fetchAndDisplayAboveAverage);
    document.getElementById("addReview").addEventListener("submit", createReview);
};


function handleField(field, cell) {
    if (typeof field === 'object') {
        if (field === null) {
            cell.textContent = 'NULL';
        } else {
            cell.textContent = field.data[0] ? 'true' : 'false';
        }
    } else {
        cell.textContent = field;
    }
}

async function getIDs() {
    const authDropdown = document.getElementById('rateAuthorSelect');
    const reciDropdown = document.getElementById('rateRecipientSelect');

    authDropdown.innerHTML = '';
    reciDropdown.innerHTML = '';

    const response = await fetch('/users', {
        method: 'GET'
    });

    const responseData = await response.json();
    responseData.forEach(user => {
        var optionAuth = document.createElement('option');
        optionAuth.text = user.user_id;
        optionAuth.value = user.user_id;
        authDropdown.add(optionAuth);

        var optionReci = document.createElement('option');
        optionReci.text = user.user_id;
        optionReci.value = user.user_id;
        reciDropdown.add(optionReci);
    });
}

async function getAvgs() {
    const text = document.getElementById('averageRatingNow');

    text.innerHTML = '';

    const response = await fetch('/rates/averageRatings', {
        method: 'GET'
    });

    const responseData = await response.json();
    console.log(responseData);
    text.innerHTML = responseData[0].avg;
}