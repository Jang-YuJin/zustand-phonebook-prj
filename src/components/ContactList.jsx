import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import phoneBookStore from '../stores/phoneBookStore';

const ContactList = () => {
  const {setMode, setModalOpen, phoneBookList, setId, editPhoneBook, searchName} = phoneBookStore();
  const [rows, setRows] = useState([]);

  const col = [
  { field: 'name', headerName: '이름', width: 80 },
  {
    field: 'phoneNumber',
    headerName: '전화번호',
    width: 170,
  },
  {
    field: 'edit',
    headerName: '수정',
    width: 80,
    renderCell: (params) => (
      <strong>
        <Button variant='contained' color='primary' size='small' onClick={() => openModal(params.id)}>수정</Button>
      </strong>
    )
  },
  {
    field: 'delete',
    headerName: '삭제',
    width: 80,
    renderCell: (params) => (
      <strong>
        <Button variant='contained' color='error' size='small' onClick={() => del(params.id)}>삭제</Button>
      </strong>
    )
  }
  ];

  const openModal = (id) => {
    setMode('edit');
    setModalOpen(true);
    setId(id);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const del = (id) => {
    let list = phoneBookList.filter((item) => item.id !== id);
    editPhoneBook(list);
  };

  useEffect(() => {
    if(searchName === ''){
      setRows(phoneBookList);
    }else{
      let list = phoneBookList.filter((item) => {
        return item.name.includes(searchName);
      })
      setRows(list);
    }
  }, [phoneBookList, searchName])

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={col}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
      />
    </Box>
  )
}

export default ContactList
