export const stepSReducer = (state = 3, action) => {
    switch (action.type) {
        case "END_STEP":
            return state - 1;
        case "RESET":
            return (state = 3);
        default:
            return state;
    }
};
