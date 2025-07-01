#include<bits/stdc++.h>
using namespace std;

struct Medicine{
    string name, batchNo , expiry;
    int quantity;
    float price; 
};

void addMedicine(){
    Medicine med;
    cout<<"Enter Medicine name";
    cin>>med.name;
    cout<<"Enter batch number";
    cin>>med.batchNo;
    cout<<"Enter Expiry";
    cin>>med.expiry;
    cout<<"Enter quantity";
    cin>>med.quantity;
    cout<<"Enter price";
    cin>>med.price;


    ofstream out("inventory.txt", ios::app);
    out << med.name << "|" << med.batchNo << "|" << med.expiry << "|" << med.quantity << "|" << med.price << "\n";
    out.close();
    cout << "Medicine added successfully!\n";
}

void viewInventory() {
    ifstream in("inventory.txt");
    string line;
    cout << "\n--- Medicine Inventory ---\n";
    while (getline(in, line)) {
        stringstream ss(line);
        string name, batch, expiry, quantity, price;
        getline(ss, name, '|');
        getline(ss, batch, '|');
        getline(ss, expiry, '|');
        getline(ss, quantity, '|');
        getline(ss, price, '|');
        cout << "Name: " << name << ", Batch: " << batch << ", Expiry: " << expiry
             << ", Qty: " << quantity << ", Price: ₹" << price << "\n";
    }
    in.close();
}




int main(){
    
    int choice;
    do {
        cout << "\n1. Add Medicine\n2. View Inventory\n3. Exit\nEnter choice: ";
        cin >> choice;
        switch (choice) {
            case 1: addMedicine(); break;
            case 2: viewInventory(); break;
            case 3: cout << "Goodbye!\n"; break;
            default: cout << "Invalid choice\n";
        }
    } while (choice != 3);
    return 0;
    
}