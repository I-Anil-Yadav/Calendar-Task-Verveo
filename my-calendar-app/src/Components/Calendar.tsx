import React, { useState, useEffect } from 'react';

type Events = {
  [key: string]: string[];
};

function getStoredEvents(): Events {
  return JSON.parse(localStorage.getItem('calendarEvents') || '{}');
}

function saveEvents(events: Events): void {
  localStorage.setItem('calendarEvents', JSON.stringify(events));
}

const Calendar: React.FC = () => {
  const today = new Date();
  const [month, setMonth] = useState<number>(today.getMonth());
  const [year, setYear] = useState<number>(today.getFullYear());
  const [events, setEvents] = useState<Events>(getStoredEvents());
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [newEvent, setNewEvent] = useState<string>('');

  useEffect(() => {
    saveEvents(events);
  }, [events]);

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  console.log(firstDay, daysInMonth);

  function handleAddEvent(): void {
    if (!newEvent.trim() || selectedDate === null) return;
    const dateKey = `${year}-${month + 1}-${selectedDate}`;
    const updated: Events = {
      ...events,
      [dateKey]: [...(events[dateKey] || []), newEvent],
    };
    setEvents(updated);
    setNewEvent('');
  }

  return (
    <div>
      <h2>Click on any date to add event</h2>
      <div>
        {[...Array(daysInMonth)].map((_, i) => (
          <button
            key={i + 1}
            onClick={() => setSelectedDate(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {selectedDate && (
        <div>
          <h3>
            Events on {selectedDate}-{month + 1}-{year}
          </h3>
          <ul>
            {(events[`${year}-${month + 1}-${selectedDate}`] || []).map((ev, idx) => (
              <li key={idx}>{ev}</li>
            ))}
          </ul>
          <input
            value={newEvent}
            onChange={(e) => setNewEvent(e.target.value)}
            placeholder="New event name"
          />
          <button
            onClick={handleAddEvent}
          >
            Add Event
          </button>
        </div>
      )}
    </div>
  );
};

export default Calendar;
