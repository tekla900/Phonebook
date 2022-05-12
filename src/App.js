import { useState, useEffect } from 'react'
import personService from './services/persons'
import axios from 'axios'
import Person from './components/Person'
import Search from './components/Search'
import Form from './components/Form'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const[searchName, setNewSearch] = useState('')
  const[personsFilter, setPersonsFilter] = useState(persons)


  useEffect(() => {
    personService
      .getAll()
      .then(initialPerson => {
        setPersons(initialPerson.data)
      })
  }, [])
  


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
        personService
          .create(nameObject)
          .then(response => {
            setPersons(persons.concat(response.data))
            setNewName('')
            setNewNumber('')
          })
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
    handleNameChange,
    newNumber,
    handleNumberChange,
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