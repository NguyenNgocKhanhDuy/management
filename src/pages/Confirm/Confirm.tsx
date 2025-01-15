import React, { useEffect, useState } from "react";
import "./confirm.scss";
import { useSearchParams } from "react-router-dom";
import Loading from "~/components/Loading/Loading";
import axios from "axios";

export default function Confirm() {
	const [searchParams] = useSearchParams();
	const [errorMessage, setErrorMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const [showButton, setShowButton] = useState(true);
	const [text, setText] = useState("");

	const token = searchParams.get("token");

	useEffect(() => {
		setText("Please to accept the invitation");
		handleGetProject();
	}, []);

	const handleAccept = async () => {
		setLoading(true);
		try {
			const response = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/projects/userAcceptPendingURL?token=${token}`, {
				headers: {
					"Content-Type": "application/json",
				},
			});

			const data = response.data;

			if (data.status) {
				setText("Accept Successfully");
				setErrorMessage("");
				setShowButton(false);
				setLoading(false);
			}
		} catch (error: any) {
			if (error.response) {
				console.error("Error:", error.response.data.message || error.response.data.error);
				setErrorMessage(error.response.data.message || error.response.data.error);
			} else if (error.request) {
				console.error("Failed to connect to server." + error.message);
				setErrorMessage("Failed to connect to server.");
			} else {
				console.error("An unexpected error occurred: " + error.message);
				setErrorMessage("An unexpected error occurred: " + error.message);
			}
			setLoading(false);
		}
	};

	const handleGetProject = async () => {
		setLoading(true);
		try {
			const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/projects/id?token=${token}`, {
				headers: {
					"Content-Type": "application/json",
				},
			});

			const data = response.data;

			if (data.status) {
				if (data.result.pending == null) {
					setText("The Invitation is invalid");
					setErrorMessage("");
					setShowButton(false);
				}
				setLoading(false);
			}
		} catch (error: any) {
			if (error.response) {
				console.error("Error:", error.response.data.message || error.response.data.error);
				setErrorMessage(error.response.data.message || error.response.data.error);
			} else if (error.request) {
				console.error("Failed to connect to server." + error.message);
				setErrorMessage("Failed to connect to server.");
			} else {
				console.error("An unexpected error occurred: " + error.message);
				setErrorMessage("An unexpected error occurred: " + error.message);
			}
			setLoading(false);
		}
	};

	const handleReject = async () => {
		setLoading(true);
		try {
			const response = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/projects/userRejectPendingURL?token=${token}`, {
				headers: {
					"Content-Type": "application/json",
				},
			});

			const data = response.data;

			if (data.status) {
				setText("Reject Successfully");
				setErrorMessage("");
				setShowButton(false);
				setLoading(false);
			}
		} catch (error: any) {
			if (error.response) {
				console.error("Error:", error.response.data.message || error.response.data.error);
				setErrorMessage(error.response.data.message || error.response.data.error);
			} else if (error.request) {
				console.error("Failed to connect to server." + error.message);
				setErrorMessage("Failed to connect to server.");
			} else {
				console.error("An unexpected error occurred: " + error.message);
				setErrorMessage("An unexpected error occurred: " + error.message);
			}
			setLoading(false);
		}
	};

	return (
		<div className="confirm">
			<div className="confirm-content">
				<h3 className="confirm-title">Notice</h3>
				<p className="confirm-text">{text}</p>

				{showButton ? (
					<div className="confirm-action">
						<div className="confirm-button confirm-button__accept" onClick={handleAccept}>
							Accept
						</div>
						<div className="confirm-button confirm-button__reject" onClick={handleReject}>
							Reject
						</div>
					</div>
				) : (
					""
				)}

				<div className={(errorMessage == "" ? "confirm__error--hidden" : "") + " confirm__error"}>
					<p className="confirm__error-message">{errorMessage}</p>
				</div>
			</div>
			{loading ? <Loading loading={loading} /> : ""}
		</div>
	);
}
