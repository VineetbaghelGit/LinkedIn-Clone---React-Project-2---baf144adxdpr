/* eslint-disable react-hooks/rules-of-hooks */
import {useAppSelector} from '../store/hooks'

export function IsUserAuthenticated(): boolean {
  const userToken = useAppSelector((state: any) => state?.Login?.token)
  return userToken?.length > 0
}
export function LoggedInUserId(): string {
  const id = useAppSelector((state: any) => state?.User?.userId)
  return id
}
export function LoggedInUserDetails(): any {
  const details = useAppSelector((state: any) => state?.User?.userDetails)
  return details
}
