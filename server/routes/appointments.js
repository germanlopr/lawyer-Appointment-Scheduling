import express from 'express';
import Appointment from '../models/Appointment.js';
import { authenticateUser } from '../middleware/auth.js';
import { sendNotification } from '../services/notifications.js';

const router = express.Router();

router.post('/', authenticateUser, async (req, res) => {
  try {
    const { date, time, notes } = req.body;
    const appointment = new Appointment({
      user: req.user._id,
      date,
      time,
      notes,
    });
    await appointment.save();
    await sendNotification(req.user, 'Appointment Scheduled', `Your appointment is scheduled for ${date} at ${time}`);
    res.status(201).json(appointment);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create appointment', error: error.message });
  }
});

router.get('/', authenticateUser, async (req, res) => {
  try {
    const appointments = await Appointment.find({ user: req.user._id });
    res.json(appointments);
  } catch (error) {
    res.status(400).json({ message: 'Failed to fetch appointments', error: error.message });
  }
});

router.patch('/:id', authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;
    const { date, time, notes } = req.body;
    const appointment = await Appointment.findOneAndUpdate(
      { _id: id, user: req.user._id },
      { date, time, notes },
      { new: true }
    );
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    await sendNotification(req.user, 'Appointment Updated', `Your appointment has been updated to ${date} at ${time}`);
    res.json(appointment);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update appointment', error: error.message });
  }
});

router.delete('/:id', authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findOneAndDelete({ _id: id, user: req.user._id });
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    await sendNotification(req.user, 'Appointment Cancelled', `Your appointment for ${appointment.date} at ${appointment.time} has been cancelled`);
    res.json({ message: 'Appointment cancelled successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Failed to cancel appointment', error: error.message });
  }
});

export default router;