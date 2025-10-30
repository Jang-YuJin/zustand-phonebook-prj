import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import phoneBookStore from '../stores/phoneBookStore';

const Search = () => {
  const [name, setName] = useState();
  const {setSearchName, phoneBookList, setSearchList, searchName} = phoneBookStore();

  const search = () => {
    console.log(name);
    setSearchName(name);
  }

  useEffect(() => {
    if(searchName === ''){
      setName('');
    }
  }, [searchName]);

  return (
    <Grid container spacing={2}>
      <Grid size={8}>
        <TextField id="name-input" label="이름" variant="standard" onChange={(e) => setName(e.target.value)} value={name}/>
      </Grid>
      <Grid size={4}>
        <div className='btn-container'>
          <Button variant="contained" size="medium" onClick={search}>검색</Button>
        </div>
      </Grid>
    </Grid>
  )
}

export default Search
