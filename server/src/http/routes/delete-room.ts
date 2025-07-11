import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { db } from '../../db/connection.ts'
import { schema } from '../../db/schema/index.ts'
import { eq } from 'drizzle-orm'

export const deleteRoomRoute: FastifyPluginCallbackZod = (app) => {
  app.delete(
    '/rooms/:id',
    {
      schema: {
        params: z.object({
          id: z.string().min(1),
        }),
      },
    },
    async (request, reply) => {
      const { id } = request.params

      const result = await db.transaction(async (tx) => {
        await tx.delete(schema.questions).where(eq(schema.questions.roomId, id))
        await tx.delete(schema.audioChunks).where(eq(schema.audioChunks.roomId, id))
        const deleted = await tx.delete(schema.rooms).where(eq(schema.rooms.id, id)).returning()
        return deleted[0]
      })

      if (!result) {
        return reply.status(404).send({ error: 'Sala não encontrada.' })
      }

      return reply.status(204).send()
    },
  )
} 