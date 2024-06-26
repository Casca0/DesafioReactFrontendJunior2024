import { useMemo, useRef } from 'react';
import { useTasks } from './provider';
import { Item } from './components/Item';
import { useLocation } from 'react-router-dom';
import { clsx } from 'clsx';
import DownwardArrow from './assets/DownwardArrow';

export default function Todo() {
	const inputRef = useRef<HTMLInputElement | null>(null);

	const { pathname: route } = useLocation();

	const { tasksObject, setTasks } = useTasks();

	const { tasks, done, notDone } = tasksObject;

	const visibleTasks = useMemo(() => {
		if (route === '/active') {
			return notDone;
		}
		if (route === '/completed') {
			return done;
		}
		return tasks;
	}, [done, notDone, route, tasks]);

	function handleSubmit(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === 'Enter') {
			tasks.unshift({
				id: (Math.random() + 1).toString(36).substring(7),
				title: inputRef.current?.value as string,
				isDone: false,
			});

			setTasks(tasks.slice());

			inputRef.current!.value = '';
		}
	}

	function clearDone() {
		setTasks(notDone);
	}

	function reverseState() {
		const tempArr = tasks.filter((task) => {
			if (done.length === tasks.length) {
				task.isDone = !task.isDone;
				return task;
			}
			if (!task.isDone) {
				task.isDone = !task.isDone;
				return task;
			}
			return task;
		});
		setTasks(tempArr.slice());
	}

	return (
		<section>
			<h1 className='text-rose-600 text-8xl m-4 text-center'>todos</h1>
			<div className='bg-white shadow-lg'>
				<div className='flex flex-row-reverse items-center task-create'>
					<input
						onKeyDown={handleSubmit}
						className='focus:outline-none p-4 w-[550px] text-2xl placeholder:italic task-create-input'
						type='text'
						name='task'
						id='task'
						ref={inputRef}
						placeholder='What needs to be done?'
					/>
					<label
						htmlFor='task'
						className='text-center w-14 px-4'>
						{tasks.length > 0 && (
							<button
								className='h-10 w-10'
								onClick={reverseState}>
								<DownwardArrow />
							</button>
						)}
					</label>
				</div>
				{tasks.length > 0 && (
					<div>
						<ul>
							{visibleTasks.map((task, index) => {
								return (
									<Item
										index={index}
										task={task}
										key={task.id}
									/>
								);
							})}
						</ul>
						<div className='p-2 flex justify-between'>
							<p>{notDone.length} items left!</p>
							<nav>
								<ul className='flex justify-evenly w-56'>
									<li>
										<a
											href='#/'
											className={clsx('p-1 rounded-md', {
												'outline-2 outline-rose-400 outline': route === '/',
											})}>
											All
										</a>
									</li>
									<li>
										<a
											href='#/active'
											className={clsx('p-1 rounded-md', {
												'outline-2 outline-rose-400 outline':
													route === '/active',
											})}>
											Active
										</a>
									</li>
									<li>
										<a
											href='#/completed'
											className={clsx('p-1 rounded-md', {
												'outline-2 outline-rose-400 outline':
													route === '/completed',
											})}>
											Completed
										</a>
									</li>
								</ul>
							</nav>
							<button
								className='hover:underline'
								onClick={clearDone}>
								Clear completed
							</button>
						</div>
					</div>
				)}
			</div>
		</section>
	);
}

