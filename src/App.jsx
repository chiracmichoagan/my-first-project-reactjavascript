import  { useState } from "react";
import Header from "./components/Header";

export default function App() {
  const [tasks, setTasks] = useState([
    { id: "todo-0", name: "Eat", completed: true },
    { id: "todo-1", name: "Sleep", completed: false },
    { id: "todo-2", name: "Repeat", completed: false },
  ]);

  const [newTaskName, setNewTaskName] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskName, setEditingTaskName] = useState("");
  const [filter, setFilter] = useState("all");

  const addTask = (e) => {
    e.preventDefault();
    if (newTaskName.trim() === "") return;
    const newTask = {
      id: `todo-${Date.now()}`,
      name: newTaskName,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setNewTaskName("");
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const editTask = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    setEditingTaskId(id);
    setEditingTaskName(taskToEdit.name);
  };

  const saveTask = () => {
    const updatedTasks = tasks.map((task) =>
      task.id === editingTaskId ? { ...task, name: editingTaskName } : task
    );
    setTasks(updatedTasks);
    setEditingTaskId(null);
    setEditingTaskName("");
  };

  const toggleTaskCompleted = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true; // "all"
  });

  return (
    <div>
    <Header></Header>
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Todo list</h1>
      <form onSubmit={addTask} className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Entrer votre Todo"
          className="input input-bordered w-full"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
        />
        <button type="submit" className="btn btn-primary rounded-2xl">
          Ajouter
        </button>
      </form>
      <div className="flex justify-center gap-4 mb-6">
        <button
          className={`btn ${filter === "all" ? "btn-active" : ""}`}
          onClick={() => setFilter("all")}
        >
          Tous
        </button>
        <button
          className={`btn ${filter === "active" ? "btn-active" : ""}`}
          onClick={() => setFilter("active")}
        >
          Active
        </button>
        <button
          className={`btn ${filter === "completed" ? "btn-active" : ""}`}
          onClick={() => setFilter("completed")}
        >
          Terminé
        </button>
      </div>

      <div className="flex flex-wrap justify-around">
        {filteredTasks.map((task) => (
          <div key={task.id} className="card bg-base-100 w-96 shadow-xl m-4">
            {" "}
            {/* Ajout de marges pour espacer les cartes */}
            <figure>
              <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Todo Image" // Remplacez par une image pertinente si nécessaire
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {task.name}
                <div className="badge badge-secondary">
                  {task.completed ? "Completed" : "Pending"}
                </div>
              </h2>
              <p>{task.description || "No description available."}</p>
              <div className="card-actions justify-end">
                <input
                  type="checkbox"
                  className="checkbox mr-4"
                  checked={task.completed}
                  onChange={() => toggleTaskCompleted(task.id)}
                />
                {editingTaskId === task.id ? (
                  <input
                    type="text"
                    className="input input-bordered"
                    value={editingTaskName}
                    onChange={(e) => setEditingTaskName(e.target.value)}
                  />
                ) : (
                  <span
                    className={`${
                      task.completed ? "line-through text-gray-500" : ""
                    }`}
                  >
                    {task.name}
                  </span>
                )}
                {editingTaskId === task.id ? (
                  <button className="btn btn-secondary" onClick={saveTask}>
                    Save
                  </button>
                ) : (
                  <button
                    className="btn btn-warning"
                    onClick={() => editTask(task.id)}
                  >
                    Edit
                  </button>
                )}
                <button
                  className="btn btn-error"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}
