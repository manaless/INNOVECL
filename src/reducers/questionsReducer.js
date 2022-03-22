export const questionsReducer = (state = { selectedQuestions: [] }, action) => {
    switch (action.type) {
        case "SELECT_QUESTION":
            return {
                ...state,
                selectedQuestions: action.payload,
            };
        case "RESET":
            return (state = { selectedQuestions: [] });
        default:
            return state;
    }
};
