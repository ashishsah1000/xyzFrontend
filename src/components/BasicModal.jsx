import React from 'react'
import { Box, Container, Grid,Modal,Button,Typography } from "@mui/material";


// styling for modal
const style = {
    position : 'absolute',
    top:'50%',
    left:'50%',
    transform:'translate(-50%,-50%)',
    widht:"60%",
    bgcolor:'background.paper',border:'2px solid #000',boxShadow:24,p:4

  }





export default function BasicModal() {
    const [open,setOpen] = React.useState(false);
  return (
    <div>BasicModal</div>
  )
}
