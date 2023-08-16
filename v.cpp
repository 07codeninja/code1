#include <iostream>
#include <climits>
using namespace std;

void printParenthesis(int** bracket, int i, int j, char& name)
{
    if (i == j) {
        cout << name++;
        return;
    }

    cout << "(";

    printParenthesis(bracket, i, bracket[i][j], name);

    printParenthesis(bracket, bracket[i][j] + 1, j, name);

    cout << ")";
}

void matrixChainOrder(int p[], int n)
{
    int** m = new int*[n];
    int** bracket = new int*[n];
    for (int i = 0; i < n; i++) {
        m[i] = new int[n];
        bracket[i] = new int[n];
    }

    for (int i = 1; i < n; i++)
        m[i][i] = 0;

    for (int L = 2; L < n; L++) {
        for (int i = 1; i < n - L + 1; i++) {
            int j = i + L - 1;
            m[i][j] = INT_MAX;

            for (int k = i; k <= j - 1; k++) {
                int q = m[i][k] + m[k + 1][j] + p[i - 1] * p[k] * p[j];

                if (q < m[i][j]) {
                    m[i][j] = q;
                    bracket[i][j] = k;
                }
            }
        }
    }

    char name = 'A';
    cout << "Optimal Parenthesization: ";
    printParenthesis(bracket, 1, n - 1, name);
    cout << endl;

    for (int i = 0; i < n; i++) {
        delete[] m[i];5
        delete[] bracket[i];
    }
    delete[] m;
    delete[] bracket;
}

int main()
{
    int n;
    cout << "Enter the number of matrices: ";
    cin >> n;

    int* p = new int[n + 1];
    cout << "Enter the dimensions of the matrices:" << endl;
    for (int i = 0; i <= n; i++) {
        cout << "Matrix " << i + 1 << ": ";
        cin >> p[i];
    }

    matrixChainOrder(p, n + 1);

    delete[] p;

    return 0;
}
