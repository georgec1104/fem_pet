import React from "react";
import { render } from "react-dom";
import pf from "petfinder-client";
import Pet from "./Pet";

const petfinder = pf({
	key: process.env.API_KEY,
	secret: process.env.API_SECRET
});

// class component
class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pets: []
		};
	}
	componentDidMount() {
		petfinder.pet
			.find({ output: "full", location: "Seatle, WA" })
			.then(data => {
				let pets;

				// Verify if data are coming in
				if (data.petfinder.pets && data.petfinder.pets.pet) {
					// see if the data from api contains multiple results in a Array
					if (Array.isArray(data.petfinder.pets.pet)) {
						pets = data.petfinder.pets.pet;
						// if there is only 1 result, then put it in/as Array
					} else {
						pets = [data.petfinder.pets.pet];
					}
				} else {
					pets = [];
				}
				// update the content in state
				this.setState({ pets: pets });
			});
	}
	render() {
		return (
			<div>
				<h1>Adopt Me!</h1>
				<div>
					{this.state.pets.map(pet => {
						// sometimes the dog has multiple breeds
						let breed;
						if (Array.isArray(pet.breeds.breed)) {
							breed = pet.breeds.breed.join(", ");
						} else {
							breed = pet.breeds.breed;
						}
						return (
							<Pet
								key={pet.id}
								animal={pet.animal}
								name={pet.name}
								breed={breed}
								media={pet.media}
								// template string uses backtick ``
								location={`${pet.contact.city}, ${pet.contact.state}`}
							/>
						);
					})}
				</div>
			</div>
		);

		// render() {
		// 	return (
		// 		<div>
		// 			<h1>Adopt Me!</h1>
		// 			{/* dump all the data as json on the page */}
		// 			<pre>
		// 				{/* the 4 means indent */}
		// 				<code>{JSON.stringify(this.state, null, 4)}</code>
		// 			</pre>
		// 		</div>
		// 	);
		// return React.createElement("div", {}, [
		// 	React.createElement(
		// 		"h1",
		// 	{ onClick: this.handleTitleClick },
		// 		"Adopt Me Please!"
		// 	),
		// 	React.createElement(Pet, {
		// 		name: "Luna",
		// 		animal: "Dog",
		// 		breed: "Japanese"
		// 	}),
		// 	React.createElement(Pet, {
		// 		name: "Niny",
		// 		animal: "Dog",
		// 		breed: "Japanese"
		// 	}),
		// 	React.createElement(Pet, {
		// 		name: "Yami",
		// 		animal: "Bird",
		// 		breed: "mixed"
		// 	})
		// ]);
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
