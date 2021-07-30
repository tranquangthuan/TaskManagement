import React from "react";

class TaskItem extends React.Component {
  onUpdateStatus = (task) => {
    this.props.onUpdateStatus(task);
  };

  onDelete = (task) => {
    this.props.onDelete(task);
  };

  onUpdate = (task) => {
    this.props.onUpdate(task);
  };

  render() {
    var { task, index } = this.props;
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{task.name}</td>
        <td>
          <button
            type="button"
            className={task.status ? "btn btn-success" : "btn btn-warning"}
            onClick={() => this.onUpdateStatus(task)}
          >
            {task.status ? "Kich hoat" : "An"}
          </button>
        </td>
        <td>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => this.onDelete(task)}
          >
            Xóa
          </button>
          <button
            type="button"
            className="btn btn-info ml-15"
            onClick={() => this.onUpdate(task)}
          >
            Sửa
          </button>
        </td>
      </tr>
    );
  }
}

export default TaskItem;
