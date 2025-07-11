import { fastifyCors } from '@fastify/cors'
import { fastifyMultipart } from '@fastify/multipart'
import { fastify } from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { env } from './env.ts'
import { createQuestionRoute } from './http/routes/create-question.ts'
import { createRoomRoute } from './http/routes/create-room.ts'
import { getRoomQuestions } from './http/routes/get-room-questions.ts'
import { getRoomsRoute } from './http/routes/get-rooms.ts'
import { uploadAudioRoute } from './http/routes/upload-audio.ts'
import { updateRoomRoute } from './http/routes/update-room.ts'
import { deleteRoomRoute } from './http/routes/delete-room.ts'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'], // Include DELETE here
})

app.register(fastifyMultipart)

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.get('/health', () => {
  return 'OK'
})

app.register(getRoomsRoute)
app.register(createRoomRoute)
app.register(updateRoomRoute)
app.register(deleteRoomRoute)
app.register(getRoomQuestions)
app.register(createQuestionRoute)
app.register(uploadAudioRoute)

app.listen({ port: env.PORT })
