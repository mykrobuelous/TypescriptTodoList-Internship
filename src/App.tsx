import { useReducer, useState } from "react";
import "./App.css";
import InputField from "./components/InputField/InputField";
import TodoList from "./components/TodoList/TodoList";
import { TodoReducer } from "./Reducer/TodoReducer";
import { Todo } from "./utils/model";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const App: React.FC = () => {
	const initialState: Todo[] = [];
	const [todos, dispatch] = useReducer(TodoReducer, initialState);
	const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);
	const [todo, setTodo] = useState<string>("");

	const handleAdd = (e: React.FormEvent) => {
		e.preventDefault();
		if (todo) {
			dispatch({ type: "add", payload: todo });
		}
		setTodo("");
	};

	const onDragEnd = (result: DropResult) => {
		const { destination, source } = result;

		if (!destination) {
			return;
		}

		if (destination.droppableId === source.droppableId && destination.index === source.index) {
			return;
		}

		let add;
		const active = todos;
		const complete = completedTodos;
		// Source Logic
		if (source.droppableId === "todoslist") {
			add = active[source.index];
			active.splice(source.index, 1);
		} else {
			add = complete[source.index];
			complete.splice(source.index, 1);
		}

		// Destination Logic
		if (destination.droppableId === "todoslist") {
			active.splice(destination.index, 0, add);
		} else {
			complete.splice(destination.index, 0, add);
		}

		setCompletedTodos(complete);
		dispatch({ type: "set", payload: active });
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className="App">
				<span className="heading">Taskify</span>
				<InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
				<TodoList todos={{ completedTodos, notCompletedTodos: todos }} dispatch={dispatch} />
			</div>
		</DragDropContext>
	);
};

export default App;
