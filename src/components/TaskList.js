import React from "react";
import TaskItem from "./TaskItem";

class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterName: "",
      filterStatus: -1, //-1 all, 0 active, 1 inactive
    };
  }
  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.props.onFilter(
      name === 'filterName' ? value : this.state.filterName,
      name === 'filterStatus' ? value : this.state.filterStatus
    );
    this.setState({[name]:value})
  };
  render() {
    var { tasks } = this.props;
    var elementTask = tasks.map((task, index) => {
      return (
        <TaskItem
          key={task.id}
          task={task}
          index={index}
          onUpdateStatus={this.props.onUpdateStatus}
          onDelete={this.props.onDelete}
          onUpdate={this.props.onUpdate}
        />
      );
    });

    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên</th>
            <th>Trạng Thái</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td>
              <input
                type="text"
                name="filterName"
                className="form-control"
                value={this.state.filterName}
                onChange={this.onChange}
              />
            </td>
            <td>
              <select
                name="filterStatus"
                className="form-control"
                value={this.state.filterStatus}
                onChange={this.onChange}
              >
                <option value="-1">Tất cả</option>
                <option value="0">Ẩn</option>
                <option value="1">Hiện</option>
              </select>
            </td>
            <td></td>
          </tr>
          {elementTask}
        </tbody>
      </table>
    );
  }
}

export default TaskList;
