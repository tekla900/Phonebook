// import React from "react";

const Person = ({ personsFilter, handleDelete }) => {
  console.log(personsFilter);
    return personsFilter.map ((person) => (
      <li key={person.id}>
        {person.name} <span>{person.number}</span>
        <button onClick={() => handleDelete(person.id)}>delete</button>  
      </li>
    )
  )
  }

// const Person = ({ person }) => {
//   return (
//     <li key={person.id}>{person.name} {person.number}</li>
//   )
// }
  
  export default Person