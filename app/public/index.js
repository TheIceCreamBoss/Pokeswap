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


// This function checks the database connection and updates its status on the frontend.
async function checkDbConnection() {
    const statusElem = document.getElementById('dbStatus');
    const loadingGifElem = document.getElementById('loadingGif');

    const response = await fetch('/check-db-connection', {
        method: "GET"
    });

    // Hide the loading GIF once the response is received.
    loadingGifElem.style.display = 'none';
    // Display the statusElem's text in the placeholder.
    statusElem.style.display = 'inline';

    response.json()
    .then((data) => {
        statusElem.textContent = data.text;
        console.log(data);
    })
    .catch((error) => {
        statusElem.textContent = 'connection timed out';  // Adjust error handling if required.
    });
}

// Fetches and Display Functions
async function fetchAndDisplayUsers() {
    const tableElement = document.getElementById('userTable');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/users', {
        method: 'GET'
    });

    const responseData = await response.json();

    // Always clear old, already fetched data before new fetching process.
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
async function fetchAndDisplayRatings() {
    const tableElement = document.getElementById('verifiedRatingTable');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/ratings', {
        method: 'GET'
    });

    const responseData = await response.json();

    // Always clear old, already fetched data before new fetching process.
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
    checkDbConnection();
    fetchTableData();
};

// General function to refresh the displayed table data. 
// You can invoke this after any table-modifying operation to keep consistency.
function fetchTableData() {
    fetchAndDisplayUsers();
    fetchAndDisplayRatings();
}

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