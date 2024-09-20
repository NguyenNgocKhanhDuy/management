import React, { useEffect, useRef, useState } from "react";
import "./modalEditTask.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Checkbox from "@mui/material/Checkbox";
import { TextareaAutosize } from "@mui/material";
import axios from "axios";
import { formatMonth } from "~/utils/date";
import ModalConfirm from "../Confirm/ModalConfirm";

interface SubTask {
	id: string;
	title: string;
	completed: boolean;
	isEditable: boolean;
}

interface User {
	id: string;
	email: string;
	username: string;
	avatar: string;
}

interface Task {
	creator: string;
	date: string;
	deadline: Date;
	id: string;
	members: string[];
	name: string;
	project: string;
	status: number;
}

function ModalEditTask(props: any) {
	const [deadline, setDeadline] = useState<Date | null>();
	const [subtasks, setSubtasks] = useState<SubTask[]>([]);
	const [task, setTask] = useState<Task>();
	const [creator, setCreator] = useState<User>();
	const [taskName, setTaskName] = useState("");
	const [enableEditTaskName, setEnableEditTaskName] = useState(false);
	const [showModalConfirm, setShowModalConfirm] = useState(false);
	const [confirmMessage, setConfirmMessage] = useState("");
	const [confirmSelect, setConfirmSelect] = useState(false);
	const [percentage, setPercentage] = useState(100);

	useEffect(() => {
		handleGetSubTasks();
		handleGetTask();
		setCreator(props.creator);
	}, []);

	const handleChangeDateFormat = (dateString: string) => {
		const date = new Date(dateString);
		return formatMonth(date) + " " + date.getDate() + ", " + date.getFullYear();
	};

	const handleChangeTitleSubTask = async (newText: string, id: string) => {
		const updateSubTask = subtasks.map((subtask) => {
			if (subtask.id === id) {
				return { ...subtask, title: newText };
			}
			return subtask;
		});
		setSubtasks(updateSubTask);
	};

	const handleSubmitEdit = async (id: string, newText: string) => {
		props.setLoading(true);
		try {
			const response = await axios.put(
				`${process.env.REACT_APP_API_BASE_URL}/subtasks/updateSubtaskTitle`,
				{
					id: id,
					title: newText,
				},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${props.token}`,
					},
				}
			);

			const data = response.data;
			if (data.status) {
				handleGetSubTasks();
				handleEnableEditSubTask(id, false);
				props.setLoading(false);
			}
		} catch (error: any) {
			if (error.response) {
				console.error("Error:", error.response.data.message || error.response.data.error);
				props.setErrorMessage(error.response.data.message || error.response.data.error);
			} else if (error.request) {
				console.error("Error:", error.request);
				props.setErrorMessage("Failed to connect to server.");
			} else {
				console.error("Error:", error.message);
				props.setErrorMessage("An unexpected error occurred: " + error.message);
			}
			props.setShowError(true);
			props.setLoading(false);
		}
	};

	const handleCheckSubtask = async (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
		props.setLoading(true);
		try {
			const response = await axios.put(
				`${process.env.REACT_APP_API_BASE_URL}/subtasks/updateSubtaskStatus`,
				{
					id: id,
					completed: event.target.checked,
				},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${props.token}`,
					},
				}
			);

			const data = response.data;
			if (data.status) {
				handleGetSubTasks();
				props.setLoading(false);
			}
		} catch (error: any) {
			if (error.response) {
				console.error("Error:", error.response.data.message || error.response.data.error);
				props.setErrorMessage(error.response.data.message || error.response.data.error);
			} else if (error.request) {
				console.error("Error:", error.request);
				props.setErrorMessage("Failed to connect to server.");
			} else {
				console.error("Error:", error.message);
				props.setErrorMessage("An unexpected error occurred: " + error.message);
			}
			props.setShowError(true);
			props.setLoading(false);
		}
	};

	const handleEnableEditSubTask = (id: string, isEditable: boolean) => {
		const updateSubTask = subtasks.map((subtask) => {
			if (subtask.id === id) {
				return { ...subtask, isEditable: isEditable };
			}
			return subtask;
		});
		setSubtasks(updateSubTask);
	};

	const handleDeleteSubTask = async (id: string) => {
		props.setLoading(true);
		const updateSubTask = subtasks.filter((subtask) => subtask.id !== id);
		setSubtasks(updateSubTask);

		try {
			const response = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/subtasks/${id}`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${props.token}`,
				},
			});

			const data = response.data;
			if (data.status) {
				handleGetSubTasks();
				props.setLoading(false);
			}
		} catch (error: any) {
			if (error.response) {
				console.error("Error:", error.response.data.message || error.response.data.error);
				props.setErrorMessage(error.response.data.message || error.response.data.error);
			} else if (error.request) {
				console.error("Error:", error.request);
				props.setErrorMessage("Failed to connect to server.");
			} else {
				console.error("Error:", error.message);
				props.setErrorMessage("An unexpected error occurred: " + error.message);
			}
			props.setShowError(true);
			props.setLoading(false);
		}
	};

	const handleNewSubTask = async () => {
		props.setLoading(true);
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_API_BASE_URL}/subtasks/addSubtask`,
				{
					title: `New Task ${subtasks.length + 1}`,
					completed: false,
					task: props.taskId,
				},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${props.token}`,
					},
				}
			);

			const data = response.data;
			if (data.status) {
				handleGetSubTasks();
				props.setLoading(false);
			}
		} catch (error: any) {
			if (error.response) {
				console.error("Error:", error.response.data.message || error.response.data.error);
				props.setErrorMessage(error.response.data.message || error.response.data.error);
			} else if (error.request) {
				console.error("Error:", error.request);
				props.setErrorMessage("Failed to connect to server.");
			} else {
				console.error("Error:", error.message);
				props.setErrorMessage("An unexpected error occurred: " + error.message);
			}
			props.setShowError(true);
			props.setLoading(false);
		}
	};

	const handleGetSubTasks = async () => {
		props.setLoading(true);
		try {
			const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/subtasks/${props.taskId}`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${props.token}`,
				},
			});

			const data = response.data;
			if (data.status) {
				if (data.result.length > 0) {
					setSubtasks(data.result);
					const taskCompleted = data.result.filter((task: SubTask) => task.completed === true);
					const totalTask = data.result.length;
					const totalCompleted = taskCompleted.length;
					const percentCompleted = (totalCompleted / totalTask) * 100;
					setPercentage(percentCompleted);
				}
				props.setLoading(false);
			}
		} catch (error: any) {
			if (error.response) {
				console.error("Error:", error.response.data.message || error.response.data.error);
				props.setErrorMessage(error.response.data.message || error.response.data.error);
			} else if (error.request) {
				console.error("Error:", error.request);
				props.setErrorMessage("Failed to connect to server.");
			} else {
				console.error("Error:", error.message);
				props.setErrorMessage("An unexpected error occurred: " + error.message);
			}
			props.setShowError(true);
			props.setLoading(false);
		}
	};

	useEffect(() => {
		const percentBar = document.querySelector(".modal-edit__progress-capacity") as HTMLSpanElement;
		if (percentBar) {
			percentBar.style.width = percentage + "%";
		}
	}, [percentage]);

	const handleGetTask = async () => {
		props.setLoading(true);
		try {
			const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/tasks/${props.taskId}`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${props.token}`,
				},
			});

			const data = response.data;
			if (data.status) {
				setTask(data.result);
				setDeadline(data.result.deadline);
				setTaskName(data.result.name);
				props.setLoading(false);
			}
		} catch (error: any) {
			if (error.response) {
				console.error("Error:", error.response.data.message || error.response.data.error);
				props.setErrorMessage(error.response.data.message || error.response.data.error);
			} else if (error.request) {
				console.error("Error:", error.request);
				props.setErrorMessage("Failed to connect to server.");
			} else {
				console.error("Error:", error.message);
				props.setErrorMessage("An unexpected error occurred: " + error.message);
			}
			props.setShowError(true);
			props.setLoading(false);
		}
	};

	const handleUpdateTaskName = async () => {
		props.setLoading(true);
		try {
			const response = await axios.put(
				`${process.env.REACT_APP_API_BASE_URL}/tasks/updateTaskName`,
				{
					id: props.taskId,
					name: taskName,
				},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${props.token}`,
					},
				}
			);

			const data = response.data;
			if (data.status) {
				handleGetTask();
				setEnableEditTaskName(false);
				props.handleGetTaskOfProject();
				props.setLoading(false);
			}
		} catch (error: any) {
			if (error.response) {
				console.error("Error:", error.response.data.message || error.response.data.error);
				props.setErrorMessage(error.response.data.message || error.response.data.error);
			} else if (error.request) {
				console.error("Error:", error.request);
				props.setErrorMessage("Failed to connect to server.");
			} else {
				console.error("Error:", error.message);
				props.setErrorMessage("An unexpected error occurred: " + error.message);
			}
			props.setShowError(true);
			props.setLoading(false);
		}
	};

	const handleDeleteTask = async () => {
		props.setLoading(true);
		try {
			const response = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/tasks/${props.taskId}`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${props.token}`,
				},
			});

			const data = response.data;
			if (data.status) {
				props.close();
				props.handleGetTaskOfProject();
				props.setLoading(false);
			}
		} catch (error: any) {
			if (error.response) {
				console.error("Error:", error.response.data.message || error.response.data.error);
				props.setErrorMessage(error.response.data.message || error.response.data.error);
			} else if (error.request) {
				console.error("Error:", error.request);
				props.setErrorMessage("Failed to connect to server.");
			} else {
				console.error("Error:", error.message);
				props.setErrorMessage("An unexpected error occurred: " + error.message);
			}
			props.setShowError(true);
			props.setLoading(false);
		}
	};

	useEffect(() => {
		if (confirmSelect) {
			handleDeleteTask();
			setConfirmSelect(false);
		}
	}, [confirmSelect]);

	const handleShowModalConfirm = () => {
		setConfirmMessage("Do you want to delete?");
		setShowModalConfirm(true);
	};

	const handleClose = (e: any) => {
		e.stopPropagation();
		props.close();
	};

	return (
		<div>
			<div className="modal-edit">
				<div className="modal-edit__container">
					<i className="fa-solid fa-xmark modal-edit__close" onClick={handleClose}></i>
					<input type="text" className="modal-edit__input-taskName" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
					<div className="modal-edit__info">
						<div className="modal-edit__creator">
							<img src={creator?.avatar} alt="avatar-creator" className="modal-edit__creator-avatar" />
							<p className="modal-edit__creator-name">{creator?.username}</p>
						</div>
						<div className="modal-edit__date-create">
							<i className="fa-regular fa-calendar"> :</i>
							{task && <span>{handleChangeDateFormat(task.date)}</span>}
						</div>
					</div>
					<div className="modal-edit__wrap">
						<div className="modal-edit__date-deadline">
							<i className="fa-regular fa-clock"> :</i>
							<DatePicker selected={deadline} onChange={(date) => setDeadline(date)} showTimeSelect dateFormat="MMMM do YYYY, hh:mm" className="modal-edit__date-deadline-date-time" showYearDropdown yearDropdownItemNumber={100} scrollableYearDropdown />
						</div>
						<button className="modal-edit__new-subtask" onClick={handleNewSubTask}>
							New subtask
						</button>
					</div>
					<div className="modal-edit__modify">
						{!enableEditTaskName ? (
							<button className="modal-edit__rename-task" onClick={() => setEnableEditTaskName(true)}>
								Rename Task
							</button>
						) : (
							<button className="modal-edit__rename-task" onClick={handleUpdateTaskName}>
								Save Name Task
							</button>
						)}
						<button className="modal-edit__delete-task" onClick={handleShowModalConfirm}>
							Delete Task
						</button>
					</div>
					<div className="modal-edit__progress">
						<div className="modal-edit__progress-text">
							<span>Progress</span>
							<span className="modal-edit__progress-percentage">{percentage}%</span>
						</div>
						<span className="modal-edit__progress-full"></span>
						<span className="modal-edit__progress-capacity"></span>
					</div>
					<div className="modal-edit__subtask">
						{subtasks.map((subtask: SubTask) => (
							<div className="modal-edit__subtask-item" key={subtask.id}>
								<Checkbox checked={subtask.completed} className="modal-edit__subtask-item-checkbox" onChange={(e) => handleCheckSubtask(e, subtask.id)} />
								<TextareaAutosize className={(subtask.completed ? "modal-edit__subtask-item-text--done" : "") + " modal-edit__subtask-item-text"} value={subtask.title} onChange={(e) => handleChangeTitleSubTask(e.target.value, subtask.id)} readOnly={!subtask.isEditable} />
								<div className="modal-edit__subtask-item-action">
									{subtask.isEditable ? <i className="fa-solid fa-check" onClick={() => handleSubmitEdit(subtask.id, subtask.title)}></i> : <i className="fa-solid fa-pen-to-square" onClick={() => handleEnableEditSubTask(subtask.id, true)}></i>}
									<i className="fa-solid fa-trash" onClick={() => handleDeleteSubTask(subtask.id)}></i>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
			{showModalConfirm ? <ModalConfirm close={() => setShowModalConfirm(false)} message={confirmMessage} setConfirmSelect={(select: boolean) => setConfirmSelect(select)} /> : ""}
		</div>
	);
}

export default ModalEditTask;
