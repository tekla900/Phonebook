// import React from "react";

const Person = ({ personsFilter }) => {
    return personsFilter.map ((person) => (
      <li key={person.id}>
        {person.name} <span>{person.number}</span></li>
    )
  )
  }

// const Person = ({ person }) => {
//   return (
//     <li key={person.id}>{person.name} {person.number}</li>
//   )
// }
  
  export default Person