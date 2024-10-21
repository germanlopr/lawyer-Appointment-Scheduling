import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Calendar, Clock, User, Mail, Phone } from 'lucide-react';

interface Appointment {
  id: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  user: {
    name: string;
    email: string;
    phoneNumber: string;
  };
}

const AdminDashboard: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await api.get('/admin/appointments');
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  const handleStatusChange = async (id: string, newStatus: 'scheduled' | 'completed' | 'cancelled') => {
    try {
      await api.patch(`/admin/appointments/${id}`, { status: newStatus });
      setAppointments(appointments.map(appointment => 
        appointment.id === id ? { ...appointment, status: newStatus } : appointment
      ));
    } catch (error) {
      console.error('Error updating appointment status:', error);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">All Appointments</h3>
        {appointments.length === 0 ? (
          <p className="text-gray-600">No appointments scheduled.</p>
        ) : (
          <ul className="space-y-6">
            {appointments.map((appointment) => (
              <li key={appointment.id} className="border-b pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold flex items-center">
                      <Calendar className="mr-2" size={18} />
                      {new Date(appointment.date).toLocaleDateString()}
                    </p>
                    <p className="text-gray-600 flex items-center">
                      <Clock className="mr-2" size={18} />
                      {appointment.time}
                    </p>
                    <p className="text-gray-600 flex items-center">
                      <User className="mr-2" size={18} />
                      {appointment.user.name}
                    </p>
                    <p className="text-gray-600 flex items-center">
                      <Mail className="mr-2" size={18} />
                      {appointment.user.email}
                    </p>
                    <p className="text-gray-600 flex items-center">
                      <Phone className="mr-2" size={18} />
                      {appointment.user.phoneNumber}
                    </p>
                  </div>
                  <div>
                    <select
                      value={appointment.status}
                      onChange={(e) => handleStatusChange(appointment.id, e.target.value as 'scheduled' | 'completed' | 'cancelled')}
                      className="border rounded p-2"
                    >
                      <option value="scheduled">Scheduled</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
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

export default AdminDashboard;