import React, { useRef, useState } from "react";
import "./modalCreateTask.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { getProjectId } from "~/store/localStorage";
import { formatToLocalDateTime } from "~/utils/date";

function ModalCreateTask(props: any) {
	const [date, setDate] = useState<Date | null>(new Date());
	const [taskName, setTaskName] = useState("");

	const handleNewTask = async (event: any) => {
		props.setLoading(true);

		try {
			const response = await axios.post(
				`${process.env.REACT_APP_API_BASE_URL}/tasks/addTask`,
				{
					name: taskName,
					deadline: date ? formatToLocalDateTime(date) : formatToLocalDateTime(new Date()),
					project: getProjectId(),
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
				props.setLoading(false);
				props.handleGetTaskOfProject();
				props.close();
			}
		} catch (error: any) {
			if (error.response) {
				console.error("Error:", error.response.data.message);
				props.setErrorMessage(error.response.data.message);
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

	return (
		<div className="modal">
			<div className="modal-container">
				<i className="fa-solid fa-xmark close" onClick={() => props.close()}></i>
				<h2 className="title">Create Task</h2>
				<input type="text" className="titleInput" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
				<div className="deadline">
					<span>Deadline: </span>
					<DatePicker selected={date} onChange={(date) => setDate(date)} showTimeSelect dateFormat="MMMM do YYYY, hh:mm" className="date-time" showYearDropdown yearDropdownItemNumber={100} scrollableYearDropdown />
				</div>

				<button className="btn" onClick={handleNewTask}>
					Create
				</button>
			</div>
		</div>
	);
}

export default ModalCreateTask;
