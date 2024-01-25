import React from 'react'
import useUserStore from '../../stores/UserStore'

import { SeeDiary } from '../../styles/Diary/Diary'
import { DiaryItem } from '../../styles/Diary/DiaryBox'

const DiaryBox = () => {
  const {name} = useUserStore();

  return (
    <SeeDiary>
      <DiaryItem>{name} 일기 쓰기</DiaryItem>
      <div className='v-line'></div>
      <DiaryItem>{name} 일기 쓰기</DiaryItem>
    </SeeDiary>
  )
}

export default DiaryBox;