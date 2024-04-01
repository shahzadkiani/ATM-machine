#!/usr/bin/env node

import inquirer from 'inquirer';
class ATM {
    private balance: number;

    constructor(initialBalance: number) {
        this.balance = initialBalance;
    }

    checkBalance(): number {
        return this.balance;
    }

    deposit(amount: number): void {
        this.balance += amount;
        console.log(`Deposited ${amount}. Current balance: ${this.balance}`);
    }

    withdraw(amount: number): void {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`Withdrawn ${amount}. Current balance: ${this.balance}`);
        } else {
            console.log("Insufficient funds.");
        }
    }
}

async function main() {
    const myATM = new ATM(1000);

    while (true) {
        const { action } = await inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What would you like to do?',
                choices: ['Check Balance', 'Deposit', 'Withdraw', 'Exit']
            }
        ]);

        switch (action) {
            case 'Check Balance':
                console.log('Current balance:', myATM.checkBalance());
                break;
            case 'Deposit':
                const { depositAmount } = await inquirer.prompt([
                    {
                        type: 'number',
                        name: 'depositAmount',
                        message: 'Enter deposit amount:'
                    }
                ]);
                myATM.deposit(depositAmount);
                break;
            case 'Withdraw':
                const { withdrawAmount } = await inquirer.prompt([
                    {
                        type: 'number',
                        name: 'withdrawAmount',
                        message: 'Enter withdrawal amount:'
                    }
                ]);
                myATM.withdraw(withdrawAmount);
                break;
            case 'Exit':
                console.log('Exiting ATM. Goodbye!');
                return;
        }
    }
}

main();
