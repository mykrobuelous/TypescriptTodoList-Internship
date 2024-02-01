import { useReducer, useState } from "react";
import "./App.css";
import InputField from "./components/InputField/InputField";
import TodoList from "./components/TodoList/TodoList";
import { TodoReducer } from "./Reducer/TodoReducer";
import { Todo } from "./utils/model";
import { DragDropContext } from "react-beautiful-dnd";

const App: React.FC = () => {
	const initialState: Todo[] = [];
	const [todos, dispatch] = useReducer(TodoReducer, initialState);
	const [todo, setTodo] = useState<string>("");

	const handleAdd = (e: React.FormEvent) => {
		e.preventDefault();
		if (todo) {
			dispatch({ type: "add", payload: todo });
		}
		setTodo("");
	};

	return (
		<DragDropContext onDragEnd={() => {}}>
			<div className="App">
				<span className="heading">Taskify</span>
				<InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
				<TodoList todos={todos} dispatch={dispatch} />
			</div>
		</DragDropContext>
	);
};

export default App;
