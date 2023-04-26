const SET_FOLLOW_DATA = "SET_FOLLOW_DATA"

const defaultState = {
    following: [],
    isFollowing: false,
    status: 'loading'
}

export default function followReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_FOLLOW_DATA:
            return {
                ...state,
                following: action.payload.following,
                isFollowing: action.payload.isFollowing,
                status: action.payload.status
            }
            
        default:
            return state
    }
}

export const setFollowData = (data) => ({ type: SET_FOLLOW_DATA, payload: data })
