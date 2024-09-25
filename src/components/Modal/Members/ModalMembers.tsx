import React, { useCallback, useEffect, useRef, useState } from "react";
import "./modalMembers.scss";
import axios from "axios";
import blackImg from "~/assets/img/black.jpg";
import debounce from "lodash.debounce";
import { getProjectId } from "~/store/localStorage";
import ModalConfirm from "../Confirm/ModalConfirm";

interface User {
	id: string;
	email: string;
	username: string;
	avatar: string;
	pending: boolean;
}

function ModalMembers(props: any) {
	const [value, setValue] = useState("");
	const resultSearchRef = useRef<HTMLDivElement>(null);
	const debouncedSearchRef = useRef<any>(null);
	const [users, setUsers] = useState<User[]>([]);
	const [members, setMembers] = useState<User[]>([]);
	const [membersId, setMembersId] = useState<string[]>([]);
	const [pendingId, setPendingId] = useState<string[]>([]);
	const [pendings, setPendings] = useState<User[]>([]);
	const [showModalConfirm, setShowModalConfirm] = useState(false);
	const [confirmMessage, setConfirmMessage] = useState("");
	const [confirmSelect, setConfirmSelect] = useState(false);
	const [deleteId, setDeleteId] = useState("");
	const [addMemId, setAddMemId] = useState("");
	const projectId = getProjectId();
	const [creator, setCreator] = useState<User>();
	const [creatorId, setCreatorId] = useState("");
	const [isAddMem, setIsAddMem] = useState(false);

	useEffect(() => {
		handleGetProject();
	}, []);

	useEffect(() => {
		handleGetMembers();
	}, [membersId]);

	useEffect(() => {
		handleGetPending();
	}, [pendingId]);

	useEffect(() => {
		handleGetCreator();
	}, [creatorId]);

	const handleOnChange = (event: any) => {
		setValue(event.target.value);
		if (event.target.value.length > 0) {
			handleShowResultSearch(true);
			debouncedSearchRef.current(event.target.value);
		} else {
			handleShowResultSearch(false);
		}
	};

	const handleShowResultSearch = (show: boolean) => {
		if (resultSearchRef) {
			if (show) {
				resultSearchRef.current?.classList.remove("modal__members-search-result--hide");
			} else {
				resultSearchRef.current?.classList.add("modal__members-search-result--hide");
			}
		}
	};

	if (!debouncedSearchRef.current) {
		debouncedSearchRef.current = debounce((nextValue: string) => {
			handleSearch(nextValue);
		}, 300);
	}

	const handleSearch = async (email: string) => {
		try {
			const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/users/searchNotInProject`, {
				params: {
					email: email,
					idProject: projectId,
				},

				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${props.token}`,
				},
			});

			const data = response.data;
			if (data.status) {
				setUsers(data.result);

				if (data.result.length === 0) {
					handleShowResultSearch(false);
				}
			}
		} catch (error: any) {
			if (error.response) {
				console.error("Error:", error.response.data.message || error.response.data.error);
				props.setErrorMessage(error.response.data.message || error.response.data.error);
				props.setShowError(true);
			} else if (error.request) {
				console.error("Error:", error.request);
				props.setErrorMessage("Failed to connect to server.");
				props.setShowError(true);
			} else {
				console.error("Error:", error.message);
				props.setErrorMessage("An unexpected error occurred: " + error.message);
				props.setShowError(true);
			}
			props.setLoading(false);
		}
	};

	const handleGetProject = async () => {
		console.log("get");

		props.setLoading(true);
		try {
			const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/projects/${projectId}`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${props.token}`,
				},
			});

			const data = response.data;
			if (data.status) {
				setCreatorId(data.result.creator);
				setMembersId(data.result.members);
				setPendingId(data.result.pending);
				props.setLoading(false);
			}
		} catch (error: any) {
			if (error.response) {
				console.error("Error:", error.response.data.message || error.response.data.error);
				props.setErrorMessage(error.response.data.message || error.response.data.error);
				props.setShowError(true);
			} else if (error.request) {
				console.error("Error:", error.request);
				props.setErrorMessage("Failed to connect to server.");
				props.setShowError(true);
			} else {
				console.error("Error:", error.message);
				props.setErrorMessage("An unexpected error occurred: " + error.message);
				props.setShowError(true);
			}
			props.setLoading(false);
		}
	};

	const handleGetUser = async (id: string) => {
		console.log(id);
		try {
			const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/users/${id}`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${props.token}`,
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

	const handleGetCreator = async () => {
		if (creatorId) {
			console.log(creatorId);
			const creatorPromise = handleGetUser(creatorId);
			const creatorUser = await creatorPromise;
			setCreator(creatorUser);
		}
	};

	const handleGetMembers = async () => {
		props.setLoading(true);
		if (membersId) {
			const memberPromise = membersId.map((id: string) => handleGetUser(id));
			const allMembers = await Promise.all(memberPromise);
			setMembers(allMembers);
		}
		props.setLoading(false);
	};

	const handleGetPending = async () => {
		props.setLoading(true);
		if (pendingId) {
			const pendingPromise = pendingId.map((id: string) => handleGetUser(id));
			const allPending = await Promise.all(pendingPromise);
			setPendings(allPending);
		}
		props.setLoading(false);
	};

	useEffect(() => {
		console.log("0");

		if (confirmSelect && deleteId != "") {
			handleDeleteMembers(deleteId);
			setConfirmSelect(false);
		}
		if (confirmSelect && addMemId != "") {
			handleAddMember(addMemId);
			setConfirmSelect(false);
		}
	}, [confirmSelect]);

	const handleSetShowConfirm = (id: string, type: string) => {
		if (type === "delete") {
			setDeleteId(id);
			setConfirmMessage("Do you want to delete?");
			setShowModalConfirm(true);
		} else if (type === "add") {
			setAddMemId(id);
			setConfirmMessage("Do you want to add this user to your project?");
			setShowModalConfirm(true);
		}
	};

	const handleDeleteMembers = async (idMem: string) => {
		props.setLoading(true);
		console.log("1");

		var isMember;
		var isPending;
		if (membersId) {
			isMember = membersId.some((id: string) => id === idMem);
		}
		if (pendingId) {
			isPending = pendingId.some((id: string) => id === idMem);
		}
		if (isMember) {
			const updateMembersId = membersId.filter((id: string) => id !== idMem);
			try {
				const response = await axios.put(
					`${process.env.REACT_APP_API_BASE_URL}/projects/updateMembers`,
					{
						id: projectId,
						members: updateMembersId,
					},
					{
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${props.token}`,
						},
					}
				);
				const data = response.data;
				if (data.status) {
					setDeleteId("");
					handleGetProject();
					props.setLoading(false);
				}
			} catch (error: any) {
				if (error.response) {
					console.error("Error:", error.response.data.message || error.response.data.error);
					props.setErrorMessage(error.response.data.message || error.response.data.error);
					props.setShowError(true);
				} else if (error.request) {
					console.error("Error:", error.request);
					props.setErrorMessage("Failed to connect to server.");
					props.setShowError(true);
				} else {
					console.error("Error:", error.message);
					props.setErrorMessage("An unexpected error occurred: " + error.message);
					props.setShowError(true);
				}
				props.setLoading(false);
			}
		} else if (isPending) {
			const updatePending = pendingId.filter((id: string) => id !== idMem);
			try {
				const response = await axios.put(
					`${process.env.REACT_APP_API_BASE_URL}/projects/updatePending`,
					{
						id: projectId,
						pending: updatePending,
					},
					{
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${props.token}`,
						},
					}
				);
				const data = response.data;
				if (data.status) {
					handleGetProject();
					props.setLoading(false);
				}
			} catch (error: any) {
				if (error.response) {
					console.error("Error:", error.response.data.message || error.response.data.error);
					props.setErrorMessage(error.response.data.message || error.response.data.error);
					props.setShowError(true);
				} else if (error.request) {
					console.error("Error:", error.request);
					props.setErrorMessage("Failed to connect to server.");
					props.setShowError(true);
				} else {
					console.error("Error:", error.message);
					props.setErrorMessage("An unexpected error occurred: " + error.message);
					props.setShowError(true);
				}
				props.setLoading(false);
			}
		}
	};

	const handleAddMember = async (idMem: string) => {
		props.setLoading(true);
		var updatePending;
		if (pendingId != null) {
			updatePending = [...pendingId, idMem];
		} else {
			updatePending = [idMem];
		}

		try {
			const response = await axios.put(
				`${process.env.REACT_APP_API_BASE_URL}/projects/addUserIntoPending`,
				{
					id: projectId,
					pending: updatePending,
				},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${props.token}`,
					},
				}
			);
			const data = response.data;
			if (data.status) {
				setAddMemId("");
				setValue("");
				handleShowResultSearch(false);
				handleGetProject();
				props.setLoading(false);
			}
		} catch (error: any) {
			if (error.response) {
				console.error("Error:", error.response.data.message || error.response.data.error);
				props.setErrorMessage(error.response.data.message || error.response.data.error);
				props.setShowError(true);
			} else if (error.request) {
				console.error("Error:", error.request);
				props.setErrorMessage("Failed to connect to server.");
				props.setShowError(true);
			} else {
				console.error("Error:", error.message);
				props.setErrorMessage("An unexpected error occurred: " + error.message);
				props.setShowError(true);
			}
			props.setLoading(false);
		}
	};

	return (
		<div className="modal__members">
			<div className="modal__members-container">
				<i className="fa-solid fa-xmark modal__members-close" onClick={() => props.close()}></i>
				<h2 className="modal__members-title">Members</h2>
				<div className="modal__members-menu">
					<div className={(isAddMem ? "" : "modal__members-section--active") + " modal__members-section"} onClick={() => setIsAddMem(false)}>
						<span className="modal__members-section-text">Your project</span>
					</div>
					<div className={(isAddMem ? "modal__members-section--active" : "") + " modal__members-section"} onClick={() => setIsAddMem(true)}>
						<span className="modal__members-section-text">Add New Member</span>
					</div>
				</div>
				{isAddMem ? (
					<div className="modal__members-search">
						<div className="modal__members-holder">
							<input type="text" name="project" placeholder="Enter email" value={value} className="modal__members-input" onChange={(e) => handleOnChange(e)} />
						</div>
						<div className="modal__members-search-result modal__members-search-result--hide" ref={resultSearchRef}>
							<div className="modal__members-search-result-list">
								{users?.map((user: User) => (
									<div className="modal__members-search-result-item" key={user.id} onClick={() => handleSetShowConfirm(user.id, "add")}>
										<div className="modal__members-search-result-item-info">
											<img src={user?.avatar} alt="" className="modal__members-search-result-item-avatar" />
											<div className="modal__members-search-result-name">
												<span className="modal__members-item-name">{user.username}</span>
												<span className="modal__members-item-name">{user.email}</span>
											</div>
										</div>
										<i className="fa-solid fa-plus modal__members-item-add"></i>
									</div>
								))}
							</div>
						</div>
						<span className="modal__members-your">Pending</span>
						<div className="modal__members-list">
							{pendings?.map((pending) => (
								<div className="modal__members-item" key={pending.id} onClick={() => handleSetShowConfirm(pending.id, "delete")}>
									<div className="modal__members-item-info">
										<img src={pending.avatar} alt="" className="modal__members-item-avatar" />
										<div className="modal__members-item-nameEmail">
											<span className="modal__members-item-name">{pending.username}</span>
											<span className="modal__members-item-email">{pending.email}</span>
										</div>
									</div>
									<span className="modal__members-item-pending">Pending</span>
									<i className="fa-solid fa-trash modal__members-item-remove" />
								</div>
							))}
						</div>
					</div>
				) : (
					<div>
						<span className="modal__members-creator">Creator</span>
						<div className="modal__members-creatorWrap">
							<div className="modal__members-item">
								<div className="modal__members-item-info">
									<img src={creator?.avatar} alt="" className="modal__members-item-avatar" />
									<div className="modal__members-item-nameEmail">
										<span className="modal__members-item-name">{creator?.username}</span>
										<span className="modal__members-item-email">{creator?.email}</span>
									</div>
								</div>
							</div>
						</div>
						<span className="modal__members-your">Members</span>
						<div className="modal__members-list">
							{members?.map((member) => (
								<div className="modal__members-item" key={member.id} onClick={() => handleSetShowConfirm(member.id, "delete")}>
									<div className="modal__members-item-info">
										<img src={member.avatar} alt="" className="modal__members-item-avatar" />
										<div className="modal__members-item-nameEmail">
											<span className="modal__members-item-name">{member.username}</span>
											<span className="modal__members-item-email">{member.email}</span>
										</div>
									</div>
									{pendingId && pendingId.some((id: string) => id === member.id) ? <span className="modal__members-item-pending">Pending</span> : ""}
									<i className="fa-solid fa-trash modal__members-item-remove" />
								</div>
							))}
						</div>
					</div>
				)}
			</div>
			{showModalConfirm ? <ModalConfirm close={() => setShowModalConfirm(false)} message={confirmMessage} setConfirmSelect={(select: boolean) => setConfirmSelect(select)} /> : ""}
		</div>
	);
}

export default ModalMembers;
