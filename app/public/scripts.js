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

// Login to specified User
async function login(event) {
    event.preventDefault();
    const tableElement = document.getElementById('loginTable');
    const tableBody = tableElement.querySelector('tbody');
    const emailValue = document.getElementById('loginEmail').value;
    const response = await fetch('/users/i', {
        method: 'GET',
        headers: {
            email: emailValue
        }
    });
    const responseData = await response.json();
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

// // This function resets or initializes the demotable.
// async function resetUserTable() {
//     const response = await fetch("/initiate-demotable", {
//         method: 'POST'
//     });
//     const responseData = await response.json();

//     if (responseData.success) {
//         const messageElement = document.getElementById('resetResultMsg');
//         messageElement.textContent = "userTable initiated successfully!";
//         fetchTableData();
//     } else {
//         alert("Error initiating table!");
//     }
// }

// shows all tables
// async function showTables(event) {
//     event.preventDefault();
//     console.log('show tables')
//     window.location.href = '/tables';
// }

// // Updates names in the demotable.
// async function updateNameDemotable(event) {
//     event.preventDefault();

//     const oldNameValue = document.getElementById('updateOldName').value;
//     const newNameValue = document.getElementById('updateNewName').value;

//     const response = await fetch('/update-name-demotable', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             oldName: oldNameValue,
//             newName: newNameValue
//         })
//     });

//     const responseData = await response.json();
//     const messageElement = document.getElementById('updateNameResultMsg');

//     if (responseData.success) {
//         messageElement.textContent = "Name updated successfully!";
//         fetchTableData();
//     } else {
//         messageElement.textContent = "Error updating name!";
//     }
// }

// // Counts rows in the demotable.
// // Modify the function accordingly if using different aggregate functions or procedures.
// async function countDemotable() {
//     const response = await fetch("/count-demotable", {
//         method: 'GET'
//     });

//     const responseData = await response.json();
//     const messageElement = document.getElementById('countResultMsg');

//     if (responseData.success) {
//         const tupleCount = responseData.count;
//         messageElement.textContent = `The number of tuples in demotable: ${tupleCount}`;
//     } else {
//         alert("Error in count demotable!");
//     }
// }


// ---------------------------------------------------------------
// Initializes the webpage functionalities.
// Add or remove event listeners based on the desired functionalities.

window.onload = function() {
    console.log('window.onload has been called');
    checkDbConnection();
    fetchTableData();
    //document.getElementById("showTables").addEventListener("click", showTables);
    document.getElementById("userSignUp").addEventListener("submit", signup);
    document.getElementById("userLogin").addEventListener("submit", login);

    // document.getElementById("resetDemotable").addEventListener("click", resetDemotable);
    // document.getElementById("updataNameDemotable").addEventListener("submit", updateNameDemotable);
    // document.getElementById("countDemotable").addEventListener("click", countDemotable);
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

async function showUserData(user_id) {
    const bigDiv = document.getElementById('userCards');
    bigDiv.style.visibility = "visible";

    const tableElement = document.getElementById('userCards');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/cards/i', {
        method: 'GET',
        headers: {
            user_id: user_id
        }
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