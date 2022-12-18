import {
  Add_Task_Failed,
  Add_Task_Start,
  Add_Task_Sucess,
  Delete_Task_Failed,
  Delete_Task_Start,
  Delete_Task_Sucess,
  Edit_Task_Failed,
  Edit_Task_Start,
  Edit_Task_Sucess,
  Get_Tasks_Failed,
  Get_Tasks_Start,
  Get_Tasks_Sucess,
} from '../actions/types';

const INIT_STATE = {
  tasks: [],
  errorMessage: null,
  loading: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case Add_Task_Start:
      return {...state, loading: true};
    case Add_Task_Sucess:
      return {...state, loading: false};
    case Add_Task_Failed:
      return {...state, loading: false, errorMessage: action.errorMessage};

    case Get_Tasks_Start:
      return {...state, loading: true};
    case Get_Tasks_Sucess:
      return {...state, loading: false, tasks: action.tasks};
    case Get_Tasks_Failed:
      return {...state, loading: false, errorMessage: action.errorMessage};

    case Edit_Task_Start:
      return {...state, loading: true};
    case Edit_Task_Sucess:
      return {...state, loading: false};
    case Edit_Task_Failed:
      return {...state, loading: false};
      
    case Delete_Task_Start:
      return {...state, loading: true};
    case Delete_Task_Sucess:
      return {...state, loading: false};
    case Delete_Task_Failed:
      return {...state, loading: false, errorMessage: action.errorMessage};

    default:
      return state;
  }
};
