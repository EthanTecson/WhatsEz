// For creating a class
const classInput = document.getElementById("classInput");
const classIDInput = document.getElementById("IDInput");
const createClassResponse = document.getElementById("createClassResponse");
const button = document.getElementById("publishClassButton");

// For getting classes
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
                paragraph.textContent = item.class;
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

async function makeClass() {
    try {
        const response = await fetch('/api/records', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                class: classInput.value,
                id: classIDInput.value 
            })
    }) 

    createClassResponse.innerHTML = '';

    if (response.ok){
        console.log('Successfully created class');       
        createClassResponse.innerHTML = 'Successfully created class1';
    }
    } catch (error){
        console.error('Error with trying to publish class:', error);
        createClassResponse.innerHTML = 'Error with creating class. Please try again.';
    }
    
};


// Fetch Classes
document.getElementById("fetchRecordsButton").addEventListener('click', fetchClasses);

// Create Class
button.addEventListener('click',makeClass);