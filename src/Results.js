import React from "react";
import pf from "petfinder-client";
import Pet from "./Pet";

const petfinder = pf({
	key: process.env.API_KEY,
	secret: process.env.API_SECRET
});

// class component
class Results extends React.Component {
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
			<div className="search">
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
		);
	}
}
export default Results;
