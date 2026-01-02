# 🎓 Multi-Semester CGPA Calculator (C++)

A console-based **Multi-Semester CGPA Calculator** written in **C++**. This program calculates **semester-wise GPA** and **overall CGPA** using course grades and credit hours. Output is displayed in a clean tabular format with **colored text** for better readability.

## ✨ Features
- ✅ Supports **multiple semesters**
- ✅ Handles **multiple courses per semester**
- ✅ Calculates:
  - **Semester GPA**
  - **Overall CGPA**
- ✅ Displays course details in a **formatted table**
- ✅ Uses **ANSI color codes** for:
  - Semester GPA → **Green**
  - Overall CGPA → **Blue**
- ✅ Automatically determines **academic standing**

## 🧮 GPA & CGPA Calculation
**Semester GPA Formula:**  
GPA = (Σ (Grade Points × Credit Hours)) / (Σ Credit Hours)

markdown
Copy code
**Overall CGPA Formula:**  
CGPA = (Total Grade Points of all semesters) / (Total Credit Hours)

shell
Copy code

## 📂 Project Structure
.
├── CGPA_calcuator.cpp
└── README.md



## 🛠 Requirements
- C++ Compiler (GCC / MinGW / Clang)
- Terminal with **ANSI color support** (Linux, macOS, Windows Terminal, VS Code Terminal)

## ▶️ How to Compile and Run
**Compile:**  
g++ CGPA_calcuator.cpp -o CGPA_calcuator

**Run on Linux / macOS:**  
./CGPA_calcuator

**Run on Windows:**  
CGPA_calcuator.exe

> *Note:* If you don’t use `-o`, the executable will be `a.out` (Linux/macOS) or `a.exe` (Windows).

## 📊 Academic Standing Criteria
| CGPA Range | Standing |
|------------|---------|
| ≥ 3.5      | Excellent |
| ≥ 3.0      | Good |
| ≥ 2.0      | Satisfactory |
| < 2.0      | Needs Improvement |

## 🚀 Future Enhancements
- Input validation for grades and credit hours
- Support for **letter grades** (A, B+, etc.)
- File-based input/output
- Graphical User Interface (GUI)

## 👩‍💻 Author
**Isha Javed**  
BS Computer Science Student  
Learning C++ and Software Development

## 📜 License
This project is **open-source** and available for **educational purposes**.