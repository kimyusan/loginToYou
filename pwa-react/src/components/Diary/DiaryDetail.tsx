import {useState} from 'react';
import useUserStore from '../../stores/UserStore'

export default function SimpleBackdrop() {
  const { nickname, name } = useUserStore();

  return (
    <div>
    </div>
  );
}