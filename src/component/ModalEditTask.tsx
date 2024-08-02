import React, { useRef } from "react";
import "../assets/style/modalEditTask.scss";
import blackImg from "../assets/img/black.jpg";

function ModalEditTask() {

    const inputCategoryRef = useRef<HTMLInputElement>(null);
	const categoryTestRef = useRef<HTMLDivElement>(null);
    const selectColorRef = useRef<HTMLSelectElement>(null);
    

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
						<div className="date">
							<div className="date-create">
								<i className="fa-regular fa-calendar"> :</i>
								2024/4/6
							</div>
							<div className="date-deadline">
								<i className="fa-regular fa-clock"> :</i>
								2024/4/6
							</div>
						</div>
					</div>
					<div className="category">
						<div className="category-text" ref={categoryTestRef}>Category...</div>
						<button className="category-btn">Chỉnh sửa nhãn</button>
					</div>

					<div className="category-edit">
						<input type="text" className="category-edit-name" placeholder="Category..." ref={inputCategoryRef} onInput={handleChangeCategoryTest} />
						<select className="category-edit-color" onChange={handleSelectColor} ref={selectColorRef}>
							<option className="category-edit-color-item" value="cornflowerblue"></option>
							<option className="category-edit-color-item" value="plum"></option>
							<option className="category-edit-color-item" value="orange"></option>
							<option className="category-edit-color-item" value="pink"></option>
						</select>
					</div>

					<div className="desc">
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores numquam quibusdam dolor possimus quam et doloremque dolorum reiciendis nam tempora temporibus eveniet eaque ex natus sed repudiandae inventore, quaerat dolores. Lorem ipsum, dolor sit amet consectetur adipisicing
						elit. Dolores facilis, aspernatur quae architecto laudantium repellendus corporis perferendis quam quasi ipsum unde laborum qui libero vero quaerat quis cumque beatae saepe!
					</div>
				</div>
			</div>
		</div>
	);
}

export default ModalEditTask;
