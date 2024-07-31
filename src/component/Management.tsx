import React, { useState } from "react";
import "../assets/style/management.scss";
import blackImg from "../assets/img/black.jpg";
import ModalCreateTask from "./ModalCreateTask";

function Management() {

	const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);

	const handleOpenCloseModalCreate = (isOpen: boolean) => {
		setIsOpenModalCreate(isOpen);
	}


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
							<div className="new box" onClick={() => handleOpenCloseModalCreate(true)}>
								<i className="fa-solid fa-plus"></i>
								<span>Create task</span>
							</div>
						</div>
					</div>
					<div className="content-main">
						<div className="todo-list-section section">
							<h2 className="name">To do list</h2>
							<i className="fa-solid fa-plus add" onClick={() => handleOpenCloseModalCreate(true)}></i>
							<div className="list">
								<div className="item">
									<div className="item-category">Data</div>
									<div className="item-content">
										<h2 className="item-content-title">Data Presentation Of IMV</h2>
										<p className="item-content-desc">IMV official Site - Empower your teams. Take your project data management skills to next level.Concept to...</p>
									</div>
									<div className="item-progress">
										<div className="status">
											<h2 className="title">Progress</h2>
											<span className="percentage">50%</span>
										</div>
										<div className="line">
											<span className="full"></span>
											<span className="capacity"></span>
										</div>
									</div>
									<div className="item-bottom">
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
							</div>
						</div>
						<div className="progress-section section">
							<h2 className="name">Progress</h2>
							<i className="fa-solid fa-plus add" onClick={() => handleOpenCloseModalCreate(true)}></i>
							<div className="list">
								<div className="item">
									<div className="item-category">Data</div>
									<div className="item-content">
										<h2 className="item-content-title">Data Presentation Of IMV</h2>
										<p className="item-content-desc">IMV official Site - Empower your teams. Take your project data management skills to next level.Concept to...</p>
									</div>
									<div className="item-progress">
										<div className="status">
											<h2 className="title">Progress</h2>
											<span className="percentage">50%</span>
										</div>
										<div className="line">
											<span className="full"></span>
											<span className="capacity"></span>
										</div>
									</div>
									<div className="item-bottom">
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
							</div>
						</div>
						<div className="review-section section">
							<h2 className="name">In Review</h2>
							<i className="fa-solid fa-plus add" onClick={() => handleOpenCloseModalCreate(true)}></i>
							<div className="list">
								<div className="item">
									<div className="item-category">Data</div>
									<div className="item-content">
										<h2 className="item-content-title">Data Presentation Of IMV</h2>
										<p className="item-content-desc">IMV official Site - Empower your teams. Take your project data management skills to next level.Concept to...</p>
									</div>
									<div className="item-progress">
										<div className="status">
											<h2 className="title">Progress</h2>
											<span className="percentage">50%</span>
										</div>
										<div className="line">
											<span className="full"></span>
											<span className="capacity"></span>
										</div>
									</div>
									<div className="item-bottom">
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
							</div>
						</div>
						<div className="done-section section">
							<h2 className="name">Done</h2>
							<i className="fa-solid fa-plus add" onClick={() => handleOpenCloseModalCreate(true)}></i>
							<div className="list">
								<div className="item">
									<div className="item-category">Data</div>
									<div className="item-content">
										<h2 className="item-content-title">Data Presentation Of IMV</h2>
										<p className="item-content-desc">IMV official Site - Empower your teams. Take your project data management skills to next level.Concept to...</p>
									</div>
									<div className="item-progress">
										<div className="status">
											<h2 className="title">Progress</h2>
											<span className="percentage">50%</span>
										</div>
										<div className="line">
											<span className="full"></span>
											<span className="capacity"></span>
										</div>
									</div>
									<div className="item-bottom">
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
							</div>
						</div>
					</div>
				</div>
			</div>
			{isOpenModalCreate ? <ModalCreateTask handleClose={() => handleOpenCloseModalCreate(false)} /> : ""}
		</div>
	);
}

export default Management;
