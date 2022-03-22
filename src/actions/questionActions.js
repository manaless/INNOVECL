export const addQuestions = (questions) => (dispatch, getState) => {
    return dispatch({ type: "SELECT_QUESTION", payload: { questions } });
};
