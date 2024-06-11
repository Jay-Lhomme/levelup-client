import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import EventForm from '../../../components/event/EventForm';
import { getSingleEvent } from '../../../api/eventData';

export default function EditEvents() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      getSingleEvent(id).then(setEditItem);
    }
  }, [id]);
  return <EventForm obj={editItem} />;
}
