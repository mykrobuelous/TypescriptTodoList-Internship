import React, { useRef } from "react";
import "./InputField.css";

interface Props {
	todo: string;
	setTodo: React.Dispatch<React.SetStateAction<string>>;
	handleAdd: (e: React.FormEvent) => void;
}

const InputField: React.FC<Props> = ({ todo, setTodo, handleAdd }: Props) => {
	const inputRef = useRef<HTMLInputElement>(null);

	return (
		<form
			action=""
			className="input"
			onSubmit={(e) => {
				handleAdd(e);
				inputRef.current?.blur();
			}}
		>
			<input
				type="text"
				className="input__box"
				placeholder="Enter a task..."
				onChange={(e) => {
					setTodo(e.target.value);
				}}
				name="todo"
				value={todo}
				ref={inputRef}
			/>
			<button className="input__submit" type="submit">
				Go
			</button>
		</form>
	);
};

export default InputField;
