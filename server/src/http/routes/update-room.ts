import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { db } from '../../db/connection.ts'
import { schema } from '../../db/schema/index.ts'
import { eq } from 'drizzle-orm'

export const updateRoomRoute: FastifyPluginCallbackZod = (app) => {
  app.patch(
    '/rooms/:id',
    {
      schema: {
        params: z.object({
          id: z.string().min(1),
        }),
        body: z.object({
          name: z.string().min(1).optional(),
          description: z.string().optional(),
        }),
      },
    },
    async (request, reply) => {
      const { id } = request.params
      const { name, description } = request.body

      const updateData: Record<string, unknown> = {}
      if (name !== undefined) updateData.name = name
      if (description !== undefined) updateData.description = description

      if (Object.keys(updateData).length === 0) {
        return reply.status(400).send({ error: 'Nenhum dado para atualizar.' })
      }

      const result = await db
        .update(schema.rooms)
        .set(updateData)
        .where(eq(schema.rooms.id, id))
        .returning()

      const updatedRoom = result[0]

      if (!updatedRoom) {
        return reply.status(404).send({ error: 'Sala não encontrada.' })
      }

      return reply.status(200).send({ room: updatedRoom })
    },
  )
} 