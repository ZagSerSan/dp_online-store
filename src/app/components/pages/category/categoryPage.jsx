import React, { useEffect, useState } from 'react'

const CategoryPage = ({type}) => {
  // men - 14, women - 10, car - 8
  const [test, setTest] = useState()
  useEffect(() => {
    // if (localStorage.getItem("img")) {
      // setTest(JSON.parse(localStorage.getItem("img")))
    // } else {
      fetch('https://images.ctfassets.net/yadj1kx9rmg0/wtrHxeu3zEoEce2MokCSi/cf6f68efdcf625fdc060607df0f3baef/quwowooybuqbl6ntboz3.jpg')
      .then(response => setTest(response.url))
        // localStorage.setItem("img", JSON.stringify(json))
    // }
  }, [])

  return (
    <div className="container">
      {test ? <h1>CategoryPage.jsx: {type}</h1> : <p>loading...</p>}
      {test && <img src={test} alt='test' />}
    </div>
  )
}

export default CategoryPage