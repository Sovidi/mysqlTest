"use client";
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { myContext } from './Context';

function List() {
  const [data, setData] = useState([]);
  const {conTest, setConTest} = useContext(myContext);

  setConTest("ohyea")
  console.log(conTest);

  // const getData = () => {
  //   axios.get('/api')
  //   .then(res=>{
  //     setData(res.data);
  //   })
  // }


  const del = (num) => {
    axios.delete(`/api/${num}`, {params:{num:num}})
    .then(res=>{
      setData(res.data);
    })
    // getData()
  }

  const edit = (num) => {
    axios.put(`/api/${num}`, {name:'홍홍홍'})
    .then(res=>{
      setData(res.data);
    })
  }

  useEffect(()=>{
    axios.get('/api')
    .then(res=>{
      setData(res.data);
    })
  }, [])

  
  return (
    <>
    <ul>
      {
        data.map(item=>(
          <li key={item.num}>
            아이디:{item.id}
            이름:{item.name}
            메일:{item.email}
            <button onClick={()=>{del(item.num)}}>삭제</button>
            <button onClick={()=>{edit(item.num)}}>수정</button>
          </li>
        ))
      }
    </ul>
    </>
  )

}

export default List