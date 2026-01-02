#include <iostream>   // For input/output (cin, cout)
#include <vector>     // For using dynamic arrays (vector)
#include <iomanip>    // For output formatting (setw, setprecision)
using namespace std;

// ANSI color codes (used only for results)
#define GREEN "\033[1;32m"   // Green color
#define BLUE  "\033[1;34m"   // Blue 
#define RESET "\033[0m"      // Reset to default color

// Structure to store course details
struct Course {
    string name;        // Course name
    double grade;       // Grade points obtained
    int creditHours;    // Credit hours of the course
};

int main() {

    int numSemesters;   // Total number of semesters

    // Program title
    cout << string(45, '=') << endl;
    cout << "      MULTI-SEMESTER CGPA CALCULATOR" << endl;
    cout << string(45, '=') << endl;

    // Input number of semesters
    cout << "Enter number of semesters: ";
    cin >> numSemesters;

    // Variables for cumulative CGPA calculation
    double cumulativeGradePoints = 0.0;
    int cumulativeCredits = 0;

    // Set output format (2 decimal places)
    cout << fixed << setprecision(2);

    // Loop through each semester
    for (int sem = 1; sem <= numSemesters; sem++) {

        int numCourses;   // Number of courses in current semester

        // Semester header
        cout << "\n" << string(45, '-') << endl;
        cout << "\t\tSemester " << sem << endl;
        cout << string(45, '-') << endl;

        // Input number of courses
        cout << "Enter number of courses: ";
        cin >> numCourses;
        cin.ignore();     // Clear input buffer

        // Vector to store course data
        vector<Course> courses(numCourses);

        // Semester totals
        double semesterGradePoints = 0.0;
        int semesterCredits = 0;

        // Loop through each course
        for (int i = 0; i < numCourses; i++) {

            // Input course name
            cout << "\nCourse " << i + 1 << " name: ";
            getline(cin, courses[i].name);

            // Input grade points
            cout << "Grade points: ";
            cin >> courses[i].grade;

            // Input credit hours
            cout << "Credit hours: ";
            cin >> courses[i].creditHours;
            cin.ignore();  // Clear buffer for next getline

            // Calculate semester totals
            semesterGradePoints += courses[i].grade * courses[i].creditHours;
            semesterCredits += courses[i].creditHours;
        }

        // Display table header
        cout << "\n" << string(45, '-') << endl;
        cout << left
             << setw(25) << "Course"
             << setw(10) << "Grade"
             << setw(10) << "Credits" << endl;
        cout << string(45, '-') << endl;

        // Display course data
        for (const auto &c : courses) {
            cout << left
                 << setw(25) << c.name.substr(0, 24)
                 << setw(10) << c.grade
                 << setw(10) << c.creditHours << endl;
        }

        // Calculate GPA for the semester
        double semesterGPA = semesterGradePoints / semesterCredits;

        // Display semester GPA in green
        cout << GREEN
             << "\nSemester " << sem << " GPA: "
             << semesterGPA
             << RESET << endl;

        // Add semester results to cumulative totals
        cumulativeGradePoints += semesterGradePoints;
        cumulativeCredits += semesterCredits;
    }

    // Calculate overall CGPA
    double cgpa = cumulativeGradePoints / cumulativeCredits;

    cout << "\n" << string(45, '=') << endl;

    // Display overall CGPA in blue
    cout << BLUE << "Overall CGPA: " << cgpa << RESET << endl;

    // Determine academic standing
    cout << GREEN << "Standing: ";
    if (cgpa >= 3.5)
        cout << "Excellent";
    else if (cgpa >= 3.0)
        cout << "Good";
    else if (cgpa >= 2.0)
        cout << "Satisfactory";
    else
        cout << "Needs Improvement";
    cout << RESET << endl;

    cout << string(45, '=') << endl;

    return 0;   // Program ends successfully
}
