export const ideasReducer = (state = [], action) => {
    switch (action.type) {
        case "ADD_IDEAS":
            return [...action.payload];
        case "RESET":
            return (state = []);
        default:
            return state;
    }
};
