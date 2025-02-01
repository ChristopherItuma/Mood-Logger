import React, { useEffect, useState } from 'react'
import './MoodLogger.css'

const MoodLogger = () => {
  const [userMood, setuserMood] = useState([])
  const [allMoods, setAllMoods] = useState([])

  const handleAddMood = (e) => {
    e.preventDefault()

    if (userMood !== "") {
      const currentDate = new Date().toLocaleDateString()

      const updatedMoods = [...allMoods, { userMood, date: currentDate }]

      setAllMoods(updatedMoods)

      setuserMood('')

      localStorage.setItem('mood', JSON.stringify(updatedMoods))

    }
  }

  const handleRemoveMood =(indexToRemove)=>{
   const moodRemover =  allMoods.filter((_,index)=>index !== indexToRemove)
   setAllMoods(moodRemover)
   localStorage.setItem('mood',JSON.stringify(moodRemover))
  }


  useEffect(()=>{
    const storedItem = JSON.parse(localStorage.getItem('mood'))
    if(storedItem){
      setAllMoods(storedItem)
    }
  },[])
  return (
    <div className='mood-logger'>
      <div className="heading">
        <h1>Keep record of your feelings everyday</h1>
      </div>
      <div className='form'>
        <form onSubmit={handleAddMood}>
          <input type="text" placeholder='how do you feel today'
            value={userMood} onChange={(e) => setuserMood(e.target.value)}
          />
          <button>Submit feeling</button>
        </form>
       <table border="1">
        <thead>
          <tr>
            <th>Date</th>
            <th>Mood</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
            {
              allMoods.map((item,index)=>(
                <tr key={index}>
                  <td>{item.date}</td>
                  <td>{item.userMood}</td>
                  <td><button className='remove' onClick={()=>handleRemoveMood(index)}>Remove</button></td>
                </tr>
              ))
            }
          </tbody>
       </table>
      </div>
    </div>
  )
}

export default MoodLogger