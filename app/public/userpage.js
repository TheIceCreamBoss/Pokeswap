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

// Login to specified User
async function login(event) {
    event.preventDefault();
    const tableElement = document.getElementById('userView');
    const tableBody = tableElement.querySelector('tbody');
    const emailValue = document.getElementById('loginEmail').value;
    const response = await fetch('/users/i', {
        method: 'GET',
        headers: {
            email: emailValue
        }
    });
    const responseData = await response.json();
    console.log(responseData);
    const user_id = responseData[0].user_id;
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
    showUserData(user_id);
}

//sign up
async function signup(event) {
    event.preventDefault();
    const emailValue = document.getElementById('insertEmail').value;
    const nameValue = document.getElementById('insertName').value;
    const phoneValue = document.getElementById('insertPhone').value;
    const visValue = document.getElementById('insertVisibility').value;

    const boolVal = visValue ? 1 : 0;

    const response = await fetch('/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: emailValue,
            name: nameValue,
            phone_num: phoneValue,
            profile_visibility: boolVal
        })
    });
    const responseData = await response.json();
    if (responseData.success) {
        fetchTableData();
        document.getElementById('insertEmail').value = "";
        document.getElementById('insertName').value = "";
        document.getElementById('insertPhone').value = "";
        document.getElementById('insertVisibility').checked = false;
    } else {
        alert("error!");
    }
}

// ---------------------------------------------------------------
// Initializes the webpage functionalities.
// Add or remove event listeners based on the desired functionalities.

window.onload = function() {
    console.log('window.onload has been called');
    checkDbConnection();
    fetchTableData();
    document.getElementById("userSignUp").addEventListener("submit", signup);
    document.getElementById("userLogin").addEventListener("submit", login);
};

// General function to refresh the displayed table data. 
// You can invoke this after any table-modifying operation to keep consistency.
function fetchTableData() {
    fetchAndDisplayUsers();
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

async function showUserData(user_id) {
    const bigDiv = document.getElementById('userData');
    bigDiv.style.visibility = "visible";

    const tableElement2 = document.getElementById('userCards');
    const tableBody2 = tableElement2.querySelector('tbody');

    const response2 = await fetch('/cards/i', {
        method: 'GET',
        headers: {
            user_id: user_id
        }
    });

    const responseData2 = await response2.json();

    // Always clear old, already fetched data before new fetching process.
    if (tableBody2) {
        tableBody2.innerHTML = '';
    }

    responseData2.forEach(post => {
        const row = tableBody2.insertRow();
        Object.values(post).forEach((field, index) => {
            const cell = row.insertCell(index);
            handleField(field, cell);
        });
    });
}