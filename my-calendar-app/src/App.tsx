import React from 'react';
import Calendar from './Components/Calendar';

const App: React.FC = () => {
  return (
    <div className="p-4">
      <h1>Calendar</h1>
      <div>
        <Calendar />
      </div>
    </div>
  );
};

export default App;