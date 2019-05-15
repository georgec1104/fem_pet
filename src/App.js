import React from "react";
import { render } from "react-dom";
import Pet from "./Pet";

// class component
class App extends React.Component {
	handleTitleClick() {
		alert("you clicked the title");
	}
	render() {
		return React.createElement("div", {}, [
			React.createElement(
				"h1",
				{ onClick: this.handleTitleClick },
				"Adopt Me Please!"
			),
			React.createElement(Pet, {
				name: "Luna",
				animal: "Dog",
				breed: "Japanese"
			}),
			React.createElement(Pet, {
				name: "Niny",
				animal: "Dog",
				breed: "Japanese"
			}),
			React.createElement(Pet, {
				name: "Yami",
				animal: "Bird",
				breed: "mixed"
			})
		]);
	}
}
render(React.createElement(App), document.getElementById("root"));

// function component
// const App = function() {};
// const App = () => {
// 	return React.createElement("div", {}, [
// 		React.createElement("h1", {}, "Adopt Me!"),
// 		React.createElement(Pet, {
// 			name: "Luna",
// 			animal: "Dog",
// 			breed: "Japanese"
// 		}),
// 		React.createElement(Pet, {
// 			name: "Niny",
// 			animal: "Dog",
// 			breed: "Japanese"
// 		}),
// 		React.createElement(Pet, {
// 			name: "Yami",
// 			animal: "Bird",
// 			breed: "mixed"
// 		})
// 	]);
// };
