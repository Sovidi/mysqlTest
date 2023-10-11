"use client"
import React, { createContext, useState } from 'react'

export const myContext = createContext(null);

function Context({children}) {
  const [conTest, setConTest] = useState("123123123");


  return (
    <myContext.Provider value={{conTest, setConTest}}>
      {children}
    </myContext.Provider>
  )
}

export default Context