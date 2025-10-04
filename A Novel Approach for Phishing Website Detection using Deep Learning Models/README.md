# Phishing URL Detection using Deep Learning (CNN, RNN, and Hybrid Models)

## 🎯 Project Overview

This project implements and compares three different deep learning architectures—*Convolutional Neural Networks (CNN), **Recurrent Neural Networks (RNN) using LSTM layers, and a **Hybrid CNN-RNN model—for the binary classification of URLs into one of two categories: **Phishing* or *Legitimate*.

The core task is a form of natural language processing (NLP), where the URL strings are treated as sequential data. The performance of each model is evaluated based on its accuracy and classification report metrics on a held-out test set.

## 🛠️ Technologies and Libraries

  * *Language:* Python
  * *Deep Learning Framework:* TensorFlow/Keras
  * *Data Handling:* Pandas, NumPy
  * *Machine Learning Tools:* Scikit-learn (for splitting data and evaluation metrics)
  * *Visualization:* Matplotlib

## 📂 Project Structure


.
├── Dl_sip_final.ipynb      # Main Jupyter Notebook with all the code and results
├── dataset_phishing.csv    # The dataset containing URLs and their status (phishing/legitimate)
└── README.md               # This file


## ⚙️ Setup and Installation

1.  *Clone the Repository:*

    bash
    git clone [Your Repository URL]
    cd [Your Repository Folder]
    

2.  *Create a Virtual Environment (Recommended):*

    bash
    python -m venv venv
    # Activate the environment
    # Windows:
    .\venv\Scripts\activate
    # macOS/Linux:
    source venv/bin/activate
    

3.  *Install Dependencies:*
    The following libraries are required to run the notebook.

    bash
    pip install pandas scikit-learn tensorflow matplotlib numpy
    

4.  *Run the Jupyter Notebook:*

    bash
    jupyter notebook Dl_sip_final.ipynb
    

## 🧠 Model Architectures

The project explores three distinct deep learning approaches for phishing detection:

### 1\. Convolutional Neural Network (CNN)

  * *Input:* URL sequences after tokenization and padding.
  * *Layers:* Embedding -\> Conv1D (128 filters, kernel size 5, ReLU activation) -\> GlobalMaxPooling1D -\> Dense (1 unit, Sigmoid activation).
  * *Key Concept:* CNNs are used to extract local features (patterns of characters/tokens) from the URL string, regardless of their position.

### 2\. Recurrent Neural Network (RNN) - LSTM

  * *Input:* URL sequences after tokenization and padding.
  * *Layers:* Embedding -\> LSTM (64 units) -\> Dense (1 unit, Sigmoid activation).
  * *Key Concept:* RNNs, specifically Long Short-Term Memory (LSTM) units, are excellent for sequence data, capturing long-range dependencies and the sequential nature of URL characters/tokens.

### 3\. Hybrid CNN-RNN Model

  * *Input:* The model uses two parallel branches that eventually merge.
      * *CNN Branch:* Same architecture as the standalone CNN model.
      * *RNN Branch:* A simplified RNN branch with an LSTM layer.
  * *Combination:* The outputs of the final pooling layer of the CNN (GlobalMaxPooling1D) and the LSTM layer are concatenated (concatenate).
  * *Output:* The combined output feeds into the final Dense (1 unit, Sigmoid activation) layer.
  * *Key Concept:* This hybrid approach aims to leverage the strength of both models: CNN for local feature extraction and RNN for sequential context modeling.

## 📊 Results Summary

The following table summarizes the performance of the three models on the test dataset:

| Model | Test Accuracy | CNN Precision (Class 0 / Legitimate) | CNN Recall (Class 1 / Phishing) | F1-Score (Macro Avg) |
| :---: | :-----------: | :----------------------------------: | :-----------------------------: | :------------------: |
| *Hybrid CNN-RNN* | *\~92.69%* | N/A | N/A | N/A |
| *CNN* | *\~91.60%* | 0.91 | 0.91 | 0.93 |
| *RNN (LSTM)* | *\~50.61%* | 0.00 | 1.00 | 0.33 |

**Note:* The "Test Accuracy" for the Hybrid model is from a different run in the notebook. The precision/recall scores for the CNN and RNN were computed in a subsequent cell and are more directly comparable.*

-----

## 💡 Key Observations

1.  *CNN Superiority:* The Convolutional Neural Network significantly outperformed the simple LSTM-based RNN model in this specific task, achieving a test accuracy of approximately *93%* and a well-balanced classification report. This suggests that the local, sub-string patterns (e.g., specific words, symbols, or common phishing structures) within the URL are highly effective features for classification.
2.  *RNN Weakness:* The standalone RNN model performed poorly (accuracy of \~50.6%), which is close to random guessing for a binary classification task. The classification report for the RNN shows that for class '0' (likely Legitimate, if encoded as 0), precision and F1-score are 0.00. This indicates the model essentially predicted almost all samples as the other class (likely Phishing, or class '1'), failing to learn a reliable pattern for the '0' class.
3.  *Hybrid Model Performance:* The initial run of the Hybrid CNN-RNN model showed the highest test accuracy (*\~92.69%*), confirming the intuition that combining sequential and local feature extraction can lead to a robust model.

## 📈 Model Performance Plots

The training and validation accuracy across epochs for the CNN and RNN models are visualized below:

*Interpretation:*

  * The *CNN Model* plot shows rapid training accuracy increase and an early plateau, indicating effective learning. The validation accuracy is stable, suggesting it generalized well, but it experiences slight signs of overfitting (training accuracy hits 1.00 while validation accuracy hovers around 0.92).
  * The *RNN Model* plot clearly shows a failed training process. Both training and validation accuracy remain near the baseline (around 50%), confirming its poor performance in this specific URL classification setup.
