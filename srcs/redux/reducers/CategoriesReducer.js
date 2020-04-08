import {EditBoolean} from '../actions/CategoriesActions';

const INITIAL_STATE = {
  edit: false,
};

const CategoriesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default CategoriesReducer;
