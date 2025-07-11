import { useMutation, useQueryClient } from '@tanstack/react-query'

interface EditRoomInput {
  id: string
  data: {
    name: string,
    description: string,
  }
}

export function useEditRoom() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, data }: EditRoomInput) => {
      const response = await fetch(`http://localhost:3333/rooms/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to edit room')
      }

      return response.json()
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['get-rooms'] })
    },
  })
}
