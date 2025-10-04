fetch('http://localhost:5000/api/data')
  .then(response => response.json())
  .then(data => {
    console.log(data); // Handle and display the data on your website
  })
  .catch(error => console.error('Error fetching data:', error));
