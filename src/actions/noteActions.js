export const addNotes =
    ({ step, notes }) =>
    (dispatch, getState) => {
        return dispatch({ type: "ADD_NOTES", payload: { step, data: notes } });
    };
