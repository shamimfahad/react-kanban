import { useReducer, createContext, useContext } from 'react';
import { v4 as uuid } from 'uuid';
import { faker } from '@faker-js/faker';

import { generateTasks } from 'helpers/generateTasks';
import {
  IColumn,
  IState,
  Action,
  Dispatch,
  ProviderProps,
} from 'helpers/types';

const ColumnNames = [
  { title: 'Backlog', userCanAddTask: true },
  { title: 'To Do', userCanAddTask: true },
  { title: 'In Progress', userCanAddTask: false },
  { title: 'Done', userCanAddTask: false },
];

const columns: IColumn[] = ColumnNames.map((columnName) => {
  const { title, userCanAddTask } = columnName;
  return {
    id: uuid(),
    title,
    userCanAddTask,
    // you can update no of tasks you want to generate here
    tasks: generateTasks(faker.mersenne.rand(100000, 2)),
  };
});

const initialState: IState = {
  currentBoard: {
    id: uuid(),
    title: 'Kanban Board',
    columns,
  },
};

export const GlobalContext = createContext<
  { state: IState; dispatch: Dispatch } | undefined
>(undefined);

const boardReducer = (state: IState, action: Action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        currentBoard: {
          ...state.currentBoard,
          columns: state.currentBoard.columns.map((column) => {
            if (column.id === action.payload.columnId) {
              return {
                ...column,
                tasks: [
                  ...column.tasks,
                  {
                    id: uuid(),
                    title: action.payload.taskTitle,
                    positionInColumn: column.tasks.length,
                  },
                ],
              };
            }
            return column;
          }),
        },
      };
    case 'MOVE_TASK':
      const { source, destination } = action.payload;
      const sourceColumn = state.currentBoard.columns.find(
        (column) => column.id === source.droppableId
      );
      const destinationColumn = state.currentBoard.columns.find(
        (column) => column.id === destination.droppableId
      );

      if (source.droppableId !== destination.droppableId) {
        const sourceColumnTasks = sourceColumn ? [...sourceColumn.tasks] : [];
        const destinationColumnTasks = destinationColumn
          ? [...destinationColumn.tasks]
          : [];

        let [sourceTask] = sourceColumnTasks.splice(source.index, 1);
        sourceTask = { ...sourceTask, positionInColumn: destination.index };
        destinationColumnTasks.splice(destination.index, 0, sourceTask);

        setTimeout(() => {
          alert(
            `Task moved from ${sourceColumn?.title} column position ${source.index} to ${destinationColumn?.title} column position ${destination.index}`
          );
        }, 500);

        return {
          ...state,
          currentBoard: {
            ...state.currentBoard,
            columns: state.currentBoard.columns.map((column) => {
              if (column.id === source.droppableId) {
                return {
                  ...column,
                  tasks: sourceColumnTasks,
                };
              }
              if (column.id === destination.droppableId) {
                return {
                  ...column,
                  tasks: destinationColumnTasks,
                };
              }
              return column;
            }),
          },
        };
      } else {
        const column = state.currentBoard.columns.find(
          (column) => column.id === destination.droppableId
        );
        const columnTasks = column ? [...column.tasks] : [];
        let [task] = columnTasks.splice(source.index, 1);
        task = { ...task, positionInColumn: destination.index };
        columnTasks.splice(destination.index, 0, task);

        setTimeout(() => {
          alert(
            `Task moved from ${sourceColumn?.title} column position ${source.index} to ${destinationColumn?.title} column position ${destination.index}`
          );
        }, 500);

        return {
          ...state,
          currentBoard: {
            ...state.currentBoard,
            columns: state.currentBoard.columns.map((column) => {
              if (column.id === destination.droppableId) {
                return {
                  ...column,
                  tasks: columnTasks,
                };
              }
              return column;
            }),
          },
        };
      }
    default: {
      throw new Error(`Unhandled action: ${action}`);
    }
  }
};

function GlobalContextProvider({ children }: ProviderProps) {
  const [state, dispatch] = useReducer(boardReducer, initialState);
  const value = { state, dispatch };
  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}

function useGlobalContext() {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error(
      'useGlobalContext must be used within a GlobalContextProvider'
    );
  }
  return context;
}

export { GlobalContextProvider, useGlobalContext };
