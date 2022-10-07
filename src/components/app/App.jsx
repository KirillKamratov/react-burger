import React from 'react'
import AppStyles from './App.module.css'
import Header from '../header'
import Main from '../main'

function App() {
  return (
    <div className={`${AppStyles.App}`}>
      <Header />
      <Main />
    </div>
  )
}

export default App
