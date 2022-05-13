import { useState, useEffect } from 'react'
import personService from './services/persons'
import Person from './components/Person'
import Search from './components/Search'
import Form from './components/Form'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setNewSearch] = useState('')
  const [personsFilter, setPersonsFilter] = useState(persons)

// წამოღება სერვერიდან 
  useEffect(() => {
    personService
      .getAll()
      .then(initialPerson => {
        setPersons(initialPerson)
      })
  }, [])
  
  const addContact = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
    }

    const currentPerson = persons.filter((person) => person.name === newName);
      if (currentPerson.length === 1) {
        const id = currentPerson.id
        const url = `http://localhost:3002/persons/${id}`
        if (window.confirm(`${newName} is already added to phonebook, do you want to update it?`)){
          personService
            .update(url, nameObject)
        }
      } else {
        personService
          .create(nameObject)
          .then(initialPerson => {
            setPersons(persons.concat(initialPerson))
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

  const handleDelete = (id) => {
    const url = `http://localhost:3002/persons/${id}`
    axios
      .delete(url)
      .then(response =>
        response.data)
    console.log('deleted')
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
           <Person personsFilter={personsFilter} handleDelete={handleDelete}/>
      </ul>
    </div>
  )
}

export default App