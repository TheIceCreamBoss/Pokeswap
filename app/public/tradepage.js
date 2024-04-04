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

// const { getSuperUsers } = require("../service/userService");


// nested aggre
async function getTradeAuthorInfo(event) {
    event.preventDefault();
    var coll = document.getElementById('tradeIDs').value;
    console.log(coll);

    const tableElement = document.getElementById('tradeAuthor');
    const tableBody = tableElement.querySelector('tbody');

    
    const response = await fetch('/trade/includedCardsA', {
        method: 'GET',
        headers: {
            trade_id: coll
        }
    });

    const responseData = await response.json()
    .catch((error) => {});
    
    console.log(responseData);
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
    



    event.preventDefault();
    var coll = document.getElementById('tradeIDs').value;
    console.log(coll);

     const recElement = document.getElementById('tradeRecipient');
     const recTableBody = recElement.querySelector('tbody');

    
     responseR = await fetch('/trade/includedCardsR', {
        method: 'GET',
        headers: {
            trade_id: coll
        }
    });

    responseRData = await responseR.json().catch((error) => {});
    
    console.log("R" + responseData);

    if (recTableBody) {
        recTableBody.innerHTML = '';
    }
    responseRData.forEach(post => {
        const row = recTableBody.insertRow();
        Object.values(post).forEach((field, index) => {
            const cell = row.insertCell(index);
            handleField(field, cell);
        });
    });

}


async function getTradeIDs() {
    const response = await fetch('/trade/getAllTradeID', {
        method: 'GET'
    });

    const responseData = await response.json();
    const coll = document.getElementById('tradeIDs');
    responseData.forEach(post => {
        const option = document.createElement('option');
        //give options an "options" class
        option.className = "dropdown-content";
        option.value = post.trade_id;
        option.text = post.trade_id;
        coll.appendChild(option);
    });
}


// ---------------------------------------------------------------
// Initializes the webpage functionalities.
// Add or remove event listeners based on the desired functionalities.

window.onload = function() {
    console.log('window.onload has been called');
    //getTradeAuthorInfo();
    //getTradeRecipientInfo();
    getTradeIDs();
    document.getElementById("selectTradeID").addEventListener("submit", getTradeAuthorInfo);
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