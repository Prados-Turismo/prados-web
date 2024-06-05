/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiRecord, apiPermission } from "../services/api"
import { getToken, getRefreshToken, setDataCookie } from "../cookies"

import { IUserCognitoData, IUser } from "../models/user.model"

const refreshToken = async (): Promise<void> => {
  const cognitoResponse = await apiPermission.post<{
    tokenType: string
    accessToken: string
    refreshToken: string
    user: IUserCognitoData
  }>("/auth/refreshToken", {
    refreshToken: getRefreshToken()
  })

  setDataCookie({
    key: "@fiibo.token",
    value: cognitoResponse.data.accessToken
  })

  setDataCookie({
    key: "@fiibo.refreshToken",
    value: cognitoResponse.data.refreshToken
  })

  if (getToken() === cognitoResponse.data.accessToken) {
    const { data } = await apiRecord.get<IUser>("users/me")

    setDataCookie({
      key: "@fiibo.data",
      value: JSON.stringify(data)
    })
  }
}

export default function useAuth() {
  return {
    refreshToken
  }
}
