import { createContext, useContext, useState } from 'react';
import type { TodoItem } from './utils';

interface TodoInterface {
	setTasks: React.Dispatch<React.SetStateAction<TodoItem[]>>;
	tasksObject: {
		tasks: TodoItem[];
		done: TodoItem[];
		notDone: TodoItem[];
	};
}

const TodoContext = createContext<TodoInterface | null>(null);

export default function TodoTaskProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [tasks, setTasks] = useState<TodoItem[]>([]);

	const tasksObject = {
		tasks: tasks,
		done: tasks.filter((task) => task.isDone),
		notDone: tasks.filter((task) => !task.isDone),
	};

	return (
		<TodoContext.Provider value={{ setTasks, tasksObject }}>
			{children}
		</TodoContext.Provider>
	);
}

export function useTasks(): TodoInterface {
	const context = useContext(TodoContext);

	if (!context) {
		throw new Error('useTasks deve ser usado dentro de um TodoTaskProvider!');
	}

	return context;
}
