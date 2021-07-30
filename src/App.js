import React from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import Control from "./components/Control";
import TaskList from "./components/TaskList";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isDisplayForm: false,
      taskUpdate: null,
      filter: { name: "", status: -1 },
      keyword: "",
      sort: {
        by: "name",
        value: 1,
      },
    };
  }

  componentWillMount() {
    if (localStorage !== null && localStorage.getItem("tasks") !== null) {
      var tasks = JSON.parse(localStorage.getItem("tasks"));
      this.setState({ tasks: tasks });
    }
  }

  generateData = () => {
    var tasks = [
      {
        id: 1,
        name: "A",
        status: true,
      },
      {
        id: 2,
        name: "B",
        status: false,
      },
      {
        id: 3,
        name: "C",
        status: true,
      },
    ];
    this.setState({
      tasks: tasks,
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  onToggleForm = () => {
    if (this.state.isDisplayForm && this.taskUpdate !== null) {
      this.setState({ isDisplayForm: true, taskUpdate: null });
    } else {
      this.setState({
        isDisplayForm: !this.state.isDisplayForm,
        taskUpdate: null,
      });
    }
  };

  onCloseForm = () => {
    this.setState({ isDisplayForm: false });
  };

  onSubmit = (params) => {
    var { tasks } = this.state;
    if (params.id === null || params.id === "") {
      let task = {
        id: this.generateId(),
        name: params.name,
        status: params.status,
      };
      tasks.push(task);
    } else {
      var index = -1;
      for (var i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        if (task.id === params.id) {
          index = i;
        }
      }
      if (index !== -1) {
        tasks[index] = params;
      }
    }
    this.setState({ tasks: tasks });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  generateId() {
    return (
      Math.random().toString(36).substring(2, 151) +
      "-" +
      Math.random().toString(36).substring(2, 151)
    );
  }

  onUpdateStatus = (params) => {
    var { tasks } = this.state;
    var index = tasks.indexOf(params);
    if (index !== -1) {
      tasks[index].status = !tasks[index].status;
      this.setState({ tasks: tasks });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  };

  onDelete = (params) => {
    var { tasks } = this.state;
    var index = tasks.indexOf(params);
    if (index !== -1) {
      tasks.splice(index, 1);
      this.setState({ tasks: tasks });
      localStorage.setItem("tasks", JSON.stringify(tasks));
      this.onCloseForm();
    }
  };

  onUpdate = (params) => {
    var taskUpdate = {
      id: params.id,
      name: params.name,
      status: params.status,
    };
    this.setState({ taskUpdate: taskUpdate });
    this.onShowForm();
  };

  onShowForm = () => {
    this.setState({ isDisplayForm: true });
  };

  onFilter = (filterName, filterStatus) => {
    filterStatus = parseInt(filterStatus, 10);
    this.setState({
      filter: { name: filterName.toLowerCase(), status: filterStatus },
    });
  };

  onSearch = (params) => {
    this.setState({ keyword: params.toLowerCase() });
  };

  onSort = (by, value) => {
    var sort = { by: by, value: value };
    this.setState({ sort: sort });
  };

  render() {
    var { tasks, isDisplayForm, filter, keyword, sort } = this.state;
    if (filter) {
      if (filter.name) {
        tasks = tasks.filter((task) => {
          return task.name.toLowerCase().indexOf(filter.name) !== -1;
        });
      }
      tasks = tasks.filter((task) => {
        if (filter.status === -1) {
          return true;
        } else {
          var statusBoolean = filter.status === 1 ? true : false;
          return task.status === statusBoolean;
        }
      });
    }

    if (keyword) {
      tasks = tasks.filter((task) => {
        return task.name.toLowerCase().indexOf(keyword) !== -1;
      });
    }

    if (sort.by === "name") {
      tasks.sort((a, b) => {
        if (a.name > b.name) return sort.value;
        else if (a.name < b.name) return -sort.value;
        else return 0;
      });
    } else {
      tasks.sort((a, b) => {
        if (a.status > b.status) return -sort.value;
        else if (a.status < b.status) return sort.value;
        else return 0;
      });
    }

    var elementTaskForm = isDisplayForm ? (
      <TaskForm
        onCloseForm={this.onCloseForm}
        onSubmit={this.onSubmit}
        taskUpdate={this.state.taskUpdate}
      />
    ) : (
      ""
    );

    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản lý công việc</h1>
        </div>

        <div className="row">
          <div className="row">
            {/* Them cong viec Left*/}
            {elementTaskForm}

            {/* Search - Sort */}
            <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.onToggleForm}
                >
                  Thêm công việc
                </button>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.generateData}
                >
                  Generate Data
                </button>
              </div>
              <Control onSearch={this.onSearch} onSort={this.onSort} />
            </div>

            {/* Table */}

            <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8 mt-15">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TaskList
                  tasks={tasks}
                  onUpdateStatus={this.onUpdateStatus}
                  onDelete={this.onDelete}
                  onUpdate={this.onUpdate}
                  onFilter={this.onFilter}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
