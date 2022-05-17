import { useState, useEffect } from 'react'
import personService from './services/persons'
import Person from './components/Person'
import Search from './components/Search'
import Form from './components/Form'
import './index.css'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const[searchTerm, setSearchTerm] = useState('')
  const [message, setMessage] = useState(null)

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
    const person = persons.filter((person) =>
        person.name === newName
    )

    const personToAdd = person[0]
    const updatedPerson = { ...personToAdd, number: newNumber }

    if (person.length !== 0) {
      if (window.confirm(`${personToAdd.name} is already added to the phonebook, replace the old number with a new one ?`)) {
        personService
          .update(updatedPerson.id, updatedPerson).then(returnedPerson => {
            console.log(`${returnedPerson.name} successfully updated`)
            setPersons(persons.map(personItem => personItem.id !== personToAdd.id ? personItem : returnedPerson))
            setNewName('')
            setNewNumber('')
            setMessage(
              `${updatedPerson.name} was successfully updated`
            )
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch((error) => {
            console.log(error)
            setPersons(persons.filter(person => person.id !== updatedPerson.id))
            setNewName('')
            setNewNumber('')
            setMessage(
              `[ERROR] ${updatedPerson.name} was already deleted from server`
            )
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
      }
    } else {
        const personToAdd = {
            name: newName,
            number: newNumber
          }
          personService
            .create(personToAdd)
            .then(returnedPerson => {
              setPersons(persons.concat(returnedPerson))
              setNewName('')
              setNewNumber('')
              setMessage(
                `${newName} was successfully added`
              )
              setTimeout(() => {
                setMessage(null)
              }, 5000)
            })
            .catch(error => {
              setMessage(
                `[ERROR] ${error.response.data.error}`
              )
              setTimeout(() => {
                setMessage(null)
              }, 5000)
              console.log(error.response.data)
            })
    }
  }

  const filterPersons = (event) => {
    setSearchTerm(event.target.value.toLowerCase())
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleDelete = (id) => {
    personService
      .remove(id)
      .then((response) => {
        const newPersons = persons.filter((person) => person.id !== id);
        setPersons(newPersons);
        setMessage('successfully deleted')
      })
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
    searchTerm,
    filterPersons
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Search data={searchData} />
      <Form data={formData} />
      <h2>Numbers</h2>
      <ul>
      <Person persons={persons} searchTerm={searchTerm} handleDelete={handleDelete}/> 
      </ul>
    </div>
  )
}

export default App