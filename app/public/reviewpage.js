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
async function fetchAndDisplayAboveAverage(event) {
    event.preventDefault();
    var inq = document.getElementById('ineq').value;
    console.log('hi :3');

    if (inq == "geq") {
        inq = ">=";
    } else if (inq == "eq") {
        inq = "=";
    } else {
        inq = "<=";
    }

    const tableElement = document.getElementById('aboveAverageTable');
    const tableBody = tableElement.querySelector('tbody');
    console.log(inq);
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