import React from "react";
import "./App.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Outlet } from "react-router-dom";
function App() {
	return (
		<DndProvider backend={HTML5Backend}>
			<div className="App">
				<Outlet></Outlet>
			</div>
		</DndProvider>
	);
}

export default App;
