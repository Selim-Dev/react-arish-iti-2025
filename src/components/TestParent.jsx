import React, { Component } from "react";
import TestChild from "./TestChild"; // adjust path as needed

class TestParent extends Component {
  state = {
    showChild: true,
  };

  toggleChild = () => {
    this.setState((prevState) => ({
      showChild: !prevState.showChild,
    }));
  };

  render() {
    return (
      <div>
        <h2>Hi from Parent</h2>
        <button onClick={this.toggleChild}>
          {this.state.showChild ? "Hide" : "Show"} Child
        </button>

        {this.state.showChild && <TestChild name="ali" age={15} />}
      </div>
    );
  }
}

export default TestParent;
