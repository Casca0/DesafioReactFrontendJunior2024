import { useState, useCallback, memo } from 'react';
import type { TodoItem } from '../utils';
import { useTasks } from '../provider';
import { clsx } from 'clsx';
import Xmark from '../assets/Xmark';

export const Item = memo(function Item({
	task,
	index,
}: {
	task: TodoItem;
	index: number;
}) {
	const [edit, setEdit] = useState<boolean>(false);

	const { title, isDone, id } = task;

	const { tasksObject, setTasks } = useTasks();

	const { tasks } = tasksObject;

	const inputFocus = useCallback((inputElement: HTMLInputElement) => {
		if (inputElement) {
			inputElement.focus();
			inputElement.select();
		}
	}, []);

	const handleDoubleClick = useCallback(() => {
		setEdit(true);
	}, []);

	const handleBlur = useCallback(() => {
		setEdit(false);
	}, []);

	const handleOnChange = useCallback(() => {
		const tempArr = tasks.slice();

		const task = tempArr.find((task) => task.id === id);

		task!.isDone = !task?.isDone;

		setTasks(tempArr.slice());
	}, [tasks, setTasks, id]);

	const handleUpdate = useCallback(
		(title: string) => {
			const tempArr = tasks.slice();

			const task = tempArr.find((task) => task.id === id);

			if (title.length === 0) {
				tempArr.splice(index, 1);
				setTasks(tempArr.slice());
			} else {
				task!.title = title;
			}

			setEdit(false);
		},
		[id, setTasks, index, tasks]
	);

	const handleSubmit = useCallback(
		(e: React.KeyboardEvent<HTMLInputElement>) => {
			if (e.key === 'Enter') {
				handleUpdate(e.currentTarget.value);
				e.currentTarget.value = '';
			}
		},
		[handleUpdate]
	);

	const handleDelete = useCallback(() => {
		const tempArr = tasks.slice();
		tempArr.splice(index, 1);
		setTasks(tempArr.slice());
	}, [index, setTasks, tasks]);

	return (
		<li className='border-y-slate-200 border-y-4 p-4 task-item'>
			<div className='flex items-center w-full'>
				{edit ? (
					<>
						<input
							className='text-xl text-gray-700 focus:outline-none'
							ref={inputFocus}
							type='text'
							id={task.id}
							autoFocus
							defaultValue={title}
							onBlur={handleBlur}
							onKeyDown={handleSubmit}
						/>
						<label
							htmlFor={task.id}
							className='hidden'>
							Edit Todo Input
						</label>
					</>
				) : (
					<>
						<input
							key={Math.random()}
							className='appearance-none border-2 border-gray-500 rounded-full w-8 h-8 mr-4 checked:border-green-500 checked:bg-[url("/checkmark.svg")] focus:outline-none'
							type='checkbox'
							defaultChecked={isDone}
							id={task.id}
							onChange={handleOnChange}
						/>
						<label
							id='task-title'
							onDoubleClick={handleDoubleClick}
							className={clsx('text-xl text-gray-700', {
								'line-through text-stone-400': isDone,
							})}>
							{title}
						</label>
						<button
							onClick={handleDelete}
							className='task-delete ml-auto my-0'>
							<Xmark />
						</button>
					</>
				)}
			</div>
		</li>
	);
});
