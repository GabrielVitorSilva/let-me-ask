import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useDeleteRoom() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (roomId: string) => {
      const response = await fetch(`http://localhost:3333/rooms/${roomId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete room')
      }

      return null;
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['get-rooms'] })
    },
  })
}
