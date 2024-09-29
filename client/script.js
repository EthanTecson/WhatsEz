function fetchRecords() {
    fetch('/api/records')
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
}

document.getElementById("fetchRecordsButton").addEventListener('click', fetchRecords);