import { useState } from 'react'
import Person from './components/Person'
import Search from './components/Search'
import Form from './components/Form'

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const[searchName, setNewSearch] = useState('')
  const[personsFilter, setPersonsFilter] = useState(persons)

  const addContact = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length+1,
    }

  const currentPerson = persons.filter((person) => person.name === newName);
      if (currentPerson.length === 1) {
        alert(`${newName} is already added to phonebook`)
      } else {
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const filterPersons = (event) => {
    const searchName = event.target.value.toLowerCase()
    setNewSearch(searchName)
    const newPersons = persons.filter (
      (person) => 
        person.name.toLowerCase().search(searchName) !== -1
    )
    setPersonsFilter(newPersons)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const formData = {
    addContact,
    newName,
    setNewName,
    newNumber,
    setNewNumber,
  };

  const searchData ={
    searchName,
    filterPersons
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Search data={searchData} />
      <Form data={formData} />
      <h2>Numbers</h2>
      <ul>
          <Person personsFilter={personsFilter} /> 
      </ul>
    </div>
  )
}

export default App