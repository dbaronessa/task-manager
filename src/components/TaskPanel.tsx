import useTasks from "../hooks/useTasks.ts";
import "../assets/styles/TaskPanel.css"
import {useState} from "react";
import TaskList from "./TaskList.tsx";

function TaskPanel() {
  const {addTask, tasks} = useTasks();
  const [title, setTitle] = useState<string>("");

  const addTaskButton = () => {
    addTask(title);
    setTitle("");
  }

  return (
      <div  className="wrapper">

          <div className="input-div">
              <p>Add task</p>
              <input placeholder="Title" value={title}
                     onChange={(e) => setTitle(e.target.value)}/>
              <button onClick={addTaskButton}>Add Task</button>
          </div>
          <div>
        <TaskList tasks={tasks}/>
          </div>

      </div>
  );
}

export default TaskPanel;

//кнопка добавить, сортировка (все, выполненные, не выполненные), фильтрация по названию задачи)
