document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let formData = new FormData();
    formData.append('file', document.getElementById('fileInput').files[0]);

    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        displayResults(data);
    })
    .catch(error => console.error('Error:', error));
});

function displayResults(data) {
    let resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    // Display mistakes and corrections
    if (data.mistakes.length > 0) {
        resultsDiv.innerHTML += '<h2>Mistakes:</h2>';
        data.mistakes.forEach(mistake => {
            resultsDiv.innerHTML += `<p>${mistake}</p>`;
        });
    }

    if (data.corrections.length > 0) {
        resultsDiv.innerHTML += '<h2>Corrections:</h2>';
        data.corrections.forEach(correction => {
            resultsDiv.innerHTML += `<p>${correction}</p>`;
        });
    }
}
