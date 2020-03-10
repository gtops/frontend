export interface ILoginResponse {
    accessToken: string,
    refreshToken: string,
    role: string,
    organizationId?: number
}