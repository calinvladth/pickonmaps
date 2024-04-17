export const API = 'http://localhost:3000'
export const URL = 'http://localhost:5173'

export const DEFAULT_ZOOM = 15

export const ICON_SIZE = {
    SM: '16px'
}

export const COLORS = {
    RED: 'red',
    ORANGE: 'orange',
    BLUE: 'blue'
}

export const MAP_ZOOM = 10

export const EVENT_CHANNELS = {
    MOVE_TO_PICK: 'MOVE_TO_PICK',
    PICK_MODAL_EDIT: 'PICK_MODAL_EDIT',
    PICK_MODAL_CREATE: 'PICK_MODAL_CREATE',
}

export const PATHS = {
    ACCOUNT: '/account',
    SIGNIN: '/',
    SIGNUP: '/signup',
    MAPS_VIEW: '/maps',
    MAP_CREATE: '/maps/create',
    MAP_EDIT: '/maps/:mapId',
    MAP_SHARE: '/maps/:mapId/share',
    PICKS_VIEW: '/maps/:mapId/picks',
    PICKS_CREATE: '/maps/:mapId/picks/create',
    PICK_VIEW: '/maps/:mapId/picks/:pickId'
}