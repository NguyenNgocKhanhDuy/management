import React, { useEffect, useState } from "react";
import "./projectItem.scss";
import blackImg from "~/assets/img/black.jpg";
import { formatMonth, isoDateFormat } from "~/utils/date";
import axios from "axios";

interface User {
	id: string;
	email: string;
	username: string;
	avatar: string;
}

function ProjectItem(props: any) {
	const [members, setMembers] = useState<User[] | null>();
	const [creator, setCreator] = useState<User | null>();

	useEffect(() => {
		handleGetMembers();
		handleGetCreator();
	}, []);

	const handleDateFormat = () => {
		const dateIso = props.date;
		const date = isoDateFormat(dateIso);
		return `${formatMonth(date)} ${date.getDate()}, ${date.getFullYear()}`;
	};

	const handleGetUser = async (id: string) => {
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
				console.error("Error:", error.response.data.message);
				props.setErrorMessage(error.response.data.message);
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

	const handleGetCreator = async () => {
		const creatorPromise = handleGetUser(props.creator);
		const creatorUser = await creatorPromise;
		setCreator(creatorUser);
	};

	const handleGetMembers = async () => {
		const memberPromise = props.members.map((id: string) => handleGetUser(id));
		const allMembers = await Promise.all(memberPromise);
		setMembers(allMembers);
	};

	return (
		<div className="project__item">
			<p className="project__item-name">{props.name}</p>
			<div className="project__item-date">
				<i className="fa-solid fa-calendar-days project__item-date-icon"></i>
				<span className="project__item-date-time">{handleDateFormat()}</span>
			</div>
			<div className="project__item-creator">
				<span className="project__item-creator-label">Creator</span>
				<div className="project__item-creator-info">
					<img src={creator?.avatar} alt="" className="project__item-creator-avatar" />
					<span className="project__item-creator-name">{creator?.username}</span>
				</div>
			</div>
			<div className="project__item-member">
				<span className="project__item-member-label">Member</span>
				<div className="project__item-member-list">
					{members?.map((member) => (
						<div className="project__item-member-wrap" key={member.id}>
							<img src={member.avatar} alt="" className="project__item-member-avatar" />
							<span className="project__item-member-name">{member.username}</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default ProjectItem;
