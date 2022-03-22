export const notesReducer = (state = [[], [], []], action) => {
    switch (action.type) {
        case "ADD_NOTES":
            state[action.payload.step] = action.payload.data;
            return state;
        case "RESET":
            return (state = [[], [], []]);
        default:
            return state;
    }
};
