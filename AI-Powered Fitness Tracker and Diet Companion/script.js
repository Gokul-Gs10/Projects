document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("tracker-form");

    // Form validation
    form.addEventListener("submit", function (event) {
        const calories = document.getElementById("calories").value;
        const waterIntake = document.getElementById("water-intake").value;
        const macronutrients = document.getElementById("macronutrients").value;

        // Input validation: ensure numerical values for calories and water intake
        if (calories === "" || waterIntake === "" || isNaN(calories) || isNaN(waterIntake)) {
            alert("Please fill all fields correctly.");
            event.preventDefault();
        }
    });

    // Tooltips: Show tooltips when the user hovers over an input
    const tooltips = document.querySelectorAll('.tooltip');
    tooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseenter', () => {
            const tooltipText = tooltip.getAttribute('data-tooltip');
            const tooltipElement = document.createElement('div');
            tooltipElement.classList.add('tooltip-text');
            tooltipElement.innerText = tooltipText;
            tooltip.appendChild(tooltipElement);
        });

        tooltip.addEventListener('mouseleave', () => {
            const tooltipElement = tooltip.querySelector('.tooltip-text');
            if (tooltipElement) tooltip.removeChild(tooltipElement);
        });
    });

    // Pre-Filled Suggestions: Adding dropdowns for Exercise Type and Meal Type
    const exerciseTypeDropdown = document.getElementById('exercise-type');
    const mealTypeDropdown = document.getElementById('meal-type');

    const exerciseOptions = ['Cardio', 'Strength', 'Yoga', 'HIIT'];
    const mealOptions = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

    exerciseOptions.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.innerText = option;
        exerciseTypeDropdown.appendChild(optionElement);
    });

    mealOptions.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.innerText = option;
        mealTypeDropdown.appendChild(optionElement);
    });

    // Example: Data visualization for calories and water intake over time (replace with actual data)
    function generateChartData(id, label, data) {
        const chartData = {
            labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            datasets: [{
                label: label,
                data: data,
                backgroundColor: "rgba(231, 76, 60, 0.5)",
                borderColor: "rgba(231, 76, 60, 1)",
                borderWidth: 1
            }]
        };

        const ctx = document.getElementById(id).getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: chartData,
            options: {
                responsive: true,
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    }

    // Dummy data for charts
    generateChartData("calories-chart", "Calories Burned", [200, 150, 300, 250, 400]);
    generateChartData("water-chart", "Water Intake (Liters)", [2, 2.5, 2.8, 3, 3.2]);

    // Dark Mode Toggle Functionality
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });

    // Export Data as CSV
    const exportButton = document.getElementById('export-button');
    exportButton.addEventListener('click', () => {
        const data = [
            ["Date", "Calories", "Water Intake", "Macronutrients"],
            ["2024-11-25", "300", "2.5", "50g Protein, 60g Carbs, 20g Fat"],
            // Add dynamic data here
        ];

        const csv = data.map(row => row.join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'health-data.csv';
        link.click();
    });
});
document.getElementById('exercise-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const exerciseData = {
        exercise: document.getElementById('exercise').value,
        duration: document.getElementById('duration').value,
        caloriesBurned: document.getElementById('calories').value,
    };
    await fetch('http://localhost:5000/api/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(exerciseData),
    });
    fetchLoggedData();
});

document.getElementById('nutrition-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const nutritionData = {
        meal: document.getElementById('meal').value,
        caloriesIntake: document.getElementById('calories-intake').value,
        macros: document.getElementById('macros').value,
        mealCategory: document.getElementById('meal-category').value,
    };
    await fetch('http://localhost:5000/api/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nutritionData),
    });
    fetchLoggedData();
});

// Similarly, add event listeners for hydration and sleep forms

async function fetchLoggedData() {
    const response = await fetch('http://localhost:5000/api/data');
    const data = await response.json();

    const loggedDataContainer = document.getElementById('data-container');
    loggedDataContainer.innerHTML = '';
    data.forEach((entry) => {
        const div = document.createElement('div');
        div.innerHTML = `
            <p><strong>Exercise:</strong> ${entry.exercise || 'N/A'}</p>
            <p><strong>Calories Burned:</strong> ${entry.caloriesBurned || 'N/A'}</p>
            <p><strong>Meal:</strong> ${entry.meal || 'N/A'}</p>
            <p><strong>Diet Plan:</strong> ${entry.dietPlan || 'N/A'}</p>
            <hr>`;
        loggedDataContainer.appendChild(div);
    });
}

async function fetchDietPlan() {
    const response = await fetch('http://localhost:5000/api/diet');
    const { meal, dietPlan } = await response.json();

    const progressOverview = document.getElementById('progressChart');
    progressOverview.innerHTML = `
        <p><strong>Recommended Meal:</strong> ${meal}</p>
        <p><strong>Diet Plan:</strong> ${dietPlan}</p>`;
}

fetchLoggedData();
fetchDietPlan();