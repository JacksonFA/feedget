import express from 'express'
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { NodemailMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';

export const routes = express.Router()

routes.post('/feedbacks', async (req, res) => {
   try {
        const { type, comment, screenshot } = req.body;

        const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
        const nodemailerMailAdapter = new NodemailMailAdapter()

        const submitFeedbackUseCase = new SubmitFeedbackUseCase(
            prismaFeedbacksRepository,
            nodemailerMailAdapter,
        )

        await submitFeedbackUseCase.execute({
            type,
            comment,
            screenshot,
        })

        return res.status(201).send()
   } catch (error) {
       console.log(error)
       return res.status(500).json({ message: "Não foi possível enviar o feedback, \n tente novamente mais tarde." })
   }
})