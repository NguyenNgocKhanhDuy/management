import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Management from "./component/Management";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
	return (
		<DndProvider backend={HTML5Backend}>
			<div className="App">
				<Management />
			</div>
		</DndProvider>
	);
}

export default App;
