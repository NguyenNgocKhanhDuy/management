import React from "react";
import "../assets/style/management.scss";
import blackImg from "../assets/img/black.jpg";

function Management() {
	return (
		<div className="container">
			<div className="sidebar">
				<h2 className="title">obantor</h2>
				<div className="item">
					<i className="fa-solid fa-list-check"></i>
					<span>Task</span>
					<span className="amount">12</span>
				</div>
				<div className="item">
					<i className="fa-solid fa-diagram-project"></i>
					<span>Project</span>
				</div>
				<div className="item">
					<i className="fa-solid fa-pen-to-square"></i>
					<span>Note</span>
				</div>
				<div className="account">
					<img src={blackImg} alt="avatar" className="avatar" />
					<span className="name">Duy Nguyen</span>
					<i className="fa-solid fa-angle-right"></i>
				</div>
			</div>
			<div className="main-container">Right</div>
		</div>
	);
}

export default Management;
