import React, { useEffect, useState } from "react";
import blackImg from "~/assets/img/black.jpg";
import ModalCreateTask from "~/components/Modal/CreateTask/ModalCreateTask";
import "./homePage.scss";
import Management from "~/components/Management/Management";
import Project from "~/components/Project/Project";
import { useSelector } from "react-redux";
import { RootState } from "~/store/store";
import axios from "axios";
import ModalError from "~/components/Modal/Error/ModalError";
import Loading from "~/components/Loading/Loading";
import { formatDateFull, formatMonth } from "~/utils/date";

interface User {
	email: string;
	username: string;
}

function HomePage() {
	const [showModalCreateTask, setShowModalCreateTask] = useState(false);
	const [showModalNewProject, setShowModalNewProject] = useState(false);
	const [isManagement, setIsManagement] = useState(false);
	const [isProject, setIsProject] = useState(true);
	const token = useSelector((state: RootState) => state.user.token);
	const [user, setUser] = useState<User>();
	const [showError, setShowError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		handleGetUser();
	}, []);

	const handleChangeToManagement = (isManagement: boolean) => {
		setIsManagement(isManagement);
		setIsProject(false);
	};

	const handleChangeToProject = (isProject: boolean) => {
		setIsProject(isProject);
		setIsManagement(false);
	};

	const handleGetUser = async () => {
		try {
			const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/users/user`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});

			const data = response.data;
			if (data.status) {
				setUser(data.result);
				setLoading(false);
			}
		} catch (error: any) {
			if (error.response) {
				console.error("Error:", error.response.data.message);
				setErrorMessage(error.response.data.message);
				setShowError(true);
			} else if (error.request) {
				console.error("Error:", error.request);
				setErrorMessage("Failed to connect to server.");
				setShowError(true);
			} else {
				console.error("Error:", error.message);
				setErrorMessage("An unexpected error occurred: " + error.message);
				setShowError(true);
			}
			setLoading(false);
		}
	};

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
							<span className="today">{formatDateFull(new Date())}</span>
							<span className="month">{formatMonth(new Date())}</span>
						</div>
						{isManagement ? (
							<div className="project">
								<span>Project Name</span>
							</div>
						) : (
							""
						)}

						<div className="more">
							{/* <div className="filter box">
								<i className="fa-solid fa-filter"></i>
								<span>Filters</span>
							</div> */}
							{isProject ? (
								<div className="new box" onClick={() => setShowModalNewProject(true)}>
									<i className="fa-solid fa-plus"></i>
									<span>New Project</span>
								</div>
							) : (
								<div className="new box" onClick={() => setShowModalCreateTask(true)}>
									<i className="fa-solid fa-plus"></i>
									<span>Create task</span>
								</div>
							)}
						</div>
					</div>
					{isManagement ? (
						<Management />
					) : isProject ? (
						<Project
							token={token}
							setErrorMessage={(message: string) => setErrorMessage(message)}
							setShowError={(isShow: boolean) => setShowError(isShow)}
							setLoading={(isLoading: boolean) => setLoading(isLoading)}
							showModalNewProject={showModalNewProject}
							setShowModalNewProject={(isShowModal: boolean) => setShowModalNewProject(isShowModal)}
						/>
					) : (
						<div>No</div>
					)}
				</div>
			</div>
			{loading ? <Loading loading={loading} /> : ""}
			{showError ? <ModalError errorMessage={errorMessage} /> : ""}
		</div>
	);
}

export default HomePage;
