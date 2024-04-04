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

var global_id = null;
var global_email = null;
var global_name = null;
var global_phone = null;
var global_vis = 0;

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
    const responseData = await response.json()
    .catch((error) => {
        alert("Email not found.");
    });
    console.log(responseData);
    global_id = responseData[0].user_id;
    global_email = emailValue;
    global_phone = responseData[0].phone_num;
    global_vis = responseData[0].profile_visibility.data[0] ? 1 : 0;
    console.log(global_vis);
    global_name = responseData[0].name;
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
    showUserData();
}

//sign up
async function signup(event) {
    event.preventDefault();
    const emailValue = document.getElementById('insertEmail').value;
    const nameValue = document.getElementById('insertName').value;
    const phoneValue = document.getElementById('insertPhone').value;
    const visValue = document.getElementById('insertVisibility').checked;
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
    const responseData = await response.json()
    .catch((error) => {
        alert("Error in Creating User.");
    });
    if (responseData.success) {
        alert("Successfully Created User.");
        fetchTableData();
        document.getElementById('insertEmail').value = "";
        document.getElementById('insertName').value = "";
        document.getElementById('insertPhone').value = "";
        document.getElementById('insertVisibility').checked = false;
    }
}

//update user
async function updateUser(event) {
    event.preventDefault();
    const nameValue = document.getElementById('newName').value;
    const emailValue = document.getElementById('newEmail').value;
    const phoneValue = document.getElementById('newPhone').value;
    const visValue = document.getElementById('newVis').checked;
    const boolVal = visValue ? 1 : 0;

    const response = await fetch('/users', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id: global_id,
            email: emailValue,
            name: nameValue,
            phone_num: phoneValue,
            profile_visibility: boolVal
        })
    });
    const responseData = await response.json()
    .catch((error) => {
        alert("Error whiile updating user.");
        document.getElementById('newEmail').value = global_email;
    });
    if (responseData.success) {
        alert("Successfully Updated User");
        fetchTableData();
        document.getElementById('loginEmail').value = emailValue;
        const tableElement = document.getElementById('userView');
        const tableBody = tableElement.querySelector('tbody');
        const response = await fetch('/users/i', {
            method: 'GET',
            headers: {
                email: emailValue
            }
        });
        const responseData = await response.json();
        global_id = responseData[0].user_id;
        global_email = emailValue;
        global_phone = responseData[0].phone_num;
        global_vis = responseData[0].profile_visibility.data[0] ? 1 : 0;
        global_name = responseData[0].name;
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
}

async function deleteUser(event) {
    event.preventDefault();
    const response = await fetch('/users', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id: global_id,
        })
    });

    const responseData = await response.json()
    .catch((error) => {
        alert("Error in Deleting User.");
    });
    if (responseData.success) {
        alert("Successfully Deleted User.");
        global_id = null;
        global_phone = null;
        global_name = null;
        global_vis = 0;
        location.reload();
    }
}

async function havingQuery(event) {
    event.preventDefault();
    const ineq = document.getElementById('havingIneq').value;
    const num = document.getElementById('havingNum').value;
    const psaTable = document.getElementById('psaGroupTable');
    const psaTableBody = psaTable.querySelector('tbody');

    if (ineq == "none") {
        const psaRes = await fetch('/users/groupByPSA', {
            method: 'GET',
            headers: {
                user_id: global_id
            }
        });
    
        const psaResData = await psaRes.json().catch((error) => {
            alert("Error while fetching cards.");
        });
    
        // Always clear old, already fetched data before new fetching process.
        if (psaTableBody) {
            psaTableBody.innerHTML = '';
        }
    
        psaResData.forEach(post => {
            const row = psaTableBody.insertRow();
            Object.values(post).forEach((field, index) => {
                const cell = row.insertCell(index);
                handleField(field, cell);
            });
        });
    } else {
        const psaRes = await fetch('/users/groupByPSAHaving', {
            method: 'GET',
            headers: {
                user_id: global_id,
                inequality: ineq,
                filter: num
            }
        });

        const psaResData = await psaRes.json().catch((error) => {
            alert("Please specify the card count.");
        });

        // Always clear old, already fetched data before new fetching process.
        if (psaTableBody) {
            psaTableBody.innerHTML = '';
        }

        psaResData.forEach(post => {
            const row = psaTableBody.insertRow();
            Object.values(post).forEach((field, index) => {
                const cell = row.insertCell(index);
                handleField(field, cell);
            });
        });
    }
}
// ---------------------------------------------------------------
// Initializes the webpage functionalities.
// Add or remove event listeners based on the desired functionalities.

window.onload = function() {
    console.log('window.onload has been called');
    fetchTableData();
    document.getElementById("userSignUp").addEventListener("submit", signup);
    document.getElementById("userLogin").addEventListener("submit", login);
    document.getElementById("userUpdate").addEventListener("submit", updateUser);
    document.getElementById("userDelete").addEventListener("submit", deleteUser);
    document.getElementById("havingSelection").addEventListener("submit", havingQuery);
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

async function showUserData() {
    const bigDiv = document.getElementById('userData');
    bigDiv.style.visibility = "visible";

    const tableElement2 = document.getElementById('userCards');
    const tableBody2 = tableElement2.querySelector('tbody');

    const response2 = await fetch('/cards/i', {
        method: 'GET',
        headers: {
            user_id: global_id
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

    const psaTable = document.getElementById('psaGroupTable');
    const psaTableBody = psaTable.querySelector('tbody');

    const psaRes = await fetch('/users/groupByPSA', {
        method: 'GET',
        headers: {
            user_id: global_id
        }
    });

    const psaResData = await psaRes.json();

    // Always clear old, already fetched data before new fetching process.
    if (psaTableBody) {
        psaTableBody.innerHTML = '';
    }

    psaResData.forEach(post => {
        const row = psaTableBody.insertRow();
        Object.values(post).forEach((field, index) => {
            const cell = row.insertCell(index);
            handleField(field, cell);
        });
    });

    document.getElementById('newName').value = global_name;
    document.getElementById('newPhone').value = global_phone;
    document.getElementById('newEmail').value = global_email;
    if (global_vis == 1) {
        document.getElementById('newVis').checked = true;
    } else {
        document.getElementById('newVis').checked = false;
    }
}