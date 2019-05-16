import React from "react";

class Pet extends React.Component {
	render() {
		return (
			<div>
				<h1>{props.name}</h1>
				<h2>{props.animal}</h2>
				<h3>{props.breed}</h3>
			</div>
		);
	}
}

export default Pet;
