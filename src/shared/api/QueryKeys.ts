export class QueryKeys {
    readonly auth = {
        checkAuth: 'auth',
    } as const

    readonly users = {
        publicProfile: 'public-profile',
        privateProfile: 'private-profile',
    } as const
}

export const queryKeys = new QueryKeys()
