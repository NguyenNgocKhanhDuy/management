import React from "react";
import "../assets/style/management.scss";
import blackImg from "../assets/img/black.jpg";

function Management() {
	return (
		<div className="container">
			<div className="sidebar">
				<h2 className="title">obantor</h2>
				<div className="item isItemSelected">
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
			<div className="main-container">
				<div className="top">
					<div className="greeting">
						Welcome,
						<br />
						<span className="name">Duy Nguyen</span>
					</div>
					<div className="search">
						<i className="fa-solid fa-magnifying-glass"></i>
						<input type="text" className="searchInput" placeholder="Search here..." />
					</div>
					<div className="notice">
						<i className="fa-regular fa-bell"></i>
						<i className="fa-regular fa-circle-question"></i>
					</div>
				</div>
				<div className="content">Content</div>
			</div>
		</div>
	);
}

export default Management;
