import React from 'react';
import "../assets/style/modalCreateTask.scss"

function ModalCreateTask() {
    return (
			<div className="modal">
				<div className="modal-container">
					<i className="fa-solid fa-xmark close"></i>
					<h2 className="title">Create Task</h2>
					<div className="category">
						<input type="text" className="category-name" placeholder="Category..." />
						<select className="category-color">
							<option className="category-color-item" selected value="blue"></option>
							<option className="category-color-item" value="purple"></option>
							<option className="category-color-item" value="orange"></option>
							<option className="category-color-item" value="pink"></option>
						</select>
					</div>

                    <div className="wrapper">
                        <div className="category-test">Category...</div>
                        <input type="date" className="deadline" />
                    </div>

					<input type="text" className="titleInput" placeholder="Task..." />
					<textarea className="desc" placeholder="Description..."></textarea>
					<button className='btn'>Create</button>
				</div>
			</div>
		);
}

export default ModalCreateTask;