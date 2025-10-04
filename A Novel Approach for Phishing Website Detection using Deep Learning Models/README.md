# 🧠 Enhancing Code Insight through Semantic Change Impact Evaluation

## 📘 Overview

This project introduces a **Semantic Change Impact Evaluation**
framework designed to enhance understanding of software evolution by
analyzing semantic code changes rather than traditional line-based
differences.\
Using **Abstract Syntax Trees (ASTs)**, **refactoring detection**, and
**Natural Language Processing (NLP)** on commit messages, it helps
identify how code modifications impact the overall logic and structure.

The goal is to improve software maintainability, streamline
collaboration, and make code reviews more intelligent and efficient.

------------------------------------------------------------------------

## ⚙️ Key Features

-   🧩 **Semantic Analysis:** Parses code into ASTs to understand
    structure and meaning.\
-   🔍 **Change Detection:** Identifies functional and structural
    differences between code versions.\
-   🔄 **Refactoring Detection:** Detects renaming or reorganizing
    changes that preserve behavior.\
-   🧠 **Commit Message NLP:** Interprets commit messages to determine
    developer intent.\
-   📄 **Automatic Documentation:** Generates readable reports
    describing detected changes.\
-   💬 **Collaborative Review Support:** Enhances team discussions
    through structured semantic insights.

------------------------------------------------------------------------

## 🧩 System Architecture

``` mermaid
graph TD
A[Code Repository] --> B[Semantic Analysis]
B --> C[Change Detection]
C --> D[Refactoring Detection]
D --> E[NLP Commit Analysis]
E --> F[Report Generation]
```

------------------------------------------------------------------------

## 🧪 Experimental Setup

The system was evaluated on various **Python programs** to analyze both
structural and logical differences between code versions.

### ✅ Test Programs

-   Circle area calculation\
-   Linear and binary search\
-   Bubble sort\
-   Factorial and Fibonacci sequence generation\
-   Prime number checking

### 🧰 Core Modules Used

  Module         Purpose
  -------------- ----------------------------------------
  `ast`          Parses code into Abstract Syntax Trees
  `difflib`      Generates semantic difference reports
  `tokenize`     Performs lexical analysis of code
  `io.BytesIO`   Handles in-memory file I/O operations

------------------------------------------------------------------------

## 📊 Results Summary

  -----------------------------------------------------------------------
  Test Case       Description        Semantic Changes Observed
  --------------- ------------------ ------------------------------------
  **1**           Circle area,       Improved π precision and added
                  Linear Search,     sorted insertion
                  Remove Duplicates  

  **2**           Prime, Factorial,  Renamed functions, extended logic
                  Fibonacci          for scalability

  **3**           Bubble Sort +      Refactored sorting logic and
                  Binary Search      variable names

  **4**           Add Function       Suggested rename for better
                                     readability (`add` → `sum`)
  -----------------------------------------------------------------------

The framework successfully detected **both functional and non-functional
(refactoring)** changes, providing meaningful insights for developers.

------------------------------------------------------------------------

## 🧠 Methodology

1.  **Semantic Parsing:**\
    Convert source code into ASTs for structure-based comparison.

2.  **Change Detection:**\
    Compare ASTs of original and modified code to locate logical
    differences.

3.  **Refactoring Identification:**\
    Detect syntax-only changes that maintain behavior (e.g., renaming).

4.  **NLP Commit Analysis:**\
    Interpret commit messages to extract intent and purpose.

5.  **Report Generation:**\
    Produce structured documentation summarizing code changes.

------------------------------------------------------------------------

## 🧰 Tech Stack

  Component                  Technology
  -------------------------- -----------------------------------------
  **Programming Language**   Python 3.x
  **Libraries**              ast, difflib, tokenize, io
  **Optional NLP Tools**     NLTK, spaCy
  **Output**                 Semantic diff reports and documentation

------------------------------------------------------------------------

## 🧾 How to Run

### 1️⃣ Clone the Repository

``` bash
git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>
```

### 2️⃣ Install Dependencies

``` bash
pip install nltk spacy
```

### 3️⃣ Run the Semantic Analyzer

``` bash
python semantic_analysis.py original_code.py modified_code.py
```

### 4️⃣ View the Results

-   Semantic differences will be displayed in the console.\
-   Reports (if enabled) will be saved under the `/output/` directory.

------------------------------------------------------------------------

## 💡 Example Output

``` text
Detected semantic differences:
- Improved π precision in area calculation
- Added new function: insert_sorted()
- Refactored linear_search() for readability
- Removed redundant duplicate-removal function
```

------------------------------------------------------------------------

## 🧭 Future Enhancements

-   Multi-language support (C++, Java, etc.)\
-   IDE integration for live semantic change detection\
-   Machine learning-based change prediction\
-   Visual diff viewer for AST-based analysis

------------------------------------------------------------------------

## 📜 License

This project is provided for **academic and research purposes only.**\
© 2025 All Rights Reserved.

