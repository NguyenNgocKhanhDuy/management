import React, {useRef} from 'react';
import "../assets/style/modalCreateTask.scss"

function ModalCreateTask(props : any) {

	const inputCategoryRef = useRef<HTMLInputElement>(null);
	const categoryTestRef = useRef<HTMLDivElement>(null);
	const selectColorRef = useRef<HTMLSelectElement>(null);


	const handleClose = () => {
		props.handleClose();
	}

	const handleChangeCategoryTest = () => {
		if (inputCategoryRef.current && categoryTestRef.current) {
			var text = inputCategoryRef.current.value;
			categoryTestRef.current.innerText = text.length > 0 ? text : "Category...";
		}
	}

	const handleSelectColor = (event: any) => {
		if (selectColorRef.current && categoryTestRef.current) {
			selectColorRef.current.style.backgroundColor = event.target.value;
			categoryTestRef.current.style.backgroundColor = event.target.value;
		}
	}



    return (
			<div className="modal">
				<div className="modal-container">
					<i className="fa-solid fa-xmark close" onClick={handleClose}></i>
					<h2 className="title">Create Task</h2>
					<div className="category">
						<input type="text" className="category-name" placeholder="Category..." ref={inputCategoryRef} onInput={handleChangeCategoryTest} />
						<select className="category-color" onChange={handleSelectColor} ref={selectColorRef}>
							<option className="category-color-item" selected value="cornflowerblue"></option>
							<option className="category-color-item" value="plum"></option>
							<option className="category-color-item" value="orange"></option>
							<option className="category-color-item" value="pink"></option>
						</select>
					</div>

					<div className="wrapper">
						<div className="category-test" ref={categoryTestRef}>
							Category...
						</div>
						<input type="date" className="deadline" />
					</div>

					<input type="text" className="titleInput" placeholder="Task..." />
					<textarea className="desc" placeholder="Description..."></textarea>
					<button className="btn" onClick={handleClose}>Create</button>
				</div>
			</div>
		);
}

export default ModalCreateTask;