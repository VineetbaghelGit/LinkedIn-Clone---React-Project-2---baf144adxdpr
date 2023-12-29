import {useAppSelector} from '../store/hooks'

export function IsUserAuthenticated(): boolean {
  const userToken = useAppSelector((state: any) => state?.Login?.token)
  return userToken?.length > 0
}
