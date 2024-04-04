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

async function fetchAndDisplayPokemonCards(event) {
    event.preventDefault();
    const tableElement = document.getElementById('pokemonCards');
    const tableHeader = tableElement.querySelector('thead');
    const tableBody = tableElement.querySelector('tbody');

    var info_id = document.getElementById("info_id").checked ? 1 : 0;
    var collection = document.getElementById("collection").checked ? 1 : 0;
    var pokemon = document.getElementById("pokemon").checked ? 1 : 0;
    var card_description = document.getElementById("card_description").checked ? 1 : 0;
    var hp = document.getElementById("hp").checked ? 1 : 0;
    var gxcard = document.getElementById("gxcard").checked ? 1 : 0;
    var type = document.getElementById("type").checked ? 1 : 0;



    var checkedCount = 0;
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            checkedCount++;
        }
    });


    const response = await fetch('/cardTypes/pokemon', {
        method: 'GET',
        headers: {
            info_id: info_id,
            collection: collection,
            pokemon: pokemon,
            card_description: card_description,
            hp: hp,
            gxcard: gxcard,
            type: type
        }
    });

    const responseData = await response.json();

    if (tableBody) {
        tableBody.innerHTML = '';
    }

    if (tableHeader) {
        tableHeader.innerHTML = "";
    }

    if (info_id == 1) {
        const th = document.createElement("th");
        th.textContent = "info_id";
        tableHeader.appendChild(th);
    }
    if (collection == 1) {
        const th = document.createElement("th");
        th.textContent = "collection";
        tableHeader.appendChild(th);
    }
    if (pokemon == 1) {
        const th = document.createElement("th");
        th.textContent = "pokemon";
        tableHeader.appendChild(th);
    }
    if (card_description == 1) {
        const th = document.createElement("th");
        th.textContent = "card_description";
        tableHeader.appendChild(th);
    }
    if (hp == 1) {
        const th = document.createElement("th");
        th.textContent = "hp";
        tableHeader.appendChild(th);
    }
    if (gxcard == 1) {
        const th = document.createElement("th");
        th.textContent = "gxcard";
        tableHeader.appendChild(th);
    }
    if (type == 1) {
        const th = document.createElement("th");
        th.textContent = "type";
        tableHeader.appendChild(th);
    }


    responseData.forEach(post => {
        const row = tableBody.insertRow();
        Object.values(post).forEach((field, index) => {
            const cell = row.insertCell(index);
            handleField(field, cell);
        });
    });
}


window.onload = function() {
    console.log('window.onload has been called');
    document.getElementById("projections").addEventListener("submit", fetchAndDisplayPokemonCards);
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