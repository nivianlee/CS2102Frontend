export function reducer(
  state = {
    errorMessage: '',
    fdsManagers: [],
    selectedFDSManager: {},
    restaurants: [],
    selectedRestaurant: {},
    loggedInRestaurant: {},
    isAccountFDSManager: false,
    isAccountRestaurant: false,
  },
  action
) {
  switch (action.type) {
    case 'SET_ERRORMESSAGE':
      return {
        ...state,
        errorMessage: action.data,
      };
    case 'SET_FDSMANAGERS':
      return {
        ...state,
        fdsManagers: action.data,
      };
    case 'SET_SELECTED_FDSMANAGERS':
      return {
        ...state,
        selectedFDSManager: action.data,
      };
    case 'SET_RESTAURANTS':
      return {
        ...state,
        restaurants: action.data,
      };
    case 'SET_SELECTED_RESTAURANTS':
      return {
        ...state,
        selectedRestaurant: action.data,
      };
    case 'SET_LOGGEDIN_RESTAURANT':
      return {
        ...state,
        loggedInRestaurant: action.data,
      };
    case 'SET_ACCOUNT_FDSMANAGER':
      return {
        ...state,
        isAccountFDSManager: action.data,
      };
    case 'SET_ACCOUNT_RESTAURANT':
      return {
        ...state,
        isAccountRestaurant: action.data,
      };
    default:
      return state;
  }
}
