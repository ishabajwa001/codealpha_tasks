
export const CPP_SOURCE = {
  models: `
#include <string>
#include <vector>
#include <ctime>

namespace Banking {

enum class TransactionType {
    DEPOSIT,
    WITHDRAWAL,
    TRANSFER
};

struct Customer {
    std::string customerId;
    std::string name;
    std::string email;
    std::string phone;
};

struct Account {
    std::string accountNumber;
    std::string accountType; // "SAVINGS" or "CHECKING"
    double balance;
    std::string customerId;
};

struct Transaction {
    std::string transactionId;
    std::string accountNumber;
    TransactionType type;
    double amount;
    std::string timestamp;
    std::string description;
};

} // namespace Banking
`,
  bank_system: `
#include "models.hpp"
#include <algorithm>
#include <stdexcept>
#include <iostream>
#include <chrono>
#include <iomanip>
#include <sstream>

class BankSystem {
private:
    std::vector<Banking::Customer> customers;
    std::vector<Banking::Account> accounts;
    std::vector<Banking::Transaction> transactions;

    std::string getCurrentTimestamp() {
        auto now = std::chrono::system_clock::now();
        auto in_time_t = std::chrono::system_clock::to_time_t(now);
        std::stringstream ss;
        ss << std::put_time(std::localtime(&in_time_t), "%Y-%m-%d %X");
        return ss.str();
    }

public:
    void createCustomer(const std::string& name, const std::string& email, const std::string& phone) {
        std::string id = "CUST-" + std::to_string(customers.size() + 1000);
        customers.push_back({id, name, email, phone});
    }

    void createAccount(const std::string& custId, const std::string& type) {
        std::string accNum = "ACC-" + std::to_string(accounts.size() + 500000);
        accounts.push_back({accNum, type, 0.0, custId});
    }

    void deposit(const std::string& accNum, double amount) {
        auto it = std::find_if(accounts.begin(), accounts.end(), [&](const auto& a){ return a.accountNumber == accNum; });
        if (it == accounts.end()) throw std::runtime_error("Account not found");
        if (amount <= 0) throw std::invalid_argument("Amount must be positive");

        it->balance += amount;
        addTransaction(accNum, Banking::TransactionType::DEPOSIT, amount, "Deposit");
    }

    void withdraw(const std::string& accNum, double amount) {
        auto it = std::find_if(accounts.begin(), accounts.end(), [&](const auto& a){ return a.accountNumber == accNum; });
        if (it == accounts.end()) throw std::runtime_error("Account not found");
        if (amount <= 0) throw std::invalid_argument("Amount must be positive");
        if (it->balance < amount) throw std::runtime_error("Insufficient balance");

        it->balance -= amount;
        addTransaction(accNum, Banking::TransactionType::WITHDRAWAL, amount, "Withdrawal");
    }

    void transfer(const std::string& fromAcc, const std::string& toAcc, double amount) {
        withdraw(fromAcc, amount);
        deposit(toAcc, amount);
        addTransaction(fromAcc, Banking::TransactionType::TRANSFER, amount, "Transfer to " + toAcc);
        addTransaction(toAcc, Banking::TransactionType::TRANSFER, amount, "Transfer from " + fromAcc);
    }

    void addTransaction(const std::string& accNum, Banking::TransactionType type, double amount, const std::string& desc) {
        std::string txId = "TX-" + std::to_string(transactions.size() + 10000);
        transactions.push_back({txId, accNum, type, amount, getCurrentTimestamp(), desc});
    }

    std::vector<Banking::Transaction> getRecentTransactions(const std::string& accNum) {
        std::vector<Banking::Transaction> result;
        for (const auto& tx : transactions) {
            if (tx.accountNumber == accNum) result.push_back(tx);
        }
        std::reverse(result.begin(), result.end());
        return result;
    }

    double getBalance(const std::string& accNum) {
        auto it = std::find_if(accounts.begin(), accounts.end(), [&](const auto& a){ return a.accountNumber == accNum; });
        if (it == accounts.end()) throw std::runtime_error("Account not found");
        return it->balance;
    }
};
`,
  api_main: `
#include "httplib.h"
#include "bank_system.cpp"
#include "nlohmann/json.hpp"

using json = nlohmann::json;

int main() {
    httplib::Server svr;
    BankSystem bank;

    // Middleware for CORS
    svr.set_post_routing_handler([](const auto& req, auto& res) {
        res.set_header("Access-Control-Allow-Origin", "*");
    });

    svr.Post("/customers", [&](const httplib::Request& req, httplib::Response& res) {
        auto body = json::parse(req.body);
        bank.createCustomer(body["name"], body["email"], body["phone"]);
        res.set_content("{\\"status\\":\\"success\\"}", "application/json");
    });

    svr.Post("/transactions/deposit", [&](const httplib::Request& req, httplib::Response& res) {
        auto body = json::parse(req.body);
        try {
            bank.deposit(body["accountNumber"], body["amount"]);
            res.set_content("{\\"status\\":\\"success\\"}", "application/json");
        } catch (const std::exception& e) {
            res.status = 400;
            res.set_content(json{{"error", e.what()}}.dump(), "application/json");
        }
    });

    // ... other endpoints for withdraw, transfer, getTransactions

    std::cout << "Server starting on port 8080..." << std::endl;
    svr.listen("0.0.0.0", 8080);
    return 0;
}
`
};
