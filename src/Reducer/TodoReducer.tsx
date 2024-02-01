import { Todo } from "../utils/model";
import { v4 as uuid } from "uuid";

export type Actions =
	| { type: "add"; payload: string }
	| { type: "remove"; payload: string }
	| { type: "done"; payload: string }
	| { type: "edit"; payload: { text: string; id: string } }
	| { type: "set"; payload: Todo[] };

export const TodoReducer = (state: Todo[], action: Actions): Todo[] => {
	switch (action.type) {
		case "add":
			return [
				...state,
				{
					id: uuid(),
					todo: action.payload,
					isDone: false,
				},
			];
		case "done":
			return state.map((todo) => (todo.id === action.payload ? { ...todo, isDone: !todo.isDone } : todo));
		case "remove":
			return state.filter((todo) => todo.id !== action.payload);
		case "edit":
			return state.map((todo) => (todo.id === action.payload.id ? { ...todo, todo: action.payload.text } : todo));
		case "set": {
			return action.payload;
		}
	}
};
