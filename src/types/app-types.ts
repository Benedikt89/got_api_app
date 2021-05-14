export interface I_appState {
    isFetching: {[key: string]: boolean},
    error: {[key: string]: {message: string}}
    userData: I_UserData | null
}

export interface I_UserData {
    name: string,
    id: string,
    phone: string,
    avatar: string,
    password: string
}