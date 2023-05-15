import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function NotFoundData() {
  const navigate = useNavigate();
  return (
   <div onClick={() => navigate('/')} sx={{cursor: 'pointer'}}>
    <p variant='h1'>
      Your Data that you are looking up is not existed
    </p>
   </div>
  )
}