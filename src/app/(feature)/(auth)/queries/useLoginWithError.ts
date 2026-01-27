import { mapApiError } from '@/shared/lib/utils'
import { useLogin } from './useLogin'
export const useLoginWithError = () => {
  const mutation = useLogin()

  return {
    ...mutation,
    uiError: mutation.error ? mapApiError(mutation.error) : null,
  }
}