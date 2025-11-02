import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Search from './components/Search'
import ContactList from './components/ContactList'
import phoneBookStore from './stores/phoneBookStore'
import ContactAdd from './components/ContactAdd'


function App() {
  const {setMode, modalOpen, setModalOpen} = phoneBookStore();

  const openModal = () => {
    setMode('add');
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div class="phone" role="img" aria-label="스마트폰 모형">
        <div class="screen">
          <div class="notch" aria-hidden="true">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
          </div>

          <div class="statusbar">
            <div class="left"></div>
            <div class="right">🔋 87%</div>
          </div>

          <div className='top10'>
            <Search></Search>
          </div>

          <div className='top10'>
            <ContactList></ContactList>
          </div>

          <div className='top10 add-container'>
            <button className='add-btn' onClick={() => openModal()}>+</button>
          </div>
        </div>
      </div>
      <ContactAdd open={modalOpen} close={closeModal}>
      </ContactAdd>
    </>
  )
}

export default App
