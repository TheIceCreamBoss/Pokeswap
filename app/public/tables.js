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
async function fetchAndDisplayCards() {
    const tableElement = document.getElementById('cardsTable');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/cards', {
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
async function fetchAndDisplayCardType() {
    const tableElement = document.getElementById('cardTypeTable');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/cardTypes', {
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
async function fetchAndDisplayPO() {
    const tableElement = document.getElementById('table_po');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/cardTypes/p', {
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
async function fetchAndDisplayPO2() {
    const tableElement = document.getElementById('table_po2');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/cardTypes/p2', {
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
async function fetchAndDisplayTR() {
    const tableElement = document.getElementById('table_tr');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/cardTypes/t', {
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
async function fetchAndDisplayTR2() {
    const tableElement = document.getElementById('table_tr2');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/cardTypes/t2', {
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
async function fetchAndDisplayEN() {
    const tableElement = document.getElementById('table_en');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/cardTypes/e', {
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
async function fetchAndDisplayEN2() {
    const tableElement = document.getElementById('table_en2');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/cardTypes/e2', {
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
async function fetchAndDisplayComments() {
    const tableElement = document.getElementById('commentTable');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/comments', {
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
async function fetchAndDisplayPosts() {
    const tableElement = document.getElementById('postTable');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/posts', {
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
async function fetchAndDisplayTrades() {
    const tableElement = document.getElementById('tradeTable');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/trade', {
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
async function fetchAndDisplayTradeCards() {
    const tableElement = document.getElementById('tradeCardTable');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/trade/c', {
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


// ---------------------------------------------------------------
// Initializes the webpage functionalities.
// Add or remove event listeners based on the desired functionalities.

window.onload = function() {
    console.log('window.onload has been called');
    fetchTableData();
};

// General function to refresh the displayed table data. 
// You can invoke this after any table-modifying operation to keep consistency.
function fetchTableData() {
    fetchAndDisplayUsers();
    fetchAndDisplayRatings();
    fetchAndDisplayCards();
    fetchAndDisplayCardType();
    fetchAndDisplayPO();
    fetchAndDisplayPO2();
    fetchAndDisplayTR();
    fetchAndDisplayTR2();
    fetchAndDisplayEN();
    fetchAndDisplayEN2();
    fetchAndDisplayComments();
    fetchAndDisplayPosts();
    fetchAndDisplayRates();
    fetchAndDisplayTrades();
    fetchAndDisplayTradeCards();
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