import {Company} from "../../../types/Company";

export type CompanyState = {
    companies: Company[],
    loading: boolean,
    error: any
}

export type CompanyAction = {
    type: string,
    payload: Company[],
    error?: any
}

export const initialCompanyState: CompanyState = {
    companies: [],
    loading: false,
    error: null
}

export const COMPANY_ACTIONS = {
    API_CALL: "api-call",
    SUCCESS: "success",
    ERROR: "error",
    DONE: "api-call-done"
}

export const companyReducer = (state: CompanyState, action: CompanyAction): CompanyState => {
    switch (action.type) {
        case COMPANY_ACTIONS.API_CALL:
            return {
                ...state,
                loading: true
            }
        case COMPANY_ACTIONS.SUCCESS:
            return {
                ...state,
                loading: false,
                companies: action.payload
            }
        case COMPANY_ACTIONS.ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case COMPANY_ACTIONS.DONE:
            return {
                ...state,
                loading:false
            }
        default:
            return state
    }
}