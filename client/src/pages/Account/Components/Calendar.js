import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction' // needed for dayClick
import listPlugin from '@fullcalendar/list';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import './calendar.scss'
import { getUserTest } from '../../../../http/accessTestAPI'

const Calendar = ({user}) => {

  const [events, setEvents] = useState([])

  useEffect(async() => {
    const dataAccess = await getUserTest(user.id_group)

    dataAccess.map( event => {
      setEvents(state => {
        return [...state, 
          {
            title: event.title,
            date: event.date, 
          }]
      })
    })
  },[])
  
  return (
    <div className='calendar'>
      <FullCalendar
        locale= {'ru'}
        plugins={[ dayGridPlugin, interactionPlugin, listPlugin, bootstrap5Plugin ]}
        initialView={window.innerWidth < 765 ? 'listWeek' : 'dayGridMonth'}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek,dayGridDay,listWeek'
        }}
        events={events}
      />
    </div>
  )
};

export default Calendar;
