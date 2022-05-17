// const Person = ({ personsFilter, handleDelete }) => {
//   console.log(personsFilter);
//     return personsFilter.map ((person) => (
//       <li key={person.id}>
//         {person.name} <span>{person.number}</span>
//         <button onClick={() => handleDelete(person.id)}>delete</button>  
//       </li>
//     )
//   )
//   }
  
//   export default Person

  const Person = ({ persons, searchTerm, handleDelete }) => {
    return persons
      .filter((person) => person.name.toLowerCase().includes(searchTerm))
      .map((person) => (
      <li key={person.id}>
        {person.name}: <span>{person.number}</span>
        <button onClick={() => handleDelete(person.id)}>delete</button>  
      </li>
    ));
  };
  
  export default Person;