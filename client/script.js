const input = document.getElementById("classInput");
const output = document.getElementById("output");
const button = document.getElementById("inputButton")

function fetchRecords() {
    fetch('/api/records')
        .then(response => response.json())
        .then(data => {
            console.log(data);
        });
};

function makeRecord() {
    output.innerHTML = input.value;
};




document.getElementById("fetchRecordsButton").addEventListener('click', fetchRecords);
button.addEventListener('click',makeRecord);