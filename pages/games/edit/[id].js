import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import GameForm from '../../../components/game/GameForm';
import { getSingleGame } from '../../../api/gameData';

export default function EditGame() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      getSingleGame(id).then(setEditItem);
    }
  }, [id]);
  return <GameForm obj={editItem} />;
}
