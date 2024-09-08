import React, { useEffect, useState } from "react";
import blackImg from "~/assets/img/black.jpg";
import ModalCreateTask from "~/components/Modal/CreateTask/ModalCreateTask";
import "./homePage.scss";
import Management from "~/components/Management/Management";
import Project from "~/components/Project/Project";
import { useSelector } from "react-redux";
import { RootState } from "~/store/store";

interface User {
	email: string;
	username: string;
}

function HomePage() {
	const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);
	const [isManagement, setIsManagement] = useState(false);
	const [isProject, setIsProject] = useState(true);
	const token = useSelector((state: RootState) => state.user.token);
	const [user, setUser] = useState<User>();

	const handleOpenCloseModalCreate = (isOpen: boolean) => {
		setIsOpenModalCreate(isOpen);
	};

	const handleChangeToManagement = (isManagement: boolean) => {
		setIsManagement(isManagement);
		setIsProject(false);
	};

	const handleChangeToProject = (isProject: boolean) => {
		setIsProject(isProject);
		setIsManagement(false);
	};

	const handleGetDate = () => {
		const today = new Date();
		const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		const dayOfWeek = daysOfWeek[today.getDay()];
		const month = months[today.getMonth()];
		const day = today.getDate();
		const year = today.getFullYear();
		const suffix = day === 1 || day === 21 || day === 31 ? "st" : day === 2 || day === 22 ? "nd" : day === 3 || day === 23 ? "rd" : "th";

		return `Today is ${dayOfWeek}, ${month} ${day}${suffix}, ${year}`;
	};

	const handleGetMonth = () => {
		const today = new Date();
		const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		const month = months[today.getMonth()];
		return month;
	};

	const handleGetUser = async () => {
		try {
			const response = await fetch("http://localhost:8080/users/user", {
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			});

			if (!response.ok) {
				console.log("Network response was not ok");
			}

			const data = await response.json();

			if (!data.status) {
				console.log(data.message);
			} else {
				setUser(data.result);
			}
		} catch (error) {
			console.log("ERROR: ", error);
		}
	};

	useEffect(() => {
		handleGetUser();
	}, []);

	return (
		<div className="container">
			<div className="sidebar">
				<h2 className="title">Management</h2>
				<div className={(isProject ? "isItemSelected" : "") + " item"} onClick={() => handleChangeToProject(true)}>
					<i className="fa-solid fa-diagram-project"></i>
					<span>Project</span>
				</div>
				<div className={(isManagement ? "isItemSelected" : "") + " item"} onClick={() => handleChangeToManagement(true)}>
					<i className="fa-solid fa-list-check"></i>
					<span>Tasks</span>
					<span className="amount">12</span>
				</div>
				<div className="account">
					<img src={blackImg} alt="avatar" className="avatar" />
					<span className="name">{user ? user.username : "Username"}</span>
					<i className="fa-solid fa-angle-right"></i>
				</div>
			</div>
			<div className="main-container">
				<div className="top">
					<div className="greeting">
						Welcome,
						<br />
						<span className="name">{user ? user.username : "Username"}</span>
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
							<span className="month">{handleGetMonth()}</span>
							<span className="today">{handleGetDate()}</span>
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
					{isManagement ? <Management /> : isProject ? <Project /> : <div>No</div>}
				</div>
			</div>
			{isOpenModalCreate ? <ModalCreateTask handleClose={() => handleOpenCloseModalCreate(false)} /> : ""}
		</div>
	);
}

export default HomePage;
