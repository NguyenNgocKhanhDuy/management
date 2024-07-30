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
					<span>Tasks</span>
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
				<div className="content">
					<div className="content-top">
						<div className="date">
							<span className="month">April</span>
							<span className="today">Today is Saturday, April 6th, 2024</span>
						</div>
						<div className="project">
							<span>Project Name</span>
						</div>
						<div className="more">
							<div className="filter box">
								<i className="fa-solid fa-filter"></i>
								<span>Filters</span>
							</div>
							<div className="new box">
								<i className="fa-solid fa-plus"></i>
								<span>Create task</span>
							</div>
						</div>
					</div>
					<div className="content-main">Main</div>
				</div>
			</div>
		</div>
	);
}

export default Management;
