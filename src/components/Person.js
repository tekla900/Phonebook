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
  
  export default Person