import React from "react";
import "./projectItem.scss";
import blackImg from "~/assets/img/black.jpg";

function ProjectItem(props: any) {
	return (
		<div className="project__item">
			<p className="project__item-name">{props.title}</p>
			<div className="project__item-date">
				<i className="fa-solid fa-calendar-days project__item-date-icon"></i>
				<span className="project__item-date-time">April 6</span>
			</div>
			<div className="project__item-creator">
				<span className="project__item-creator-label">Creator</span>
				<div className="project__item-creator-info">
					<img src={blackImg} alt="" className="project__item-creator-avatar" />
					<span className="project__item-creator-name">Duy Nguyen</span>
				</div>
			</div>
			<div className="project__item-member">
				<span className="project__item-member-label">Member</span>
				<div className="project__item-member-list">
					<img src={blackImg} alt="" className="project__item-member-avatar" />
					<img src={blackImg} alt="" className="project__item-member-avatar" />
					<img src={blackImg} alt="" className="project__item-member-avatar" />
					<img src={blackImg} alt="" className="project__item-member-avatar" />
					<img src={blackImg} alt="" className="project__item-member-avatar" />
				</div>
			</div>
		</div>
	);
}

export default ProjectItem;
