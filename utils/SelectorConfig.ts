import {useAppSelector} from '../store/hooks'

export function IsUserAuthenticated(): boolean {
  const userToken = useAppSelector((state: any) => state?.Login?.token)
  return userToken?.length > 0
}
export function LoggedInUserId(): string {
  const id = useAppSelector((state: any) => state?.User?.userId)
  return JSON.parse(id)
}
