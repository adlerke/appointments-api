import { Router } from "express";
import { parseISO } from "date-fns";
import { getCustomRepository } from "typeorm";

import AppointmentRepository from "../repositories/AppointmentsRepository";
import CreateAppointmentService from "../services/CreateAppointmentService";

import ensureAuthenticatedMiddleware  from '../middlewares/ensureAuthenticated'

const appointmentRouter = Router();

appointmentRouter.use(ensureAuthenticatedMiddleware)

// array de appointments tem essa sintaxe CustomInterface[]

appointmentRouter.get("/",async  (req, res) => {
  const appointmentsRepository = getCustomRepository(AppointmentRepository);

  const appointments = await appointmentsRepository.find();
  return res.status(200).json(appointments);
});
appointmentRouter.post("/", async (req, res) => {
  try {
    const { provider_id, date } = req.body;

    // pegar a primeira hora com minutos e segundos zerados a partir de uma data convertida pelo FNS
    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider_id,
    });

    return res.json(appointment);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default appointmentRouter;
