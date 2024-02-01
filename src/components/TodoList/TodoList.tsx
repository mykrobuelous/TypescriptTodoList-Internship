import { Droppable } from "react-beautiful-dnd";
import { Actions } from "../../Reducer/TodoReducer";
import { Todo } from "../../utils/model";
import SingleTodo from "../SingleTodo/SingleTodo";
import "./TodoList.css";

interface Props {
	todos: Todo[];
	dispatch: React.Dispatch<Actions>;
}

const TodoList: React.FC<Props> = ({ todos, dispatch }) => {
	const completedTodos = todos.filter((todo) => todo.isDone === true);
	const notCompletedTodos = todos.filter((todo) => todo.isDone === false);
	return (
		<div className="container">
			<Droppable droppableId="todoslist">
				{(provided) => (
					<div className="todos" ref={provided.innerRef} {...provided.droppableProps}>
						<span className="todos__heading">Active Task</span>
						{notCompletedTodos.map((todo, index) => {
							return <SingleTodo index={index} key={todo.id} todo={todo} dispatch={dispatch} />;
						})}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
			<Droppable droppableId="todosremoved">
				{(provided) => (
					<div className="todos remove" ref={provided.innerRef} {...provided.droppableProps}>
						<span className="todos__heading">Completed Task</span>
						{completedTodos.map((todo, index) => {
							return <SingleTodo key={todo.id} index={index} todo={todo} dispatch={dispatch} />;
						})}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</div>
	);
};

export default TodoList;
