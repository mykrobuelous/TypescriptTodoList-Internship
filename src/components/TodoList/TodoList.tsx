import { Droppable } from "react-beautiful-dnd";
import { Actions } from "../../Reducer/TodoReducer";
import { Todo } from "../../utils/model";
import SingleTodo from "../SingleTodo/SingleTodo";
import "./TodoList.css";

interface Props {
	todos: { completedTodos: Todo[]; notCompletedTodos: Todo[] };
	dispatch: React.Dispatch<Actions>;
}

const TodoList: React.FC<Props> = ({ todos, dispatch }) => {
	const { completedTodos, notCompletedTodos } = todos;
	return (
		<div className="container">
			<Droppable droppableId="todoslist">
				{(provided, snapshot) => (
					<div
						className={`todos ${snapshot.isDraggingOver ? "dragActive" : ""}`}
						ref={provided.innerRef}
						{...provided.droppableProps}
					>
						<span className="todos__heading">Active Task</span>
						{notCompletedTodos.map((todo, index) => {
							return <SingleTodo index={index} key={todo.id} todo={todo} dispatch={dispatch} />;
						})}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
			<Droppable droppableId="todosremoved">
				{(provided, snapshot) => (
					<div
						className={`todos remove ${snapshot.isDraggingOver ? "dragComplete" : ""}`}
						ref={provided.innerRef}
						{...provided.droppableProps}
					>
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
