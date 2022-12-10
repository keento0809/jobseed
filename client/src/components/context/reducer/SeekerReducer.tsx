import {Seeker} from "../../../types/Seeker";

export type SeekerState = {
    seeker: Seeker,
    token: string | undefined,
    seekerLoading: boolean,
    error: any
}

export type SeekerAction = {
    type: string,
    payload: any,
    error?: any
};

export const initialSeeker: SeekerState = {
    seeker: {email: "", name: ""},
    token: undefined,
    seekerLoading: false,
    error: null
};

export const SEEKER_ACTION = {
    SEEKER_FETCHING: "seeker_fetching",
    SUCCESS_GET_SEEKER: "success_get_seeker",
    FAILED_GET_SEEKER: "failed_get_seeker"
}

export const seekerReducer = (state: SeekerState, action: SeekerAction) : SeekerState => {
    switch (action.type) {
        case SEEKER_ACTION.SEEKER_FETCHING:
            return {
                ...state,
                seekerLoading: true
            };
        case SEEKER_ACTION.SUCCESS_GET_SEEKER:
            return {
                ...state,
                seeker: action.payload.seeker,
                token: action.payload.token,
                seekerLoading: false
            };
        case SEEKER_ACTION.FAILED_GET_SEEKER:
            return {
                ...state,
                seeker: {email: "", name: ""},
                seekerLoading: false
            };
        default:
            return state
    }
}