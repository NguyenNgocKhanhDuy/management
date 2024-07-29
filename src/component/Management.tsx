import React from "react";
import "../assets/style/base.scss";
import blackImg from "../assets/img/black.jpg";

function Management() {
	return (
		<div>
			<div className="sidebar">
				<h2>obantor</h2>
				<div className="item">
					<i className="fa-solid fa-list-check"></i>
					<span>Task</span>
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
					<div className="info">
						<span className="name">Duy Nguyen</span>
						<span className="email">duynguyenngockhanh@gmail.com</span>
					</div>
				</div>
			</div>
			<div className="main-container"></div>
		</div>
	);
}

export default Management;
