# Sudoku Solver in C++ 🧩

This is a console-based Sudoku solver written in C++. It allows the user to paste or write an entire Sudoku puzzle at once and solves it using backtracking. The solved puzzle is displayed in a user-friendly 9×9 grid format. ✅

## Author ✍️

Isha Javed

## Features ✨

- User-friendly input: write or paste the whole puzzle at once.  
- Uses `0` for empty cells.  
- Prints the solved puzzle in a classic Sudoku grid.  
- Displays a success message when the puzzle is solved. ✅  
- Shows an error message if the puzzle has no valid solution. ❌  
- Colored console output (green for success, red for failure).

## How to Use 🖥️

1. Compile the code using any C++ compiler:



g++ sudoku_solver.cpp -o sudoku_solver


2. Run the program:



./sudoku_solver


3. Input your Sudoku puzzle: Paste or type all 81 numbers at once, row by row. Use `0` for empty cells. Example input for one row: `5 3 0 0 7 0 0 0 0`.

4. The program will solve the puzzle and display it in a 9×9 grid. 🎯

## Example 📝

📝 Input:

5 3 0 0 7 0 0 0 0
6 0 0 1 9 5 0 0 0
0 9 8 0 0 0 0 6 0
8 0 0 0 6 0 0 0 3
4 0 0 8 0 3 0 0 1
7 0 0 0 2 0 0 0 6
0 6 0 0 0 0 2 8 0
0 0 0 4 1 9 0 0 5
0 0 0 0 8 0 0 7 9


Output:

Sudoku solved successfully! ✅

| 5 3 4 | 6 7 8 | 9 1 2 |
| 6 7 2 | 1 9 5 | 3 4 8 |
| 1 9 8 | 3 4 2 | 5 6 7 |
| 8 5 9 | 7 6 1 | 4 2 3 |
| 4 2 6 | 8 5 3 | 7 9 1 |
| 7 1 3 | 9 2 4 | 8 5 6 |
| 9 6 1 | 5 3 7 | 2 8 4 |
| 2 8 7 | 4 1 9 | 6 3 5 |
| 3 4 5 | 2 8 6 | 1 7 9 |


## License 📜

This project is open source. Feel free to modify and use it. 🛠️