import React from "react";
import uniqid from "uniqid";
import '../css/form.css';

export default class Form extends React.Component {

    state = {
        title: '',
        amountPl: "",
        plnToEuro: 4.382
    };

    handleChangeTitle = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    handleChangeAmount = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    // calculatePLToEuro = () => {
    //     const countAmountEuro = this.state.amountPl * this.state.plnToEuro;
    //     console.log(countAmountEuro)
    //     this.setState({
    //         amountEuro: countAmountEuro
    //     });
    //     console.log(this.state.amountEuro)
    //
    // };

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.handleValidation()) {
            this.props.onSubmit({
                id: uniqid(),
                title: this.state.title,
                amountPl: this.state.amountPl,
                amountEuro: Math.round(this.state.amountPl / this.state.plnToEuro * 100) / 100
            });

            this.setState({
                title: "",
                amountPl: "",
                errors: ""
            })
        } else {
            return;
        }

    };


    handleValidation = () => {
        const regex = new RegExp("^[0-9]+.?\\d{0,2}$");
        let errors = {}, formIsValid = true;
        if (!this.state.title) {
            formIsValid = false;
            errors = "Title cannot be empty";
        } else if (this.state.title.length < 5) {
            formIsValid = false;
            errors = "Title should have at least 5 characters";
        }else if (!this.state.amountPl) {
            formIsValid = false;
            errors = "Amount cannot be empty";
        } else if (!this.state.amountPl.match(regex)) {
            formIsValid = false;
            errors = "Amount should have at most 2 digits after the decimal point";
        }

        this.setState({errors: errors});
        return formIsValid;

    };

    render() {
        return (
            <section className='expense'>
                <header className="expense-header">
                    <h1 className="expense-header--title">List of expenses</h1>
                    <span className="expense-header--conversion-rate">1EUR = {this.state.plnToEuro} PLN</span>
                </header>
                <main className="expense-main">
                    <form className="expense-form">
                        <div className="expense-form--wrapper">
                            <label htmlFor="title" className="expense-form--label">Title of transaction</label>
                            <input
                                className="expense-form--input"
                                name="title"
                                type="text"
                                id="title"
                                value={this.state.title}
                                onChange={this.handleChangeTitle}
                                placeholder="title..." required />
                            {/*<span></span>*/}

                            <label htmlFor="amountPl" className="expense-form--label">Amount (in PLN)</label>
                            <input
                                className="expense-form--input"
                                id="amountPl"
                                type="number"
                                name="amountPl"
                                value={this.state.amountPl}
                                onChange={this.handleChangeAmount}
                                placeholder="amount..." required/>



                        </div>
                        <button onClick={this.handleSubmit} className="expense-form--add-btn">Add</button>

                        {this.state.errors ? <span className="expense-form--error-message">{this.state.errors}</span> : <span className="expense-form--error-message"></span>}

                    </form>
                </main>

            </section>
        )
    }
}