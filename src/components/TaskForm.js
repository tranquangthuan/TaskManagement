import React from "react";

class TaskForm extends React.Component {
  constructor(props) {
    super(props);
    if (props.taskUpdate !== null) {
      this.state = {
        id: props.taskUpdate.id,
        name: props.taskUpdate.name,
        status: props.taskUpdate.status,
      };
    } else {
      this.state = {
        id: "",
        name: "",
        status: false,
      };
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.taskUpdate) {
      this.setState({
        id: nextProps.taskUpdate.id,
        name: nextProps.taskUpdate.name,
        status: nextProps.taskUpdate.status,
      });
    } else if (nextProps && nextProps.taskUpdate == null) {
      this.setState({
        id: "",
        name: "",
        status: false,
      });
    }
  }

  onCloseForm = () => {
    this.props.onCloseForm();
  };

  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    if (name === "status") {
      value = value === "true" ? true : false;
    }
    this.setState({ [name]: value });
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state);
    this.onClear();
    this.onCloseForm();
  };

  onClear = () => {
    this.setState({
      name: "",
      status: false,
    });
  };
  render() {
    return (
      <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h3 className="panel-title text-right">
              <button
                type="button"
                className="btn btn-danger"
                onClick={this.onCloseForm}
              >
                Close Form
              </button>
            </h3>
          </div>
          <div className="panel-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label>name:</label>
                <input
                  name="name"
                  className="form-control"
                  value={this.state.name}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label>Tr???ng Th??i:</label>
                <select
                  name="status"
                  className="form-control"
                  value={this.state.status}
                  onChange={this.onChange}
                >
                  <option value={false}>???n</option>
                  <option value={true}>Hi???n</option>
                </select>
              </div>
              <div className="form-group text-center">
                <button type="submit" className="btn btn-primary">
                  L??u L???i
                </button>
                &nbsp;&nbsp;
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={this.onClear}
                >
                  H???y B???
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default TaskForm;
