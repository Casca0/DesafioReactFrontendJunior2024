import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
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
						element={<App />}
					/>
				</Routes>
			</HashRouter>
		</TodoTaskProvider>
	</React.StrictMode>
);



