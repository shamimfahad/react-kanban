import { useState } from 'react';

import { useBoardContext } from 'context/board-context';
import { IColumn } from 'helpers/types';

import {
  AddTask,
  ColumnContainer,
  ColumnHeader,
  ColumnName,
  TaskInput,
} from './column.styles';
import TasksContainer from './tasks-container.component';

interface IColumnProps {
  column: IColumn;
  index: number;
}

const Column = (props: IColumnProps) => {
  const { column, index } = props;
  const [showTaskInput, setShowTaskInput] = useState<boolean>(false);
  const [taskTitle, setTaskTitle] = useState<string>('');
  const { dispatch } = useBoardContext();

  const toggleTaskInput = () => {
    setShowTaskInput(!showTaskInput);
  };

  const addTask = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (taskTitle.length === 0) toggleTaskInput();
      else {
        const payload = {
          columnId: column.id,
          taskTitle,
        };
        dispatch({
          type: 'ADD_TASK',
          payload,
        });
        setTaskTitle('');
        toggleTaskInput();
      }
    }
  };

  return (
    <ColumnContainer>
      {/* Column Header */}
      <ColumnHeader>
        <ColumnName name={column.title.toLowerCase().replace(/ /g, '-')}>
          {column.title}
        </ColumnName>
        {column.userCanAddTask && (
          <AddTask onClick={toggleTaskInput}>
            {showTaskInput ? <>&#8722;</> : <>&#43;</>}
          </AddTask>
        )}
      </ColumnHeader>
      {/* Create Task Input */}
      {showTaskInput && (
        <TaskInput
          onChange={(e) => {
            setTaskTitle(e.target.value);
          }}
          autoFocus
          onKeyDown={addTask}
        />
      )}
      {/* Droppable zone of column */}
      <TasksContainer column={column} index={index} />
    </ColumnContainer>
  );
};

export default Column;
