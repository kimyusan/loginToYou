import useUserStore from '../../stores/UserStore'

import { Diary } from '../../styles/Diary/DiaryBox'
import Card from '@mui/material/Card';

const DiaryBox = () => {
  const { name } = useUserStore();

  return (
    <Diary>
      <Card className='item'>
        {name} 일기 쓰기
      </Card>
      <Card className='item'>
        {name} 일기 쓰기
      </Card>
    </Diary>
  )
}

export default DiaryBox;