export const addCriteria =
    ({ step, criteria }) =>
    (dispatch, getState) => {
        return dispatch({
            type: "SELECT_CRITERIA",
            payload: { step, criteria },
        });
    };
export const reset = () => (dispatch, getState) => {
    return dispatch({
        type: "RESET",
    });
};
