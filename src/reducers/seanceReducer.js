export const seanceReducer = (state = {}, action) => {
    switch (action.type) {
        case "ADD_SEANCE":
            return { ...state, seance: action.payload };
        case "RESET":
            return (state = {});
        default:
            return state;
    }
};
