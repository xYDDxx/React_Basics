import React, { useEffect, useState } from 'react'
import Card from './Card'

export default function PeopleContainer () {
  const [people, setPeople] = useState([])
  const [filteredPeople, setFilteredPeople] = useState([])

  useEffect(() => {
    fetch('https://65cf56fabdb50d5e5f5b10c2.mockapi.io/person').then(res =>
      res.json().then(data => {
        setPeople(data)
        setFilteredPeople(data)
      })
    )
  }, [])

  const filterPeople = filter => {
    let filtered = people.filter(person =>
      person.name.toLowerCase().includes(filter.toLowerCase())
    )
    setFilteredPeople(filtered)
  }

  return (
    <div className='p-8'>
      <div className='fixed mb-4 bg-white w-full h-22 p-8'>
        <input
          className='border-2 border-black p-4 h-2'
          type='text'
          placeholder='search'
          onChange={el => {
            console.log(el.target.value)
            filterPeople(el.target.value)
          }}
        ></input>
      </div>
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 p-8 pt-32'>
        {filteredPeople.map(person => {
          return (
            <Card
              name={person.name}
              imageUri={person.avatar}
              title={person.jobtitle}
            />
          )
        })}
      </div>
    </div>
  )
}
