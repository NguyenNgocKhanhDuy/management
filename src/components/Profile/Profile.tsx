import React, { useEffect, useState } from "react";
import "./profile.scss";
import blackImg from "~/assets/img/black.jpg";
import axios from "axios";
import { getToken, removeEmail, removeProjectId, removeToken, saveEmail, setIsForgotPass } from "~/store/localStorage";
import { useNavigate } from "react-router-dom";
import ModalImageZoom from "../Modal/ImageZoom/ModalImageZoom";

interface User {
	id: string;
	email: string;
	username: string;
	avatar: string;
}

interface Project {
	id: string;
	name: string;
	creator: string;
	date: string;
}

function Profile(props: any) {
	const [user, setUser] = useState<User>();
	const [usernameValue, setUsernameValue] = useState("");
	const [isEdit, setIsEdit] = useState(false);
	const [projects, setProjects] = useState<Project[]>([]);
	const [creatorsId, setCreatorsId] = useState<string[]>();
	const [creators, setCreators] = useState<User[]>();
	const [showModalImage, setShowModalImage] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		handleGetUser();
		handleGetInvitation();
	}, []);

	const handleGetUser = async () => {
		props.setLoading(true);
		try {
			const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/users/user`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${getToken()}`,
				},
			});

			const data = response.data;
			if (data.status) {
				setUser(data.result);
				setUsernameValue(data.result.username);
				props.setLoading(false);
			}
		} catch (error: any) {
			if (error.response) {
				console.error("Error:", error.response.data.message || error.response.data.error);
				props.setErrorMessage(error.response.data.message || error.response.data.error);
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

	const handleUpdateUsername = async () => {
		props.setLoading(true);
		try {
			const response = await axios.put(
				`${process.env.REACT_APP_API_BASE_URL}/users/updateUsername`,
				{
					username: usernameValue,
				},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${getToken()}`,
					},
				}
			);

			const data = response.data;
			if (data.status) {
				setUsernameValue(data.result.username);
				props.updateUser();
				props.setLoading(false);
			}
		} catch (error: any) {
			if (error.response) {
				console.error("Error:", error.response.data.message || error.response.data.error);
				props.setErrorMessage(error.response.data.message || error.response.data.error);
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

	const handleClickUpdateUsername = () => {
		handleUpdateUsername();
		setIsEdit(false);
	};

	const handleChangePassword = async (event: any) => {
		event.preventDefault();
		if (user != null) {
			props.setLoading(true);
			try {
				const response = await axios.post(
					`${process.env.REACT_APP_API_BASE_URL}/users/sendCodeToUser`,
					{
						email: user.email,
					},

					{
						headers: {
							"Content-Type": "application/json",
						},
					}
				);

				const data = response.data;
				if (data.status) {
					saveEmail(user.email);
					setIsForgotPass(true);
					navigate("/verifyEmail");
				}
			} catch (error: any) {
				if (error.response) {
					console.error("Error:", error.response.data.message || error.response.data.error);
					props.setErrorMessage(error.response.data.message || error.response.data.error);
				} else if (error.request) {
					props.setErrorMessage("Failed to connect to server.");
				} else {
					props.setErrorMessage("An unexpected error occurred: " + error.message);
				}
				props.setShowError(true);
				props.setLoading(false);
			}
		} else {
			console.log("null");
			props.setErrorMessage("User null");
			props.setShowError(true);
			props.setLoading(false);
		}
	};

	const handleGetInvitation = async () => {
		props.setLoading(true);
		try {
			const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/projects/projectHasPendingUser`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${getToken()}`,
				},
			});

			const data = response.data;
			if (data.status) {
				setProjects(data.result);
				const creatorList = data.result.map((project: Project) => project.creator);
				setCreatorsId(creatorList);
				props.setLoading(false);
			}
		} catch (error: any) {
			if (error.response) {
				console.error("Error:", error.response.data.message || error.response.data.error);
				props.setErrorMessage(error.response.data.message || error.response.data.error);
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

	useEffect(() => {
		handleGetCreator();
	}, [creatorsId]);

	const handleGetCreator = async () => {
		if (creatorsId) {
			const creatorPromise = creatorsId.map((id: string) => handleGetUserById(id));
			const allCreators = await Promise.all(creatorPromise);
			setCreators(allCreators);
		}
	};

	const handleGetUserById = async (id: string) => {
		try {
			const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/users/${id}`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${getToken()}`,
				},
			});

			const data = response.data;
			if (data.status) {
				return data.result;
			}
		} catch (error: any) {
			if (error.response) {
				console.error("Error:", error.response.data.message || error.response.data.error);
				props.setErrorMessage(error.response.data.message || error.response.data.error);
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

	const handleRejectInvitation = async (projectId: string) => {
		props.setLoading(true);
		try {
			const response = await axios.put(
				`${process.env.REACT_APP_API_BASE_URL}/projects/userRejectPending`,
				{
					id: projectId,
				},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${getToken()}`,
					},
				}
			);

			const data = response.data;
			if (data.status) {
				handleGetInvitation();
				props.setLoading(false);
			}
		} catch (error: any) {
			if (error.response) {
				console.error("Error:", error.response.data.message || error.response.data.error);
				props.setErrorMessage(error.response.data.message || error.response.data.error);
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

	const handleAcceptInvitation = async (projectId: string) => {
		props.setLoading(true);
		try {
			const response = await axios.put(
				`${process.env.REACT_APP_API_BASE_URL}/projects/userAcceptPending`,
				{
					id: projectId,
				},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${getToken()}`,
					},
				}
			);

			const data = response.data;
			if (data.status) {
				handleGetInvitation();
				props.setLoading(false);
			}
		} catch (error: any) {
			if (error.response) {
				console.error("Error:", error.response.data.message || error.response.data.error);
				props.setErrorMessage(error.response.data.message || error.response.data.error);
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

	const handleLogOut = () => {
		removeEmail();
		removeProjectId();
		removeToken();
		navigate("/login");
	};

	return (
		<div className="profile">
			<div className="profile__logout">
				<button className="profile__logout-btn" onClick={handleLogOut}>
					Log out
				</button>
			</div>
			<div className="profile__avatar">
				<img src={user?.avatar} className="profile__avatar-img" onClick={() => setShowModalImage(true)} />
			</div>
			<form className="profile__details">
				<div className="profile__holder">
					<div className="profile__info">
						<label className="profile__label">Email:</label>
						<input type="email" className="profile__input" value={user?.email} />
					</div>
					<i className="fa-solid fa-pen-to-square profile__info--hide"></i>
				</div>
				<div className="profile__holder">
					<div className="profile__info">
						<label className="profile__label">Username:</label>
						<input type="text" className="profile__input" value={usernameValue} readOnly={!isEdit} onChange={(e) => setUsernameValue(e.target.value)} />
					</div>
					{isEdit ? <i className="fa-solid fa-check" onClick={handleClickUpdateUsername}></i> : <i className="fa-solid fa-pen-to-square" onClick={() => setIsEdit(true)}></i>}
				</div>
				<button className="profile__changePass" onClick={(e) => handleChangePassword(e)}>
					Change password
				</button>
			</form>
			<div className="profile__invitation">
				<h2 className="profile__invitation-title">Invitation</h2>
				<div className="profile__invitation-list">
					{projects.map((project: Project) => (
						<div className="profile__invitation-item" key={project.id}>
							<div className="profile__invitation-item-info">
								<div className="profile__invitation-item-project">{project.name}</div>
								<div className="profile__invitation-item-creator">
									<img src={creators?.find((u: User) => u.id === project.creator)?.avatar} alt="" className="profile__invitation-item-creator-avatar" />
									<div className="profile__invitation-item-creator-nameWrap">
										<span className="profile__invitation-item-creator-name">{creators?.find((u: User) => u.id === project.creator)?.username}</span>
										<span className="profile__invitation-item-creator-email">{creators?.find((u: User) => u.id === project.creator)?.email}</span>
									</div>
								</div>
							</div>
							<div className="profile__invitation-item-action">
								<i className="fa-solid fa-check" onClick={() => handleAcceptInvitation(project.id)}></i>
								<i className="fa-solid fa-xmark" onClick={() => handleRejectInvitation(project.id)}></i>
							</div>
						</div>
					))}
				</div>
			</div>
			{showModalImage ? (
				<ModalImageZoom
					src={user?.avatar}
					close={() => setShowModalImage(false)}
					updateUser={handleGetUser}
					updateUserHome={() => props.updateUser()}
					setErrorMessage={(message: string) => props.setErrorMessage(message)}
					setShowError={(isShow: boolean) => props.setShowError(isShow)}
					setLoading={(isLoading: boolean) => props.setLoading(isLoading)}
				/>
			) : (
				""
			)}
		</div>
	);
}

export default Profile;
