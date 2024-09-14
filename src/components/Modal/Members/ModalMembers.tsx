import React, { useCallback, useRef, useState } from "react";
import "./modalMembers.scss";
import axios from "axios";
import blackImg from "~/assets/img/black.jpg";
import debounce from "lodash.debounce";

interface User {
	id: string;
	email: string;
	username: string;
	avatar: string;
}

function ModalMembers(props: any) {
	const [value, setValue] = useState("");
	const resultSearchRef = useRef<HTMLDivElement>(null);
	const debouncedSearchRef = useRef<any>(null);
	const [users, setUsers] = useState<User[]>();

	const handleOnChange = (event: any) => {
		setValue(event.target.value);
		if (event.target.value.length > 0) {
			handleShowResultSearch(false);
			debouncedSearchRef.current(event.target.value);
		} else {
			handleShowResultSearch(true);
		}
	};

	const handleShowResultSearch = (clear: boolean) => {
		if (resultSearchRef) {
			if (clear) {
				resultSearchRef.current?.classList.add("modal__members-search-result--hide");
			} else {
				resultSearchRef.current?.classList.remove("modal__members-search-result--hide");
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
			const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/users/search?email=${email}`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${props.token}`,
				},
			});

			const data = response.data;
			if (data.status) {
				setUsers(data.result);
			}
		} catch (error: any) {
			if (error.response) {
				console.error("Error:", error.response.data.message);
				props.setErrorMessage(error.response.data.message);
			} else if (error.request) {
				console.error("Error:", error.request);
				props.setErrorMessage("Failed to connect to server.");
			} else {
				console.error("Error:", error.message);
				props.setErrorMessage("An unexpected error occurred: " + error.message);
			}
			props.setShowError(true);
		}
	};

	return (
		<div className="modal__members">
			<div className="modal__members-container">
				<i className="fa-solid fa-xmark modal__members-close" onClick={() => props.close()}></i>
				<h2 className="modal__members-title">Members</h2>
				<div className="modal__members-search">
					<div className="modal__members-holder">
						<input type="text" name="project" placeholder="Enter email" value={value} className="modal__members-input" onChange={(e) => handleOnChange(e)} />
					</div>
					<div className="modal__members-search-result modal__members-search-result--hide" ref={resultSearchRef}>
						<div className="modal__members-search-result-list">
							{users?.map((user: User) => (
								<div className="modal__members-search-result-item" key={user.id}>
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
				</div>
				<span className="modal__members-your">Your Members</span>
				<div className="modal__members-list">
					<div className="modal__members-item">
						<div className="modal__members-item-info">
							<img src={blackImg} alt="" className="modal__members-item-avatar" />
							<span className="modal__members-item-name">John Doe</span>
						</div>
						<i className="fa-solid fa-trash modal__members-item-remove" />
					</div>
				</div>
			</div>
		</div>
	);
}

export default ModalMembers;
