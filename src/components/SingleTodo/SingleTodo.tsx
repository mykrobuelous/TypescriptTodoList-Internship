import React, { useEffect, useRef, useState } from "react";
import { Todo } from "../../utils/model";
import "./SingleTodo.css";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Actions } from "../../Reducer/TodoReducer";
import { Draggable } from "react-beautiful-dnd";

type Props = {
	todo: Todo;
	dispatch: React.Dispatch<Actions>;
	index: number;
};

const SingleTodo: React.FC<Props> = ({ todo, dispatch, index }) => {
	const [edit, setEdit] = useState<boolean>(false);
	const [editTodo, setEditTodo] = useState<string>(todo.todo);

	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		inputRef.current?.focus();
	}, [edit]);

	const handleDone = (id: string) => {
		dispatch({ type: "done", payload: id });
	};

	const handleDelete = (id: string) => {
		dispatch({ type: "remove", payload: id });
	};

	const handleEdit = (e: React.FormEvent, id: string) => {
		e.preventDefault();
		dispatch({ type: "edit", payload: { id: id, text: editTodo } });
		setEdit(false);
	};

	return (
		<Draggable draggableId={todo.id} index={index}>
			{(provided, snapshot) => (
				<form
					className={`todos__single ${snapshot.isDragging ? "drag" : ""}`}
					onSubmit={(e) => handleEdit(e, todo.id)}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
				>
					{edit ? (
						<input
							ref={inputRef}
							value={editTodo}
							onChange={(e) => {
								setEditTodo(e.target.value);
							}}
							className="todos__single--text"
						/>
					) : todo.isDone ? (
						<s className="todos__single--text">{todo.todo}</s>
					) : (
						<span className="todos__single--text">{todo.todo}</span>
					)}

					<div>
						<span
							className="icon"
							onClick={() => {
								if (!todo.isDone) setEdit((prevState) => !prevState);
							}}
						>
							<AiFillEdit />
						</span>
						<span className="icon" onClick={() => handleDelete(todo.id)}>
							<AiFillDelete />
						</span>
						<span
							className="icon"
							onClick={() => {
								if (!edit) handleDone(todo.id);
							}}
						>
							<MdDone />
						</span>
					</div>
				</form>
			)}
		</Draggable>
	);
};

export default SingleTodo;
