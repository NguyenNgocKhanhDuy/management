import React, { useState } from "react";
import blackImg from "../assets/img/black.jpg";
import "../assets/style/task.scss";

function Task(props: any) {
	return (
		<div className="task-item">
			<div className="task-item-category">Data</div>
			<div className="task-item-content">
				<h2 className="task-item-content-title">Data Presentation Of IMV</h2>
				<p className="task-item-content-desc">IMV official Site - Empower your teams. Take your project data management skills to next level.Concept to...</p>
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
						<span className="dateTime">April 6</span>
					</div>
					<div className="comment">
						<i className="fa-solid fa-message"></i>
						<span className="amount">2</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Task;
