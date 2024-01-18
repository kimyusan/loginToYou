import React from 'react'
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import { SelectBox } from "../styles/Camera/ModeSelect"

const Camera = () => {
  return (
    <SelectBox>
      <Link to="/camera/solo">
        <Paper elevation={3}>
          혼자찍기
        </Paper>
      </Link>

      <Link to="/camera/couple">
        <Paper elevation={3}>
          같이찍기
        </Paper>
      </Link>
    </SelectBox>
  )
}

export default Camera