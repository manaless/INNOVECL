export const criteriaReducer = (
    state = { selectedCriteria: [[], [], []] },
    action
) => {
    switch (action.type) {
        case "SELECT_CRITERIA":
            const arr = state.selectedCriteria;
            arr[action.payload.step] = action.payload.criteria;
            return {
                ...state,
                selectedCriteria: arr,
            };
        case "RESET":
            return (state = { selectedCriteria: [[], [], []] });
        default:
            return state;
    }
};
