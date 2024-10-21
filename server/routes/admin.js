import express from 'express';
import Appointment from '../models/Appointment.js';
import { authenticateAdmin } from '../middleware/auth.js';
import { sendNotification } from '../services/notifications.js';

const router = express.Router();

router.get('/appointments', authenticateAdmin, async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('user', 'name email phoneNumber');
    res.json(appointments);
  } catch (error) {
    res.status(400).json({ message: 'Failed to fetch appointments', error: error.message });
  }
});

router.patch('/appointments/:id', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const appointment = await Appointment.findByIdAndUpdate(id, { status }, { new: true }).populate('user', 'name email phoneNumber');
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    await sendNotification(appointment.user, 'Appointment Status Updated', `Your appointment status has been updated to ${status}`);
    res.json(appointment);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update appointment status', error: error.message });
  }
});

export default router;