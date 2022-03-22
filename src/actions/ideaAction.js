export const addIdeas = (ideas) => (dispatch, getState) => {
    return dispatch({ type: "ADD_IDEAS", payload: ideas });
};
