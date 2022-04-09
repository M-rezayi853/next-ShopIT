import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_RESET,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  UPDATE_PASSWORD_RESET,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_RESET,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_RESET,
  CLEAR_ERROR,
} from '../constants/userConstants'

export const authReducer = (state = { user: null }, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
      return {
        loading: true,
      }

    case REGISTER_USER_SUCCESS:
      return {
        loading: false,
        success: true,
      }

    case REGISTER_USER_FAIL:
      return {
        loading: false,
        error: action.payload,
      }

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      }

    default:
      return state
  }
}

export const loadedUserReducer = (
  state = { loading: true, user: null },
  action
) => {
  switch (action.type) {
    case LOAD_USER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      }

    case LOAD_USER_SUCCESS:
      return {
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      }

    case LOAD_USER_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        error: action.payload,
      }

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      }

    default:
      return state
  }
}

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_REQUEST:
    case UPDATE_PASSWORD_REQUEST:
    case UPDATE_USER_REQUEST:
    case DELETE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      }

    case UPDATE_PROFILE_SUCCESS:
    case UPDATE_PASSWORD_SUCCESS:
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      }

    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      }

    case UPDATE_PROFILE_FAIL:
    case UPDATE_PASSWORD_FAIL:
    case UPDATE_USER_FAIL:
    case DELETE_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    case UPDATE_PROFILE_RESET:
    case UPDATE_PASSWORD_RESET:
    case UPDATE_USER_RESET:
      return {
        ...state,
        loading: false,
        isUpdated: false,
      }

    case DELETE_USER_RESET:
      return {
        ...state,
        loading: false,
        isDeleted: false,
      }

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      }

    default:
      return state
  }
}

export const forgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST:
    case RESET_PASSWORD_REQUEST:
      return {
        loading: true,
      }

    case FORGOT_PASSWORD_SUCCESS:
      return {
        loading: false,
        message: action.payload,
      }

    case RESET_PASSWORD_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      }

    case FORGOT_PASSWORD_FAIL:
    case RESET_PASSWORD_FAIL:
      return {
        loading: false,
        error: action.payload,
      }

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      }

    default:
      return state
  }
}

// ADMIN reducers

export const allUsersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case ALL_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      }

    case ALL_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      }

    case ALL_USERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      }

    default:
      return state
  }
}

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      }

    case USER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      }

    case USER_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    case USER_DETAILS_RESET:
      return {
        ...state,
        loading: false,
        user: {},
      }

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      }

    default:
      return state
  }
}
