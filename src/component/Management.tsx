import React, { useState } from "react";
import TaskStatus from "./TaskStatus";
import "../assets/style/management.scss";

function Management() {
	const [tasks, setTasks] = useState([
			{ id: 1, status: "To Do List", title: "Task 1" },
			{ id: 2, status: "Pending", title: "Task 2" },
			{ id: 3, status: "Done", title: "Task 3" },
	]);

	const moveTask = (id: number, newStatus: string) => {
			setTasks((prevTasks) => prevTasks.map((task) => (task.id === id ? { ...task, status: newStatus } : task)));
	};


	return (
		<div className="management">
			<TaskStatus statusName="To Do List" statusClassName="todo-list" tasks={tasks.filter((task) => task.status === "To Do List")} moveTask={moveTask} />
			<TaskStatus statusName="Pending" statusClassName="pending" tasks={tasks.filter((task) => task.status === "Pending")} moveTask={moveTask} />
			<TaskStatus statusName="Done" statusClassName="done" tasks={tasks.filter((task) => task.status === "Done")} moveTask={moveTask} />
		</div>
	);
}

export default Management;
