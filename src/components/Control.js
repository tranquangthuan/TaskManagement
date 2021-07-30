import React from "react";
import Search from "./Search";
import Sort from "./Sort";

class Control extends React.Component {
  render() {
    return (
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12  mt-15">
        <div className="row">
          <Search onSearch={this.props.onSearch}/>

          <Sort onSort = {this.props.onSort}/>
        </div>
      </div>
    );
  }
}

export default Control;
