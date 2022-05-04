import React from "react";

const Person = ({ personsFilter }) => {
    return personsFilter.map ((person) => (
      <li key={person.id}>
        {person.name} <span>{person.number}</span></li>
    )
  )
  }
  
  export default Person