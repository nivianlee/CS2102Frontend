export function reducer(
  state = {
    errorMessage: '',
    loggedInUser: {},
    loggedInUserType: '',
    fdsManagers: [],
    selectedFDSManager: {},
    restaurants: [],
    selectedRestaurant: {},
    completedOrders: [],
    summaryOne: [],
    summaryTwo: [],
    summaryThree: [],
    summaryFour: [],
    shiftsTable: [],
    fullTimeRiders: [],
    partTimeRiders: [],
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
    case 'SET_COMPLETED_ORDERS':
      return {
        ...state,
        completedOrders: action.data,
      };
    case 'SET_SUMMARY_ONE':
      return {
        ...state,
        summaryOne: action.data,
      };
    case 'SET_SUMMARY_TWO':
      return {
        ...state,
        summaryTwo: action.data,
      };
    case 'SET_SUMMARY_THREE':
      return {
        ...state,
        summaryThree: action.data,
      };
    case 'SET_SUMMARY_FOUR':
      return {
        ...state,
        summaryFour: action.data,
      };
    case 'SET_SHIFTS_TABLE':
      return {
        ...state,
        shiftsTable: action.data,
      };
    case 'SET_FULLTIME_RIDERS':
      return {
        ...state,
        fullTimeRiders: action.data,
      };
    case 'SET_PARTTIME_RIDERS':
      return {
        ...state,
        partTimeRiders: action.data,
      };
    default:
      return state;
  }
}
