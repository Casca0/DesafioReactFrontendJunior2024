import React from 'react';
import ReactDOM from 'react-dom/client';
import Todo from './Todo';
import TodoTaskProvider from './provider';
import { HashRouter, Route, Routes } from 'react-router-dom';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<TodoTaskProvider>
			<HashRouter>
				<Routes>
					<Route
						path='*'
						element={<Todo />}
					/>
				</Routes>
			</HashRouter>
		</TodoTaskProvider>
	</React.StrictMode>
);




