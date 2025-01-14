import React, { useState } from 'react';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';

// Importation des images
import tiktokLogo from '../../image/tiktok.svg';
import instagramLogo from '../../image/Instagram.svg';
import facebookLogo from '../../image/Facebook.png';
import youtubeLogo from '../../image/Youtube_logo.png';

// Types
interface Event {
  id: string;
  date: Date;
  time: string;
  title: string;
  platform: 'tiktok' | 'instagram' | 'facebook' | 'youtube';
}

const MarketingCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [showEventModal, setShowEventModal] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    date: new Date(),
    time: '09:00',
    title: '',
    platform: 'tiktok'
  });

  // Get days in the current month
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    // Add current month's days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push({ date: new Date(year, month, i), isCurrentMonth: true });
    }

    return days;
  };

  // Format date for display
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    }).format(date);
  };

  // Get events for a specific date
  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  // Handle adding new event
  const handleAddEvent = () => {
    const event: Event = {
      id: Date.now().toString(),
      date: newEvent.date!,
      time: newEvent.time!,
      title: newEvent.title!,
      platform: newEvent.platform!
    };
    setEvents([...events, event]);
    setShowEventModal(false);
    setNewEvent({
      date: new Date(),
      time: '09:00',
      title: '',
      platform: 'tiktok'
    });
  };

  // Handle date selection from small calendar
  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  // Platform logos and colors
  const platformDetails = {
    tiktok: {
      color: 'bg-purple-500',
      logo: tiktokLogo
    },
    instagram: {
      color: 'bg-pink-500',
      logo: instagramLogo
    },
    facebook: {
      color: 'bg-blue-500',
      logo: facebookLogo
    },
    youtube: {
      color: 'bg-red-500',
      logo: youtubeLogo
    }
  };

  // Generate a small calendar for the selected month
  const renderSmallCalendar = () => {
    const daysInMonth = getDaysInMonth(selectedDate);
    const firstDayIndex = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();
    const emptyDays = Array.from({ length: firstDayIndex }, (_, i) => i);

    const calendarDays = [...emptyDays.map(() => null), ...daysInMonth];
    const weeks = [];

    for (let i = 0; i < calendarDays.length; i += 7) {
      weeks.push(calendarDays.slice(i, i + 7));
    }

    return (
      <div className="bg-black rounded-lg p-4">
        <div className="flex justify-between items-center mb-2">
          <button
            onClick={() => {
              const newDate = new Date(selectedDate);
              newDate.setMonth(newDate.getMonth() - 1);
              setSelectedDate(newDate);
            }}
            className="p-2 hover:bg-gray-700 rounded-lg"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="font-medium text-white">
            {new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric' }).format(selectedDate)}
          </span>
          <button
            onClick={() => {
              const newDate = new Date(selectedDate);
              newDate.setMonth(newDate.getMonth() + 1);
              setSelectedDate(newDate);
            }}
            className="p-2 hover:bg-gray-700 rounded-lg"
          >
            <ChevronRight size={20} />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-white">
          {['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'].map(day => (
            <div key={day} className="font-medium text-gray-400">
              {day}
            </div>
          ))}
          {weeks.map((week, weekIndex) => (
            <React.Fragment key={weekIndex}>
              {week.map((day, dayIndex) => (
                <div
                  key={dayIndex}
                  className={`p-2 rounded-lg ${day ? 'cursor-pointer' : ''} ${day && day.isCurrentMonth ? 'bg-gray-700' : 'bg-gray-900'} ${day && day.date.toDateString() === selectedDate.toDateString() ? 'ring-2 ring-blue-500' : ''}`}
                  onClick={() => day && handleDateClick(day.date)}
                >
                  {day ? day.date.getDate() : ''}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-black text-white p-6 rounded-xl shadow-lg w-[1580px]">
        <div className="flex flex-col md:flex-row">
          {/* Small Calendar */}
          <div className="md:w-1/4 mb-4 md:mb-0">
            {renderSmallCalendar()}
          </div>

          <div className="md:flex-1">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowEventModal(true)}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm text-white"
                >
                  <Plus size={16} />
                  Ajouter un événement
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const newDate = new Date(selectedDate);
                    newDate.setMonth(newDate.getMonth() - 1);
                    setSelectedDate(newDate);
                  }}
                  className="p-2 hover:bg-gray-800 rounded-lg"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => {
                    const newDate = new Date(selectedDate);
                    newDate.setMonth(newDate.getMonth() + 1);
                    setSelectedDate(newDate);
                  }}
                  className="p-2 hover:bg-gray-800 rounded-lg"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'].map(day => (
                <div key={day} className="text-center font-medium text-gray-400">
                  {day}
                </div>
              ))}
              {getDaysInMonth(selectedDate).map(({ date, isCurrentMonth }, index) => {
                const isSelected = date.toDateString() === selectedDate.toDateString();
                const eventsForDate = getEventsForDate(date);

                return (
                  <div
                    key={index}
                    className={`p-4 rounded-lg text-center h-32 md:h-40 ${isCurrentMonth ? 'bg-gray-800' : 'bg-gray-700 text-gray-500'} ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
                  >
                    <div className="mb-2">{date.getDate()}</div>
                    {eventsForDate.map(event => (
                      <div
                        key={event.id}
                        className={`text-white text-xs rounded px-2 py-1 mb-1 ${platformDetails[event.platform].color}`}
                      >
                        <div className="flex items-center gap-2">
                          <img src={platformDetails[event.platform].logo} alt={event.platform} className="w-4 h-4" />
                          <div>
                            <div className="font-medium">{event.title}</div>
                            <div className="text-xs">{event.time}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Add Event Modal */}
        {showEventModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-gray-900 p-6 rounded-xl w-full max-w-md">
              <h3 className="text-xl font-bold mb-4">Nouvel événement</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-1">Titre</label>
                  <input
                    type="text"
                    className="w-full bg-gray-800 rounded-lg px-3 py-2 text-white"
                    value={newEvent.title}
                    onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Date</label>
                  <input
                    type="date"
                    className="w-full bg-gray-800 rounded-lg px-3 py-2 text-white"
                    value={newEvent.date?.toISOString().split('T')[0]}
                    onChange={e => setNewEvent({ ...newEvent, date: new Date(e.target.value) })}
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Heure</label>
                  <input
                    type="time"
                    className="w-full bg-gray-800 rounded-lg px-3 py-2 text-white"
                    value={newEvent.time}
                    onChange={e => setNewEvent({ ...newEvent, time: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Plateforme</label>
                  <select
                    className="w-full bg-gray-800 rounded-lg px-3 py-2 text-white"
                    value={newEvent.platform}
                    onChange={e => setNewEvent({ ...newEvent, platform: e.target.value as Event['platform'] })}
                  >
                    <option value="tiktok">TikTok</option>
                    <option value="instagram">Instagram</option>
                    <option value="facebook">Facebook</option>
                    <option value="youtube">YouTube</option>
                  </select>
                </div>
                <div className="flex justify-end gap-2 mt-6">
                  <button
                    onClick={() => setShowEventModal(false)}
                    className="px-4 py-2 rounded-lg hover:bg-gray-800 text-white"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleAddEvent}
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white"
                  >
                    Ajouter
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketingCalendar;