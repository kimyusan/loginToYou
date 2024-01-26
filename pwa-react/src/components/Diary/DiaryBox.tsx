import { Diary } from '../../styles/Diary/DiaryBox'
import Card from '@mui/material/Card';

import DiaryDetail from './DiaryDetail';
const DiaryBox = () => {
  

  return (
    <Diary>
      <Card className='item'>
        <DiaryDetail></DiaryDetail>
      </Card>
      <Card className='item'>
        <DiaryDetail></DiaryDetail>
      </Card>
    </Diary>
  )
}

export default DiaryBox;