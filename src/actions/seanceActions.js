export const addSeance = (seance) => (dispatch, getState) => {
    return dispatch({ type: "ADD_SEANCE", payload: { ...seance } });
};
