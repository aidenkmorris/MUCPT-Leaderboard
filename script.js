// Aiden K Morris

const gid = '0';
const url = `https://docs.google.com/spreadsheets/d/e/2PACX-1vRalblJxEHYlzUrz-M5SgcW8rKal9oBQ7jCz5AcCpPOHmkHA0anngeugPfzBqDyZVtOPajwETKr8MbO/pub?output=csv`;

// Fetch leaderboard data from the public Google Sheet link
async function loadLeaderboardData() {
    const res = await fetch(url);
    const csvText = await res.text();
    
    return csvText
        .replaceAll('\r', '')
        .split('\n')
        .map(row => row.split(','));    
}

// Create a table row
// cellType is used to create both td or th elements
function createTableRow(rowData, cellType = "td") {
    let row = document.createElement("tr");

    rowData.forEach(e => {
        let td = document.createElement(cellType);
        td.textContent = e;
        row.appendChild(td);
    });

    return row;
}

// Load the table with data
function loadTable(rows) {
    // Determines if it is the first row
    let first = true;

    let div = document.getElementById("leaderboard");
    let table = document.createElement("table");

    rows.forEach(r => {
        // If it is the first row, make the cells headers
        if(first) {
            table.appendChild(createTableRow(r, "th"));
            first = false;
        }
        // Otherwise, make the cells regular table data
        else {
            table.appendChild(createTableRow(r));
        }
    });

    div.appendChild(table);
}

async function main() {
    const rows = await loadLeaderboardData();
    
    // For debugging
    console.log(rows);

    loadTable(rows)
}

main();