import { ReactNode } from 'react';

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

export type IState = {
  currentBoard: Board;
};

export type DraggableLocation = {
  droppableId: string;
  index: number;
};

export type Dispatch = (action: Action) => void;

export type ProviderProps = { children: ReactNode };

export type Action =
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
