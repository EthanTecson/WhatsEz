const classInput = document.getElementById("classInput");
const classOutput = document.getElementById("classOutput");
const button = document.getElementById("postButton");

const fetchRecordsResponse = document.getElementById("fetchRecordsResponse");

async function fetchClasses() {
    try {
        const response = await fetch('/api/records');
        const data = await response.json();
        console.log(data);

        // Clear Previous Content
        fetchRecordsResponse.innerHTML = '';


        if (Array.isArray(data)) {
            data.forEach(item => {
                const paragraph = document.createElement('p');
                paragraph.textContent = JSON.stringify(item,null,2);
                fetchRecordsResponse.appendChild(paragraph);
            })
        } else {
            fetchRecordsResponse.textContent = JSON.stringify(item,null,2);
        }
    } catch (error) {
        console.error('Error Fetching Records:', error);
        fetchRecordsResponse.innerHTML = 'Error fetching records. Please try again.';
    }
};

function makeRecord() {
    classOutput.innerHTML = classInput.value;
};


// Fetch Classes
document.getElementById("fetchRecordsButton").addEventListener('click', fetchClasses);

// Create Class
button.addEventListener('click',makeRecord);