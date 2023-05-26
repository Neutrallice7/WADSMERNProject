import React from "react";
import { useParams } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import "./PlaceForm.css";

// Update places

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "Skyscraper wow",
    imageUrl:
      "https://fthmb.tqn.com/sBI2W7YNV4vRSVdbRVfASLH3F6I=/2617x3874/filters:fill(auto,1)/5891665274_cc93622eb7_o-56a3ff3b5f9b58b7d0d4df13.jpg",
    address: "20 W 34th St, New York, NY 10118",
    location: {
      lat: 40.748659926512545,
      lng: -73.98567513234116,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Empire State Building",
    description: "Skyscraper wow",
    imageUrl:
      "https://fthmb.tqn.com/sBI2W7YNV4vRSVdbRVfASLH3F6I=/2617x3874/filters:fill(auto,1)/5891665274_cc93622eb7_o-56a3ff3b5f9b58b7d0d4df13.jpg",
    address: "20 W 34th St, New York, NY 10118",
    location: {
      lat: 40.748659926512545,
      lng: -73.98567513234116,
    },
    creator: "u2",
  },
];

const UpdatePlace = () => {
  const placeId = useParams().placeId;

  const identifiedPlace = DUMMY_PLACES.find((p) => p.id === placeId);

  const [formState, inputHandler ] = useForm({
    title: {
      value: identifiedPlace.title,
      isValid: true
    },
    description: {
      value: identifiedPlace.description,
      isValid: true
    }
  }, true)

  const placeUpdateSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  if (!identifiedPlace) {
    return (
      <div className="center">
        <h2>Could not find place!</h2>
      </div>
    );
  }

  return (
    <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE]}
        errorText="Please enter a valid title"
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (min 5 chars)"
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        initialVali={formState.inputs.description.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE PLACE
      </Button>
    </form>
  );
};

export default UpdatePlace;
