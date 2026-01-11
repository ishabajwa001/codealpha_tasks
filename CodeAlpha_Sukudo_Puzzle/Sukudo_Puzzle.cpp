#include <iostream>
using namespace std;

#define RED "\033[31m"
#define GREEN "\033[32m"
#define RESET "\033[0m"

const int SIZE = 9;

// Print Sudoku grid in user-friendly format
void printGrid(int grid[SIZE][SIZE]) {
    for (int i = 0; i < SIZE; i++) {
        if (i % 3 == 0) cout << "-------------------------\n";
        for (int j = 0; j < SIZE; j++) {
            if (j % 3 == 0) cout << "| ";
            cout << grid[i][j] << " ";
        }
        cout << "|\n";
    }
    cout << "-------------------------\n";
}

// Check if placing num at (row, col) is valid
bool isSafe(int grid[SIZE][SIZE], int row, int col, int num) {
    for (int x = 0; x < SIZE; x++)
        if (grid[row][x] == num || grid[x][col] == num)
            return false;

    int startRow = row - row % 3;
    int startCol = col - col % 3;
    for (int i = 0; i < 3; i++)
        for (int j = 0; j < 3; j++)
            if (grid[startRow + i][startCol + j] == num)
                return false;

    return true;
}

// Backtracking solver
bool solveSudoku(int grid[SIZE][SIZE]) {
    for (int row = 0; row < SIZE; row++) {
        for (int col = 0; col < SIZE; col++) {
            if (grid[row][col] == 0) {
                for (int num = 1; num <= 9; num++) {
                    if (isSafe(grid, row, col, num)) {
                        grid[row][col] = num;
                        if (solveSudoku(grid)) return true;
                        grid[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

int main() {
    int grid[SIZE][SIZE];

    cout << "Write your Sudoku puzzle or paste it (use 0 for empty cells):\n\n";

    // Input: paste or write entire puzzle
    for (int i = 0; i < SIZE; i++)
        for (int j = 0; j < SIZE; j++)
            cin >> grid[i][j];

    // Solve and print the solved puzzle
    if (solveSudoku(grid)) {
        cout << GREEN << "\nSudoku solved successfully!\n\n" << RESET;
        printGrid(grid);
    } else {
        cout << RED << "No solution exists for the given Sudoku." << RESET << endl;
    }

    return 0;
}
