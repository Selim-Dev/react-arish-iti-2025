import React, { Component } from "react";

class TestChild extends Component {
  constructor() {
    super();
    console.log("TestChild → constructor");
    this.state = {
      count: 0,
    };
  }

  // static getDerivedStateFromProps(props, state) {
  //   console.log("TestChild → getDerivedStateFromProps");
  //   return null; // must return an object or null
  // }

  componentDidMount() {
    console.log("TestChild → componentDidMount");
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log("TestChild → shouldComponentUpdate");
  //   return true; // must return true to allow update
  // }

  // getSnapshotBeforeUpdate(prevProps, prevState) {
  //   console.log("TestChild → getSnapshotBeforeUpdate");
  //   return null;
  // }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("🚀 ~ TestChild ~ componentDidUpdate ~ prevState:", prevState)
    console.log("🚀 ~ TestChild ~ componentDidUpdate ~ prevProps:", prevProps)
    console.log("TestChild → componentDidUpdate");
  }

  componentWillUnmount() {
    console.log("TestChild → componentWillUnmount");
  }

  handleClick = () => {
    // this.setState({ count: this.state.count + 1 });
		// this.setState({ count: this.state.count + 1 });
		this.setState((prev) => ({ count: prev.count + 1 }));
this.setState((prev) => ({ count: prev.count + 1 }));
  };


  render() {
    console.log("TestChild → render");
    return (
      <div>
        <p>Hi from child</p>
        <p>Count: {this.state.count}</p>
        <button onClick={this.handleClick} className="btn btn-xs">
          Increase Count
        </button>
      </div>
    );
  }
}

export default TestChild;
