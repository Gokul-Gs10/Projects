# 🧠 Fault Detection and Diagnosis using HMM and RNN

## 📘 Overview
This project implements a **hybrid machine learning model** for fault detection and diagnosis in sensor-based environments. It combines **Hidden Markov Models (HMM)** for sequence modeling and **Recurrent Neural Networks (RNN)** for classification.

The system uses environmental sensor data (such as temperature, humidity, and light) to identify and diagnose faults based on occupancy status.

---

## ⚙️ Features
- Data preprocessing and feature scaling using `scikit-learn`
- Sequence modeling using **Gaussian HMM**
- Time-series classification using **RNN (SimpleRNN)**
- Dual-stage prediction:
  - **Fault Detection:** Determines if a fault exists
  - **Fault Diagnosis:** Identifies the type or cause of the fault
- Performance evaluation using accuracy, confusion matrix, and classification report
- Visualization of results using **Matplotlib** and **Seaborn**

---

## 📂 Dataset
The project uses:
- `datatraining.txt`
- `datatest.txt`

Each file contains environmental readings with columns like:
- Temperature  
- Humidity  
- Light  
- CO₂  
- Humidity Ratio  
- Occupancy  

The **Occupancy** column is used to label data for both detection and diagnosis.

---

## 🧩 Model Architecture

### 1. Hidden Markov Model (HMM)
- Built using `hmmlearn`
- Models temporal dependencies between sensor readings
- Used for generating hidden states for both detection and diagnosis

### 2. Recurrent Neural Network (RNN)
- Implemented using **TensorFlow Keras**
- Layers:
  - `SimpleRNN`
  - `Dense` (Output layer)
- Trained on normalized sequences derived from HMM outputs

---

## 🧰 Installation

```bash
pip install pandas numpy scikit-learn hmmlearn tensorflow matplotlib seaborn
```

---

## ▶️ Usage

1. Open the notebook in Jupyter or Google Colab  
2. Upload your dataset files (`datatraining.txt`, `datatest.txt`)  
3. Run all cells sequentially  
4. View the generated accuracy metrics and confusion matrices

---

## 📈 Evaluation Metrics
- Accuracy Score  
- Confusion Matrix  
- Classification Report  

The results are visualized for better interpretability of model performance.

---

## 🧪 Example Workflow
1. Load datasets and preprocess
2. Train HMMs for both detection and diagnosis
3. Generate hidden states and feed them into RNN
4. Evaluate predictions
5. Visualize confusion matrix and performance metrics

---

## 📊 Visualization
- Confusion Matrix heatmaps
- Accuracy and loss trends (if plotted)
- Hidden state transitions (optional for HMM analysis)

---

## 🧑‍💻 Technologies Used
- **Python 3.x**
- **Pandas, NumPy** — Data manipulation
- **scikit-learn** — Preprocessing and evaluation
- **hmmlearn** — Hidden Markov Model
- **TensorFlow / Keras** — RNN implementation
- **Matplotlib, Seaborn** — Visualization

---

## 📄 File Structure

```
mat_final.ipynb
datatraining.txt
datatest.txt
README.md
```

---

## 🚀 Future Improvements
- Replace SimpleRNN with LSTM or GRU for better sequence learning
- Add automated hyperparameter tuning
- Extend to multi-sensor fault scenarios
- Integrate real-time fault detection pipeline

---

## 🧑 Author
**Gokul** — Full Stack Developer & Machine Learning Enthusiast  

If you use or modify this project, please give credit to the author.
