import React from "react";
import Form from "./Form";
import Expenses from "./Expenses";
import '../css/expenseTable.css';

export default class ExpensesList extends React.Component {

    state = {
        expenses: []
    };

    addExpense = (expense) => {
        this.setState({
            expenses: [expense,...this.state.expenses]
        })
    };

    handleDeleteExpanse = (id) => {
        this.setState({
            expenses: this.state.expenses.filter(expense => expense.id !== id)
        })
    };

    sumExpanse = (currency) => {
        return (
            this.state.expenses.length !== 0 ?
            this.state.expenses
                .map(expense => parseFloat(expense[currency]))
                .reduce((a, b) => a + b): 0)
};

    render() {
        return <div className="app-wrapper">
            <Form onSubmit={this.addExpense}/>
            <table className="expense-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Amount (PLN)</th>
                        <th>Amount (EUR)</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                {this.state.expenses.map(expense =>
                    <Expenses
                        onDelete={() => this.handleDeleteExpanse(expense.id)}
                        key={expense.id}
                        title={expense.title}
                        amountPl={expense.amountPl}
                        amountEuro={expense.amountEuro}/>
                        )}
                </tbody>

            </table>
            <div className="expense-sum">Sum: {Math.round(this.sumExpanse("amountPl") * 100) / 100} PLN ({Math.round(this.sumExpanse("amountEuro") * 100) / 100} EUR)
            </div>

        </div>
    }
}