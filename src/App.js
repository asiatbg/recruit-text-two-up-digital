import React, { Component } from 'react';
import './css/base.css';
import ExpensesList from "./components/ExpensesList";

class App extends Component {
  render() {
    return (
      <div className="App">
        <ExpensesList />
      </div>
    );
  }
}
export default App;
