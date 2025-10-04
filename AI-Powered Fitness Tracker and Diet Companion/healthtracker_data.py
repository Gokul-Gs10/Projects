import pandas as pd
import random

# Define possible values for each parameter
exercise_types = ["Running", "Yoga", "Cycling", "Swimming", "Strength Training"]
meal_types = ["Breakfast", "Lunch", "Snack", "Dinner"]
macros_template = ["{}g Protein, {}g Carbs, {}g Fat"]
sleep_quality_levels = ["Excellent", "Good", "Fair", "Poor"]

# Vegetarian and non-vegetarian food options
veg_food_recommendations = [
    "Quinoa salad with chickpeas and veggies",
    "Lentil soup with whole-grain bread",
    "Tofu stir-fry with brown rice",
    "Vegetable curry with quinoa",
    "Avocado toast with seeds",
    "Greek yogurt with berries and granola",
    "Vegetable omelet with spinach"
]

non_veg_food_recommendations = [
    "Grilled chicken with quinoa and broccoli",
    "Baked salmon with sweet potato and spinach",
    "Scrambled eggs with turkey sausage",
    "Roasted turkey with wild rice and green beans",
    "Beef stir-fry with vegetables",
    "Shrimp and avocado salad",
    "Tuna sandwich with whole-grain bread"
]

# Function to generate random macros
def generate_macros():
    protein = random.randint(10, 50)  # grams
    carbs = random.randint(20, 100)  # grams
    fat = random.randint(5, 30)      # grams
    return macros_template[0].format(protein, carbs, fat)

# Function to generate a diet plan based on input
def generate_diet_plan(exercise_type, calories_burned, sleep_quality):
    if sleep_quality == "Poor":
        recommendation = "High-protein meal with energizing carbs."
    elif exercise_type in ["Running", "Cycling"]:
        recommendation = "Carb-heavy meal for recovery."
    elif exercise_type in ["Yoga", "Strength Training"]:
        recommendation = "Balanced meal with lean protein."
    else:
        recommendation = "Standard balanced diet."
    
    return recommendation

# Function to generate meal suggestions
def get_meal_suggestion(is_veg):
    food_list = veg_food_recommendations if is_veg else non_veg_food_recommendations
    return random.choice(food_list)

# Generate dataset
def generate_data(num_rows):
    data = []
    for _ in range(num_rows):
        exercise_type = random.choice(exercise_types)
        duration = random.randint(10, 120)  # minutes
        calories_burned = random.randint(50, 800)  # calories
        meal_type = random.choice(meal_types)
        calories_intake = random.randint(200, 1000)  # calories
        macros = generate_macros()
        water_intake = round(random.uniform(0.5, 3.5), 1)  # liters
        hours_slept = random.randint(4, 10)  # hours
        sleep_quality = random.choice(sleep_quality_levels)
        diet_plan = generate_diet_plan(exercise_type, calories_burned, sleep_quality)

        # Get both vegetarian and non-vegetarian meal suggestions
        veg_meal = get_meal_suggestion(is_veg=True)
        non_veg_meal = get_meal_suggestion(is_veg=False)

        # Append row to dataset
        data.append([
            exercise_type, duration, calories_burned,
            meal_type, calories_intake, macros,
            water_intake, hours_slept, sleep_quality, diet_plan, veg_meal, non_veg_meal
        ])
    return data

# Generate data
data = generate_data(5000)

# Combine and create DataFrame
columns = [
    "Exercise Type", "Duration (min)", "Calories Burned",
    "Meal Type", "Calories Intake", "Macros (Protein, Carbs, Fat)",
    "Water Intake (L)", "Hours Slept", "Sleep Quality", "Diet Plan",
    "Vegetarian Meal Suggestion", "Non-Vegetarian Meal Suggestion"
]

df = pd.DataFrame(data, columns=columns)

# Save to CSV file
df.to_csv("health_tracker_dataset.csv", index=False)

print("Dataset generated and saved.")
