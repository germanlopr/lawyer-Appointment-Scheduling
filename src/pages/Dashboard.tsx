import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import { Calendar, Clock, Edit, Trash2 } from 'lucide-react';

interface Appointment {
  id: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await api.get('/appointments');
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  const handleCancelAppointment = async (id: string) => {
    try {
      await api.delete(`/appointments/${id}`);
      setAppointments(appointments.filter(appointment => appointment.id !== id));
    } catch (error) {
      console.error('Error cancelling appointment:', error);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Welcome, {user?.name}</h2>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Your Appointments</h3>
        {appointments.length === 0 ? (
          <p className="text-gray-600">You have no upcoming appointments.</p>
        ) : (
          <ul className="space-y-4">
            {appointments.map((appointment) => (
              <li key={appointment.id} className="border-b pb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold flex items-center">
                      <Calendar className="mr-2" size={18} />
                      {new Date(appointment.date).toLocaleDateString()}
                    </p>
                    <p className="text-gray-600 flex items-center">
                      <Clock className="mr-2" size={18} />
                      {appointment.time}
                    </p>
                    <p className={`text-sm ${getStatusColor(appointment.status)}`}>
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {/* Implement edit functionality */}}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleCancelAppointment(appointment.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'scheduled':
      return 'text-blue-500';
    case 'completed':
      return 'text-green-500';
    case 'cancelled':
      return 'text-red-500';
    default:
      return 'text-gray-500';
  }
};

export default Dashboard;