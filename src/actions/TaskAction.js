import {AsyncStorage} from 'react-native';
import api from '../api';
import constants from '../common/constants';
import {
  Add_Task_Start,
  Add_Task_Sucess,
  Add_Task_Failed,
  Delete_Task_Failed,
  Delete_Task_Start,
  Delete_Task_Sucess,
  Edit_Task_Failed,
  Edit_Task_Start,
  Edit_Task_Sucess,
  Get_Tasks_Failed,
  Get_Tasks_Start,
  Get_Tasks_Sucess,
} from './types';

export function addTask(task, navigation) {
  return async dispatch => {
    dispatch({
      type: Add_Task_Start,
    });
    let params = {
      todo: {
        name: task.name,
        description: task.desc,
        date: task.date,
        state: task.state,
      },
    };
    let response = await api.addTask(params),
      responseJson;
    if (constants.successStatusCode.includes(response.status)) {
      responseJson = await response.json();
      dispatch(handleAddTaskSuccess(responseJson, navigation));
    }
    if (constants.errorStatusCodeWithResponse.includes(response.status)) {
      responseJson = await response.json();
      dispatch(handleAddTaskError(responseJson));
    } else {
      dispatch(handleAddTaskError(null));
    }
  };
}

handleAddTaskSuccess = (res, navigation) => {
  navigation.goBack();
  return {
    type: Add_Task_Sucess,
  };
};

handleAddTaskError = res => {
  return {
    type: Add_Task_Failed,
    errorMessage: res?.message || 'Something wrong please try again',
  };
};

export function getTasks() {
  return async dispatch => {
    dispatch({
      type: Get_Tasks_Start,
    });
    const oldetag = await AsyncStorage.getItem(constants.TASKS_ETag);
    let response = await api.getTasks(),
      responseJson,
      etag;
    if (response) {
      switch (response.status) {
        case 200:
          etag = response.headers.get('etag');
          if (etag == oldetag || etag == null) {
            await getTasksFromCach(dispatch);
          } else {
            responseJson = await response.json();
            dispatch(handleGetTasksSuccess(responseJson));
          }
          break;
        case 201:
          responseJson = await response.json();
          dispatch(handleGetTasksSuccess(responseJson));
          break;
        case 400:
          responseJson = await response.json();
          dispatch(handleGetTasksError(responseJson));
          break;
        case 401:
          responseJson = await response.json();
          dispatch(handleGetTasksError(responseJson));
          break;
        case 500:
          responseJson = await response.json();
          dispatch(handleGetTasksError(responseJson));
          break;
        default:
          responseJson = await response.json();
          dispatch(handleGetTasksError(responseJson));
      }
    }
  };
}

getTasksFromCach = async dispatch => {
  let tasksString = await AsyncStorage.getItem(constants.CACHEDTASK);
  if (tasksString == null) {
    await AsyncStorage.removeItem(constants.TASKS_ETag);
    dispatch(getTasks());
  }
  tasksArray = JSON.parse(tasksString);
  dispatch({
    type: Get_Tasks_Sucess,
    tasks: tasksArray,
  });
};

handleGetTasksSuccess = (res, etag) => {
  AsyncStorage.setItem(constants.TASKS_ETag, etag);
  const stringTodos = JSON.stringify(res.todos);
  AsyncStorage.setItem(constants.CACHEDTASK, stringTodos)
    .catch(error => {
      console.log(error);
    });
  return {
    type: Get_Tasks_Sucess,
    tasks: res.todos,
  };
};

handleGetTasksError = res => {
  return {
    type: Get_Tasks_Failed,
    errorMessage: res?.message || 'Something wrong please try again',
  };
};

export function editTask(task, navigation, id) {
  return async dispatch => {
    dispatch({
      type: Edit_Task_Start,
    });
    let params = {
      todo: {
        name: task.name,
        description: task.desc,
        date: task.date,
        state: task.state,
      },
    };
    let response = await api.editTasks(params, id),
      responseJson;

    if (response) {
      if (constants.successStatusCode.includes(response.status)) {
        responseJson = await response.json();
        dispatch(handleEditTasksSuccess(responseJson, navigation));
      }
      if (constants.errorStatusCodeWithResponse.includes(response.status)) {
        responseJson = await response.json();
        dispatch(handleEditTasksError(responseJson));
      } else {
        dispatch(handleEditTasksError(null));
      }
    } else {
      dispatch(handleEditTasksError(null));
    }
  };
}

handleEditTasksSuccess = (res, navigation) => {
  if (navigation) {
    navigation.goBack();
  }
  return {
    type: Edit_Task_Sucess,
  };
};

handleEditTasksError = res => {
  return {
    type: Edit_Task_Failed,
    errorMessage: res?.message || 'Something wrong please try again',
  };
};

export function deleteTask(id, navigation) {
  return async dispatch => {
    dispatch({
      type: Delete_Task_Start,
    });

    let response = await api.deleteTask(id),
      responseJson;
    if (response) {
      switch (response.status) {
        case 200:
          responseJson = await response.json();

          dispatch(handleDeleteTasksSuccess(navigation));
          break;
        case 201:
          responseJson = await response.json();
          dispatch(handleDeleteTasksSuccess(navigation));
          break;
        case 400:
          responseJson = await response.json();

          dispatch(handleDeleteTasksError(responseJson));
          break;
        case 401:
          responseJson = await response.json();

          dispatch(handleDeleteTasksError(responseJson));
          break;
        case 500:
          responseJson = await response.json();
          dispatch(handleDeleteTasksError(responseJson));
          break;
        default:
          responseJson = await response.json();

          dispatch(handleDeleteTasksError(responseJson));
      }
    }
  };
}

handleDeleteTasksSuccess = navigation => {
  navigation?.goBack();
  return {
    type: Delete_Task_Sucess,
  };
};
handleDeleteTasksError = res => {
  return {
    type: Delete_Task_Failed,
    errorMessage: res?.message || 'Something wrong please try again',
  };
};
