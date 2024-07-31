import React, { Component } from "react";

class ClassComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "John",
      age: 30,
      count: 0,
    };
  }
  componentDidMount() {
    console.log("Component Mounted");
  }
  componentWillUnmount() {
    console.log("Component Unmounted");
  }
  componentDidUpdate(prevProps, prevstate) {
    console.log("Component Updated");
  }
  render() {
    const Increment = () => {
      console.log("increment");
      this.setState({ count: this.state.count + 1 });
    };
    const decrement = () => {
      console.log("decrement");
      this.setState({ count: this.state.count - 1 });
    };
    return (
      <div>
        <div className="flex  flex-col justify-center items-center h-screen">
          {/* Render your component here */}
          <div className=" text-3xl text-blue-500">
            Count: {this.state.count}
          </div>
          <button
            className="border-2 mt-5 text-2xl hover:bg-blue-300  p-2 w-fit"
            onClick={Increment}
          >
            Increment Count
          </button>
          <button
            className="border-2 mt-5 text-2xl hover:bg-blue-300  p-2 w-fit"
            onClick={decrement}
          >
            Decrement Count
          </button>
        </div>
      </div>
    );
  }
}

export default ClassComponent;
