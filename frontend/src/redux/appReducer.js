const initialState = {
  user: null
}

function appReducer(state = initialState, action) {
  const stateCopy = JSON.parse(JSON.stringify(state))

  switch (action.type) {
    case "setUser":
      stateCopy.user = action.payload
      return stateCopy;

    default:
      return stateCopy;
  }


}

export default appReducer