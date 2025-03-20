import React from 'react'
import {Box,Typography} from '@mui/material'
import './footer.css'
import {Link} from 'react-router-dom'
const Footer = () => {
  return (
    <Box className='footer'>
        <Typography component='p'>
            Copyright ©2025 All rights reserved | Developed by <Link to="">Culinary Connect</Link></Typography>
    </Box>
  )
}

export default Footer