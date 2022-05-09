import React, { useRef } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction' // needed for dayClick
import listPlugin from '@fullcalendar/list';

const Calendar = () => {

  const calendarComponentRef = useRef();
  
  const toggleWeekends = () => {
      this.setState({ // update a property
          calendarWeekends: !this.state.calendarWeekends
      })
  };

  const gotoPast = () => {
      let calendarApi = this.calendarComponentRef.current.getApi();
      calendarApi.gotoDate('2000-01-01') // call a method on the Calendar object
  };

  const handleDateClick = (arg) => {
      this.setState({  // add new event data
          calendarEvents: this.state.calendarEvents.concat({ // creates a new array
              title: 'New Event',
              start: arg.date,
              allDay: arg.allDay
          })
      })
  }

  return (
    <div className='demo-app'>
        <FullCalendar
         locale= {'ru'}
        plugins={[ dayGridPlugin, interactionPlugin, listPlugin ]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek,dayGridDay,listWeek'
        }}
        events={[
          { title: 'event 1', date: '2020-08-13' },
          { title: 'event 2', date: '2020-08-15' },
          { title: 'event 2', date: '2020-08-15' },
          { title: 'event 2', date: '2022-08-15' },
          { title: 'event 2', date: '2022-08-15' },
          { title: 'event 2', date: '2022-05-01' },
          { title: 'event 2', date: '2022-05-01' }
        ]}
      />
        </div>
)
};

export default Calendar;
