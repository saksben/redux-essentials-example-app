import { AppStartListening } from '@/app/listenerMiddleware'
import { apiSlice } from '@/features/api/apiSlice'

export const addPostsListeners = (startListening: AppStartListening) => {
  startListening({
    matcher: apiSlice.endpoints.addNewPost.matchFulfilled,
    effect: async (action, listenerApi) => {
      const { toast } = await import('react-tiny-toast')

      const toastId = toast.show('New post added!', {
        variant: 'success',
        position: 'bottom-right',
        pause: true,
      })

      await listenerApi.delay(2000)
      toast.remove(toastId)
    },
  })
}
