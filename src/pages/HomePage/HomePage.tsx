import React, { useEffect, useState } from "react";
import blackImg from "~/assets/img/black.jpg";
import "./homePage.scss";
import Management from "~/components/Management/Management";
import Project from "~/components/Project/Project";
import axios from "axios";
import ModalError from "~/components/Modal/Error/ModalError";
import Loading from "~/components/Loading/Loading";
import { dateShort, formatDateFull, formatMonth } from "~/utils/date";
import { getProjectId, getToken, removeProjectId } from "~/store/localStorage";
import ModalConfirm from "~/components/Modal/Confirm/ModalConfirm";

interface User {
	email: string;
	username: string;
}

function HomePage() {
	const [showModalCreateTask, setShowModalCreateTask] = useState(false);
	const [showModalNewProject, setShowModalNewProject] = useState(false);
	const [showModalMembers, setShowModalMembers] = useState(false);
	const [isManagement, setIsManagement] = useState(false);
	const [isProject, setIsProject] = useState(true);
	const token = getToken();
	const [user, setUser] = useState<User>();
	const [showError, setShowError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const [projectName, setProjectName] = useState("Project Name");
	const [isSelectproject, setIsSelectproject] = useState(false);
	const [editProjectName, setEditProjectName] = useState(false);
	const [showModalConfirm, setShowModalConfirm] = useState(false);
	const [confirmMessage, setConfirmMessage] = useState("");
	const [confirmSelect, setConfirmSelect] = useState(false);

	useEffect(() => {
		handleGetUser();
	}, []);

	useEffect(() => {
		if (isManagement) {
			handleGetProjectName();
		}
	}, [isManagement]);

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
				console.error("Error:", error.response.data.message || error.response.data.error);
				setErrorMessage(error.response.data.message || error.response.data.error);
			} else if (error.request) {
				console.error("Error:", error.request);
				setErrorMessage("Failed to connect to server.");
			} else {
				console.error("Error:", error.message);
				setErrorMessage("An unexpected error occurred: " + error.message);
			}
			setShowError(true);
			setLoading(false);
		}
	};

	const handleUpdateProjectName = async () => {
		try {
			const response = await axios.put(
				`${process.env.REACT_APP_API_BASE_URL}/projects/updateName`,
				{
					id: getProjectId(),
					name: projectName,
				},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);

			const data = response.data;
			if (data.status) {
				setLoading(false);
				setEditProjectName(false);
			}
		} catch (error: any) {
			if (error.response) {
				console.error("Error:", error.response.data.message || error.response.data.error);
				setErrorMessage(error.response.data.message || error.response.data.error);
			} else if (error.request) {
				console.error("Error:", error.request);
				setErrorMessage("Failed to connect to server.");
			} else {
				console.error("Error:", error.message);
				setErrorMessage("An unexpected error occurred: " + error.message);
			}
			setShowError(true);
			setLoading(false);
		}
	};

	const handleGetProjectName = async () => {
		try {
			const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/projects/${getProjectId()}`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});

			const data = response.data;
			if (data.status) {
				console.log("ok");
				console.log(data.result);

				setProjectName(data.result.name);
				setLoading(false);
			}
		} catch (error: any) {
			if (error.response) {
				console.error("Error:", error.response.data.message || error.response.data.error);
				setErrorMessage(error.response.data.message || error.response.data.error);
			} else if (error.request) {
				console.error("Error:", error.request);
				setErrorMessage("Failed to connect to server.");
			} else {
				console.error("Error:", error.message);
				setErrorMessage("An unexpected error occurred: " + error.message);
			}
			setLoading(false);
			setShowError(true);
		}
	};

	const handleChangeToEdit = () => {
		setEditProjectName(true);

		const inputElement = document.querySelector(".project-name-input") as HTMLInputElement;

		if (inputElement) {
			inputElement.focus();
		}
	};

	useEffect(() => {
		if (confirmSelect) {
			handleDeleteProject();
		}
	}, [confirmSelect]);

	const handleSetShowConfirm = () => {
		setConfirmMessage("Do you want to delete?");
		setShowModalConfirm(true);
	};

	const handleDeleteProject = async () => {
		try {
			const response = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/projects/${getProjectId()}`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});

			const data = response.data;
			if (data.status) {
				setLoading(false);
				setIsManagement(false);
				setIsProject(true);
				removeProjectId();
			}
		} catch (error: any) {
			if (error.response) {
				console.error("Error:", error.response.data.message || error.response.data.error);
				setErrorMessage(error.response.data.message || error.response.data.error);
			} else if (error.request) {
				console.error("Error:", error.request);
				setErrorMessage("Failed to connect to server.");
			} else {
				console.error("Error:", error.message);
				setErrorMessage("An unexpected error occurred: " + error.message);
			}
			setShowError(true);
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
							{isProject ? (
								<div className="today">{formatDateFull(new Date())}</div>
							) : (
								<div className="date-wrap">
									<div className="today">{dateShort(new Date())}</div>
									<div className="new box" onClick={handleSetShowConfirm}>
										<i className="fa-solid fa-minus"></i>
										<span>DeleteProject</span>
									</div>
								</div>
							)}
						</div>
						{isManagement ? (
							<div className="project">
								<input type="text" className="project-name-input" value={projectName} readOnly={!editProjectName} onChange={(e) => setProjectName(e.target.value)} />
								<span className="project-name-edit">{editProjectName ? <i className="fa-solid fa-check" onClick={handleUpdateProjectName}></i> : <i className="fa-solid fa-pen-to-square" onClick={handleChangeToEdit}></i>}</span>
							</div>
						) : (
							""
						)}

						<div className="more">
							{isManagement ? (
								<div className="filter box" onClick={() => setShowModalMembers(true)}>
									<i className="fa-solid fa-users"></i>
									<span>Members</span>
								</div>
							) : (
								""
							)}

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
						<Management
							token={token}
							setErrorMessage={(message: string) => setErrorMessage(message)}
							setShowError={(isShow: boolean) => setShowError(isShow)}
							setLoading={(isLoading: boolean) => setLoading(isLoading)}
							showModalCreateTask={showModalCreateTask}
							closeModalCreateTask={() => setShowModalCreateTask(false)}
							showModalMembers={showModalMembers}
							closeModalMembers={() => setShowModalMembers(false)}
							isSelectProject={() => setIsSelectproject(true)}
						/>
					) : isProject ? (
						<Project
							token={token}
							setErrorMessage={(message: string) => setErrorMessage(message)}
							setShowError={(isShow: boolean) => setShowError(isShow)}
							setLoading={(isLoading: boolean) => setLoading(isLoading)}
							showModalNewProject={showModalNewProject}
							closeModalNewProject={() => setShowModalNewProject(false)}
							hide={() => setIsProject(false)}
							showManagement={() => setIsManagement(true)}
							setProjectName={(name: string) => setProjectName(name)}
						/>
					) : (
						<div>No</div>
					)}
				</div>
			</div>
			{loading ? <Loading loading={loading} /> : ""}
			{showError ? <ModalError close={() => setShowError(false)} isSelectProject={isSelectproject} errorMessage={errorMessage} hide={() => setIsManagement(false)} showProject={() => setIsProject(true)} /> : ""}
			{showModalConfirm ? <ModalConfirm close={() => setShowModalConfirm(false)} message={confirmMessage} setConfirmSelect={(select: boolean) => setConfirmSelect(select)} /> : ""}
		</div>
	);
}

export default HomePage;
