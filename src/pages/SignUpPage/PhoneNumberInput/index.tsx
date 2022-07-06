import React from 'react';
import { forwardRef } from 'react'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  input: {
     
  
  }
}))

const phoneInput = (props:any, ref:any) => {
  const classes = useStyles()

  return (

  <>
  <div style={{width: '25px', height: '100%', marginRight: '10px'}}>...</div>
   <TextField
      {...props}
      InputProps={{
        className: classes.input
      }}
      inputRef={ref}
      fullWidth
      size='small'
      label='Phone Number'
      variant='outlined'
      name='phone'
    />
    </>
  )
}
export default forwardRef(phoneInput)