export function reducer(
  state = {
    errorMessage: '',
    loggedInUser: {},
    loggedInUserType: '',
    fdsManagers: [],
    selectedFDSManager: {},
    restaurants: [],
    selectedRestaurant: {},
  },
  action
) {
  switch (action.type) {
    case 'SET_ERRORMESSAGE':
      return {
        ...state,
        errorMessage: action.data,
      };
    case 'SET_LOGGEDIN_USER':
      return {
        ...state,
        loggedInUser: action.data,
      };
    case 'SET_LOGGEDIN_USERTYPE':
      return {
        ...state,
        loggedInUserType: action.data,
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
    default:
      return state;
  }
}
