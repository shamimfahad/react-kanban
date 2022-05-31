import { useReducer, createContext, ReactNode, useContext } from 'react';
import { v4 as uuid } from 'uuid';
import { faker } from '@faker-js/faker';
import { generateTasks } from 'helpers/generateTasks';

export type ITask = {
  id: string;
  title: string;
  positionInColumn: number;
};

export type IColumn = {
  id: string;
  title: string;
  userCanAddTask: boolean;
  tasks: ITask[];
};

export type Board = {
  id: string;
  title: string;
  columns: IColumn[];
};

export type State = {
  currentBoard: Board;
};

export type DraggableLocation = {
  droppableId: string;
  index: number;
};

const ColumnNames = [
  { title: 'Backlog', userCanAddTask: true },
  { title: 'To Do', userCanAddTask: true },
  { title: 'In Progress', userCanAddTask: false },
  { title: 'Done', userCanAddTask: false },
];
const columns: IColumn[] = ColumnNames.map((columnName) => {
  return {
    id: uuid(),
    title: columnName.title,
    userCanAddTask: columnName.userCanAddTask ?? false,
    tasks: generateTasks(faker.mersenne.rand(100, 2)),
  };
});

const initialState: State = {
  currentBoard: {
    id: uuid(),
    title: 'Kanban Board',
    columns,
  },
};

type Action =
  | {
      type: 'ADD_TASK';
      payload: {
        columnId: string;
        taskTitle: string;
      };
    }
  | {
      type: 'MOVE_TASK';
      payload: {
        source: DraggableLocation;
        destination: DraggableLocation;
      };
    };

type Dispatch = (action: Action) => void;
type ProviderProps = { children: ReactNode };

export const BoardContext = createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

const boardReducer = (state: State, action: Action) => {
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

function BoardContextProvider({ children }: ProviderProps) {
  const [state, dispatch] = useReducer(boardReducer, initialState);
  const value = { state, dispatch };
  return (
    <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
  );
}

function useBoardContext() {
  const context = useContext(BoardContext);
  if (context === undefined) {
    throw new Error(
      'useBoardContext must be used within a BoardContextProvider'
    );
  }
  return context;
}

export { BoardContextProvider, useBoardContext };
