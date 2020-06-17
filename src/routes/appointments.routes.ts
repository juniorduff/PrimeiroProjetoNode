import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentsRerpository from '../repositories/AppointmentsRepository';
import CreateAppointmentsService from '../services/CreateAppointmentsService';

const appointmentsRouter = Router();

appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRerpository);
  const appointments = await appointmentsRepository.find();
  return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
  try {
    const { provider_id, date } = request.body;
    const parsedDate = parseISO(date);

    const createdAppointments = new CreateAppointmentsService();

    const appointment = await createdAppointments.execute({
      date: parsedDate,
      provider_id,
    });
    return response.json(appointment);
  } catch (e) {
    return response.status(400).json({ error: e.message });
  }
});

export default appointmentsRouter;
