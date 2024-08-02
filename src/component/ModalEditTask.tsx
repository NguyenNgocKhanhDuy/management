import React, { useRef, useState } from "react";
import "../assets/style/modalEditTask.scss";
import blackImg from "../assets/img/black.jpg";
import DatePicker  from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

function ModalEditTask() {
	const inputCategoryRef = useRef<HTMLInputElement>(null);
	const categoryTestRef = useRef<HTMLDivElement>(null);
	const selectColorRef = useRef<HTMLSelectElement>(null);
	const [isEditCategory, setIsEditCategory] = useState(false);
	const [deadline, setDeadline] = useState<Date | null>(new Date());

	const handleChangeCategoryTest = () => {
		if (inputCategoryRef.current && categoryTestRef.current) {
			var text = inputCategoryRef.current.value;
			categoryTestRef.current.innerText = text.length > 0 ? text : "Category...";
		}
	};

	const handleSelectColor = (event: any) => {
		if (selectColorRef.current && categoryTestRef.current) {
			selectColorRef.current.style.backgroundColor = event.target.value;
			categoryTestRef.current.style.backgroundColor = event.target.value;
		}
	};

	const handleChangeDateFormat = (dateString : string) => {
		const date = new Date(dateString);
		const formatDate = format(date, 'MMMM do, yyyy');
		return formatDate;
	}

	return (
		<div>
			<div className="modal-edit">
				<div className="modal-edit-container">
					<i className="fa-solid fa-xmark close"></i>
					<h2>Task Name</h2>
					<div className="info">
						<div className="creator">
							<img src={blackImg} alt="avatar-creator" className="avatar" />
							<p className="name">Nguyen Ngoc Khanh Duy</p>
						</div>
						<div className="date-create">
							<i className="fa-regular fa-calendar"> :</i>
							<span>{handleChangeDateFormat("2024-08-02")}</span>
						</div>
					</div>
					<div className="category">
						<div className="category-text" ref={categoryTestRef}>
							Category...
						</div>
						<button
							className="category-btn"
							onClick={() => {
								setIsEditCategory(!isEditCategory);
							}}
						>
							{isEditCategory ? "Save Change" : "Edit Tag"}
						</button>
					</div>

					{isEditCategory ? (
						<div className="category-edit">
							<input type="text" className="category-edit-name" placeholder="Category..." ref={inputCategoryRef} onInput={handleChangeCategoryTest} />
							<select className="category-edit-color" onChange={handleSelectColor} ref={selectColorRef}>
								<option className="category-edit-color-item" value="cornflowerblue"></option>
								<option className="category-edit-color-item" value="plum"></option>
								<option className="category-edit-color-item" value="orange"></option>
								<option className="category-edit-color-item" value="pink"></option>
							</select>
						</div>
					) : (
						""
					)}
					<div className="desc">
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores numquam quibusdam dolor possimus quam et doloremque dolorum reiciendis nam tempora temporibus eveniet eaque ex natus sed repudiandae inventore, quaerat dolores. Lorem ipsum, dolor sit amet consectetur adipisicing
						elit. Dolores facilis, aspernatur quae architecto laudantium repellendus corporis perferendis quam quasi ipsum unde laborum qui libero vero quaerat quis cumque beatae saepe!
					</div>
					<div className="date-deadline">
						<i className="fa-regular fa-clock"> :</i>
						<DatePicker selected={deadline} onChange={(date) => setDeadline(date)} showTimeSelect dateFormat="MMMM do YYYY, hh:mm:ss a" className="date-time" showYearDropdown yearDropdownItemNumber={100} scrollableYearDropdown />
					</div>
				</div>
			</div>
		</div>
	);
}

export default ModalEditTask;
