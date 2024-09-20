import React, { useEffect, useState } from "react";
import "./task.scss";
import { formatMonth } from "~/utils/date";
import axios from "axios";
import ModalEditTask from "../Modal/EditTask/ModalEditTask";
import { Draggable } from "react-beautiful-dnd";

interface User {
	id: string;
	email: string;
	username: string;
	avatar: string;
}

function Task(props: any) {
	const [creator, setCreator] = useState<User | null>();
	const [showModalEditTask, setShowModalEditTask] = useState(false);
	const [taskId, setTaskId] = useState("");

	useEffect(() => {
		handleGetCreator();
	}, []);

	const handleGetUser = async (id: string) => {
		try {
			const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/users/${id}`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${props.token}`,
				},
			});

			const data = response.data;
			if (data.status) {
				return data.result;
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

	const handleGetCreator = async () => {
		const creatorPromise = handleGetUser(props.creator);
		const creatorUser = await creatorPromise;
		setCreator(creatorUser);
	};

	const handleFormatDate = (dateString: string) => {
		const date = new Date(dateString);
		return formatMonth(date) + " " + date.getDate();
	};

	const handleEditTask = () => {
		setTaskId(props.id);
		setShowModalEditTask(true);
	};

	return showModalEditTask ? (
		<div className="task-item" onClick={handleEditTask}>
			<div className="task-item-date">
				<i className="fa-solid fa-calendar-days"></i>
				<span className="dateTime">{handleFormatDate(props.date)}</span>
			</div>
			<div className="task-item-content">
				<h2 className="task-item-content-title">{props.name}</h2>
			</div>
			<div className="task-item-progress">
				<div className="status">
					<h2 className="title">Progress</h2>
					<span className="percentage">50%</span>
				</div>
				<div className="line">
					<span className="full"></span>
					<span className="capacity"></span>
				</div>
			</div>
			<div className="task-item-bottom">
				<div className="task-item-bottom-wrap">
					<img src={creator?.avatar} alt="avatar" className="avatar" />
					<span className="task-item-bottom-name">{creator?.username}</span>
				</div>
				<div className="more">
					<div className="date">
						<i className="fa-solid fa-flag"></i>
						<span className="dateTime">{handleFormatDate(props.deadline)}</span>
					</div>
				</div>
			</div>
			{showModalEditTask ? (
				<ModalEditTask
					token={props.token}
					close={() => setShowModalEditTask(false)}
					creator={creator}
					taskId={taskId}
					setErrorMessage={(message: string) => props.setErrorMessage(message)}
					setShowError={(isShow: boolean) => props.setShowError(isShow)}
					setLoading={(isLoading: boolean) => props.setLoading(isLoading)}
					handleGetTaskOfProject={() => props.handleGetTaskOfProject()}
				/>
			) : (
				""
			)}
		</div>
	) : (
		<Draggable draggableId={props.id} index={props.position}>
			{(provided) => (
				<div className="task-item" onClick={handleEditTask} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
					<div className="task-item-date">
						<i className="fa-solid fa-calendar-days"></i>
						<span className="dateTime">{handleFormatDate(props.date)}</span>
					</div>
					<div className="task-item-content">
						<h2 className="task-item-content-title">{props.name}</h2>
					</div>
					<div className="task-item-bottom">
						<div className="task-item-bottom-wrap">
							<img src={creator?.avatar} alt="avatar" className="avatar" />
							<span className="task-item-bottom-name">{creator?.username}</span>
						</div>
						<div className="more">
							<div className="date">
								<i className="fa-solid fa-flag"></i>
								<span className="dateTime">{handleFormatDate(props.deadline)}</span>
							</div>
						</div>
					</div>
					{showModalEditTask ? (
						<ModalEditTask
							token={props.token}
							close={() => setShowModalEditTask(false)}
							creator={creator}
							taskId={taskId}
							setErrorMessage={(message: string) => props.setErrorMessage(message)}
							setShowError={(isShow: boolean) => props.setShowError(isShow)}
							setLoading={(isLoading: boolean) => props.setLoading(isLoading)}
							handleGetTaskOfProject={() => props.handleGetTaskOfProject()}
						/>
					) : (
						""
					)}
				</div>
			)}
		</Draggable>
	);

	// return (
	// 	<Draggable draggableId={props.id} index={props.position}>
	// 		{(provided) => (
	// 			<div className="task-item" onClick={handleEditTask} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
	// 				<div className="task-item-date">
	// 					<i className="fa-solid fa-calendar-days"></i>
	// 					<span className="dateTime">{handleFormatDate(props.date)}</span>
	// 				</div>
	// 				<div className="task-item-content">
	// 					<h2 className="task-item-content-title">{props.name}</h2>
	// 					{/* <p className="task-item-content-desc">IMV official Site - Empower your teams. Take your project data management skills to next level.Concept to...</p> */}
	// 				</div>
	// 				<div className="task-item-progress">
	// 					<div className="status">
	// 						<h2 className="title">Progress</h2>
	// 						<span className="percentage">50%</span>
	// 					</div>
	// 					<div className="line">
	// 						<span className="full"></span>
	// 						<span className="capacity"></span>
	// 					</div>
	// 				</div>
	// 				<div className="task-item-bottom">
	// 					<div className="task-item-bottom-wrap">
	// 						<img src={creator?.avatar} alt="avatar" className="avatar" />
	// 						<span className="task-item-bottom-name">{creator?.username}</span>
	// 					</div>
	// 					<div className="more">
	// 						<div className="date">
	// 							<i className="fa-solid fa-flag"></i>
	// 							<span className="dateTime">{handleFormatDate(props.deadline)}</span>
	// 						</div>
	// 						{/* <div className="comment">
	// 					<i className="fa-solid fa-message"></i>
	// 					<span className="amount">2</span>
	// 				</div> */}
	// 					</div>
	// 				</div>
	// 				{showModalEditTask ? (
	// 					<ModalEditTask
	// 						token={props.token}
	// 						close={() => setShowModalEditTask(false)}
	// 						creator={creator}
	// 						taskId={taskId}
	// 						setErrorMessage={(message: string) => props.setErrorMessage(message)}
	// 						setShowError={(isShow: boolean) => props.setShowError(isShow)}
	// 						setLoading={(isLoading: boolean) => props.setLoading(isLoading)}
	// 						handleGetTaskOfProject={() => props.handleGetTaskOfProject()}
	// 					/>
	// 				) : (
	// 					""
	// 				)}
	// 			</div>
	// 		)}
	// 	</Draggable>
	// );
}

export default Task;
