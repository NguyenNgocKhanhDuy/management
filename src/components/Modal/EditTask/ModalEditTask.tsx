import React, { useRef, useState } from "react";
import "./modalEditTask.scss";
import blackImg from "~/assets/img/black.jpg";
import DatePicker  from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import Checkbox from '@mui/material/Checkbox';
import { TextareaAutosize } from "@mui/material";

interface SubTask {
	id: number;
	text: string;
	isCompleted: boolean;
	isEditable: boolean;
}

function ModalEditTask() {
	const inputCategoryRef = useRef<HTMLInputElement>(null);
	const categoryTestRef = useRef<HTMLDivElement>(null);
	const selectColorRef = useRef<HTMLSelectElement>(null);
	const [isEditCategory, setIsEditCategory] = useState(false);
	const [deadline, setDeadline] = useState<Date | null>(new Date());
	const [subtask, setSubTask] = useState<SubTask[]>([
		{ id: 1, text: "Task 1", isCompleted: false, isEditable: false },
		{ id: 2, text: "Task 2", isCompleted: true, isEditable: false },
		{ id: 3, text: "Task 3", isCompleted: false, isEditable: false },
		{ id: 4, text: "Task 4", isCompleted: false, isEditable: false },
		{
			id: 5,
			text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores numquam quibusdam dolor possimus quam et doloremque dolorum reiciendis nam tempora temporibus eveniet eaque ex natus sed repudiandae inventore, quaerat dolores. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores facilis, aspernatur quae architecto laudantium repellendus corporis perferendis quam quasi ipsum unde laborum qui libero vero quaerat quis cumque beatae saepe!",
			isCompleted: true,
			isEditable: false,
		},
		{ id: 6, text: "Task 6", isCompleted: true, isEditable: false },
	]);

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

	const handleEditSubTask = (newText:string, id:number) => {
		const updateSubTask = subtask.map(subtask => {
			if (subtask.id === id) {
                return {...subtask, text: newText };
            }
            return subtask;
		})
		setSubTask(updateSubTask);
	}

	const handleEnableEditSubTask = (id:number, isEditable : boolean) => {
		const updateSubTask = subtask.map(subtask => {
			if (subtask.id === id) {
                return {...subtask, isEditable: isEditable };
            }
            return subtask;
		})
		setSubTask(updateSubTask);
	}

	const handleDeleteSubTask = (id: number) => {
        const updateSubTask = subtask.filter(subtask => subtask.id !== id);
        setSubTask(updateSubTask); 
	}
	
	const handleNewSubTask = () => {
		const newSubTask = { id: subtask.length + 1, text: `New Task ${subtask.length + 1}`, isCompleted: false, isEditable: false};
        setSubTask([...subtask, newSubTask]);
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
					<div className="desc">
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores numquam quibusdam dolor possimus quam et doloremque dolorum reiciendis nam tempora temporibus eveniet eaque ex natus sed repudiandae inventore, quaerat dolores. Lorem ipsum, dolor sit amet consectetur adipisicing
						elit. Dolores facilis, aspernatur quae architecto laudantium repellendus corporis perferendis quam quasi ipsum unde laborum qui libero vero quaerat quis cumque beatae saepe!
					</div>
					<div className="wrap">
						<div className="date-deadline">
							<i className="fa-regular fa-clock"> :</i>
							<DatePicker selected={deadline} onChange={(date) => setDeadline(date)} showTimeSelect dateFormat="MMMM do YYYY, hh:mm:ss a" className="date-time" showYearDropdown yearDropdownItemNumber={100} scrollableYearDropdown />
						</div>
						<button className="new-subtask" onClick={handleNewSubTask}>New subtask</button>
					</div>
					<div className="progress">
						<div className="text">
							<span>Progress</span>
							<span className="percentage">50%</span>
						</div>
						<span className="full"></span>
						<span className="capacity"></span>
					</div>
					<div className="subtask">
						{subtask.map((subtask: SubTask) => (
							<div className="subtask-item" key={subtask.id}>
								<Checkbox checked={subtask.isCompleted} className="subtask-item-checkbox" />
								<TextareaAutosize className="subtask-item-text" value={subtask.text} onChange={(e) => handleEditSubTask(e.target.value, subtask.id)} readOnly={!subtask.isEditable} />
								<div className="action">
									{subtask.isEditable ?
										<i className="fa-solid fa-check" onClick={() => handleEnableEditSubTask(subtask.id, false)} ></i>
										:
										<i className="fa-solid fa-pen-to-square" onClick={() => handleEnableEditSubTask(subtask.id, true)} ></i>}
									
									<i className="fa-solid fa-trash" onClick={() => handleDeleteSubTask(subtask.id)}></i>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default ModalEditTask;
