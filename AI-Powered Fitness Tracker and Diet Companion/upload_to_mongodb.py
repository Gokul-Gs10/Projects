from pymongo import MongoClient
import pandas as pd

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")  # Replace with your MongoDB URI
db = client['health_tracker']  # Database name
collection = db['health_data']  # Collection name

# Load the dataset
df = pd.read_csv("health_tracker_dataset.csv")

# Convert DataFrame to dictionary and insert into MongoDB
data_dict = df.to_dict(orient="records")
collection.insert_many(data_dict)

print("Dataset successfully uploaded to MongoDB!")
