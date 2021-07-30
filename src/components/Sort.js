import React from "react";

class Sort extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      by: "name",
      value: 1,
    };
  }

  onClick = (by, value) => {
    this.props.onSort(by, value);
    this.setState({
      by: by,
      value: value,
    });
  };

  render() {
    var { by, value } = this.state;
    return (
      <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
        <button
          className="btn btn-primary dropdown-toggle"
          type="button"
          data-toggle="dropdown"
        >
          Sort <span className="caret"></span>
        </button>
        <ul className="dropdown-menu">
          <li
            onClick={() => this.onClick("name", 1)}
            className={by === "name" && value === 1 ? "active" : ""}
          >
            <a href="/#">Name A - Z</a>
          </li>
          <li
            onClick={() => this.onClick("name", -1)}
            className={by === "name" && value === -1 ? "active" : ""}
          >
            <a href="/#">Name Z- A</a>
          </li>
          <li className="divider"></li>
          <li
            onClick={() => this.onClick("status", 1)}
            className={by === "status" && value === 1 ? "active" : ""}
          >
            <a href="/#">Status : Active</a>
          </li>
          <li
            onClick={() => this.onClick("status", -1)}
            className={by === "status" && value === -1 ? "active" : ""}
          >
            <a href="/#">Status : Hide</a>
          </li>
        </ul>
      </div>
    );
  }
}

export default Sort;
