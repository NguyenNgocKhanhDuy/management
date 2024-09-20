import React from "react";
import "./modalImageZoom.scss";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "~/firebase/firebase";
import axios from "axios";
import { getToken } from "~/store/localStorage";

function ModalImageZoom(props: any) {
	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			const file = event.target.files[0];

			const storageRef = ref(storage, `images/${file.name}`);
			const uploadTask = uploadBytesResumable(storageRef, file);

			uploadTask.on(
				"state_changed",
				(snapshot) => {
					props.close();
					props.setLoading(true);
					switch (snapshot.state) {
						case "paused":
							console.log("Upload is paused");
							props.setLoading(false);
							props.setErrorMessage("Upload is paused");
							props.setShowError(true);
							break;
						case "running":
							break;
					}
				},
				(error) => {
					console.error("Error uploading file: ", error);
					props.setLoading(false);
					props.setErrorMessage("Error uploading file: ", error);
					props.setShowError(true);
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl: string) => {
						console.log("File available at", downloadUrl);
						handleUpdateAvatar(downloadUrl);
					});
				}
			);
		}
	};

	const handleUpdateAvatar = async (url: string) => {
		console.log(url);

		props.setLoading(true);
		try {
			const response = await axios.put(
				`${process.env.REACT_APP_API_BASE_URL}/users/updateAvatar`,
				{
					avatar: url,
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
				console.log("1");

				props.updateUser();
				props.updateUserHome();
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
		<div className="modalImageZoom" onClick={() => props.close()}>
			<i className="fa-solid fa-xmark modalImageZoom__close" onClick={() => props.close()}></i>
			<div className="modalImageZoom__container">
				<img src={props.src} alt="Image" className="modalImageZoom__image" onClick={(e) => e.stopPropagation()} />
				<button className="modalImageZoom__change" onClick={(e) => e.stopPropagation()}>
					Change Image
				</button>
				<input type="file" accept="image/*" className="modalImageZoom__file" onClick={(e) => e.stopPropagation()} onChange={handleImageChange} />
			</div>
		</div>
	);
}

export default ModalImageZoom;
