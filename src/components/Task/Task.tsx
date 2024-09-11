import React, { useState } from "react";
import { useDrag } from "react-dnd";
import blackImg from "~/assets/img/black.jpg";
import "./task.scss";
import { formatMonth } from "~/utils/date";

function Task(props: any) {
	const handleFormatDate = (dateString: string) => {
		const date = new Date(dateString);
		return formatMonth(date) + " " + date.getDate();
	};

	return (
		<div className="task-item">
			<div className="task-item-date">
				<i className="fa-solid fa-calendar-days"></i>
				<span className="dateTime">{handleFormatDate(props.date)}</span>
			</div>
			<div className="task-item-content">
				<h2 className="task-item-content-title">{props.name}</h2>
				{/* <p className="task-item-content-desc">IMV official Site - Empower your teams. Take your project data management skills to next level.Concept to...</p> */}
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
				<img src={blackImg} alt="avatar" className="avatar" />
				<div className="more">
					<div className="date">
						<i className="fa-solid fa-flag"></i>
						<span className="dateTime">{handleFormatDate(props.deadline)}</span>
					</div>
					{/* <div className="comment">
						<i className="fa-solid fa-message"></i>
						<span className="amount">2</span>
					</div> */}
				</div>
			</div>
		</div>
	);
}

export default Task;
