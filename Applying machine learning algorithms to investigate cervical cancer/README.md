# 🧬 Risk Classification of Cervical Cancer using Machine Learning

## 📘 Project Overview
The **Risk Classification of Cervical Cancer** project focuses on developing a **machine learning-based predictive model** to assess the likelihood of cervical cancer in women based on various medical, behavioral, and demographic factors.  
This notebook (`Risk_classification_Cervical_Cancer.ipynb`) implements a complete end-to-end pipeline — from data preprocessing and feature engineering to model training, evaluation, and visualization of classification results.

## 🎯 Objective
The main objective of this project is to:
- Analyze patient data and identify key risk factors associated with cervical cancer.
- Build and evaluate machine learning models for **risk classification**.
- Support early diagnosis and prevention by providing **data-driven insights** for healthcare professionals.

## ⚙️ Methodology
The workflow in this notebook follows these major steps:
1. **Data Preprocessing**
   - Handling missing values and outliers.
   - Encoding categorical variables.
   - Normalization and feature scaling.
2. **Exploratory Data Analysis (EDA)**
   - Statistical summaries and visual insights.
   - Correlation analysis between medical and behavioral features.
3. **Model Development**
   - Implementation of machine learning algorithms such as:
     - Logistic Regression
     - Random Forest Classifier
     - Support Vector Machine (SVM)
     - Gradient Boosting
   - Hyperparameter tuning using GridSearchCV or RandomizedSearchCV.
4. **Model Evaluation**
   - Performance metrics: Accuracy, Precision, Recall, F1-Score, ROC-AUC.
   - Confusion Matrix and ROC Curve visualization.
5. **Risk Classification**
   - Predicting the probability of cervical cancer occurrence based on input attributes.

## 🧩 Tools & Libraries
- **Python 3.x**
- **Pandas**, **NumPy** – Data handling
- **Matplotlib**, **Seaborn** – Data visualization
- **Scikit-learn** – Model training and evaluation
- **Imbalanced-learn (SMOTE)** – Handling class imbalance
- **Jupyter Notebook** – Development environment

## 📊 Dataset
The dataset used for this project contains various clinical and demographic attributes related to women’s health, such as:
- Age, number of pregnancies, hormonal contraceptive usage, smoking habits, and medical test results.  
- The **target variable** indicates the presence or absence of cervical cancer risk.

*(Dataset Source: UCI Machine Learning Repository — Cervical Cancer Risk Factors Dataset)*

## 📈 Results
- Models were evaluated based on precision-recall trade-offs and ROC-AUC performance.
- The **Random Forest Classifier** achieved the best performance with strong generalization on test data.
- Feature importance analysis revealed key health indicators contributing to cancer risk prediction.

## 💡 Key Insights
- Behavioral and lifestyle features like smoking and contraceptive use significantly impact prediction accuracy.
- Feature correlation highlights potential areas for targeted preventive healthcare strategies.


