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


// nested aggre
async function fetchAndDisplaySuperUsers(event) {
    event.preventDefault();
    var coll = document.getElementById('collections').value;
    console.log(coll);


    if (inq == "geq") {
        inq = ">=";
    } else if (inq == "eq") {
        inq = "=";
    } else {
        inq = "<=";
    }

    const tableElement = document.getElementById('userView');
    const tableBody = tableElement.querySelector('tbody');
    console.log(inq);

    const response = await fetch('/rates/users/getSuperUsers', {
        method: 'GET',
        headers: {
            collection: coll
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

async function getCollections() {
    const response = await fetch('/cardTypes/c', {
        method: 'GET'
    });

    const responseData = await response.json();
    const coll = document.getElementById('collections');
    responseData.forEach(post => {
        const option = document.createElement('option');
        option.value = post.collection;
        option.text = post.collection;
        coll.appendChild(option);
    });
}

// Fetches and Display Functions
async function fetchAndDisplayUsers() {
    const tableElement = document.getElementById('userView');
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

// ---------------------------------------------------------------
// Initializes the webpage functionalities.
// Add or remove event listeners based on the desired functionalities.

window.onload = function() {
    console.log('window.onload has been called');
    fetchAndDisplayUsers();
    getCollections();
    document.getElementById("filter").addEventListener("submit", fetchAndDisplayAboveAverage);
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