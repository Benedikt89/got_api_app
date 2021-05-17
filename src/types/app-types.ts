export interface I_appState {
    isFetching: {[key: string]: boolean},
    error: {[key: string]: {message: string}}
}

export type QueryObject = {
    [key: string]: string
}