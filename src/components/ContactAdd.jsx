import React, { use, useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import phoneBookStore from '../stores/phoneBookStore';

const ContactAdd = (props) => {
  const { open, close } = props;
  const {mode, addPhoneBook, phoneBookList, id, editPhoneBook, setSearchName} = phoneBookStore();
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const validNumber = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // 숫자만 추출
    if (value.length > 3 && value.length < 7) {
      value = value.replace(/(\d{3})(\d{1,3})/, '$1-$2');
    } else if (value.length >= 7) {
      value = value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    }
    e.target.value = value;
    setNumber(value);
  };

  const addOrEdit = () => {
    if(mode === 'add'){
      addPhoneBook(name, number);
      close();
      setName('');
      setNumber('');
      setSearchName('');
    }else{
      let list = [...phoneBookList];

      const updateList = list.map((item) => {
        if(item.id === id){
          return {...item, name, phoneNumber: number};
        }
        return item;
      });

      editPhoneBook(updateList);
      close();
      setName('');
      setNumber('');
      setSearchName('');
    }
  }

  useEffect(() => {
    if(mode === 'edit'){
      let editObj = phoneBookList.find((item) => item.id === id);

      setName(editObj.name);
      setNumber(editObj.phoneNumber);
    }else{
      setName('');
      setNumber('');
    }
  }, [id, mode]);

  return (
    <div className={open ? 'openModal modal info-container' : 'modal'}>
      {open ? (
        <section>
          <header>
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main>
            <TextField id="standard-basic" label="이름" variant="standard" onChange={(e) => setName(e.target.value)} value={name}/>
            <TextField id="standard-basic" label="전화번호" variant="standard" onChange={(e) => validNumber(e)} value={number}/>
            <div className='mg-top10 btn-container'>
            <Button variant="contained" onClick={addOrEdit}>{mode === 'add' ? '추가' : '수정'}</Button>
            </div>
          </main>
          <footer>
            <button className="close" onClick={close}>
              close
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  )
}

export default ContactAdd
