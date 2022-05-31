import { IColumn, useBoardContext } from 'context/board-context';
import { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';

import Task from '../task/task.component';
import {
  AddTask,
  ColumnContainer,
  ColumnHeader,
  TaskInput,
  TasksContainer,
} from './column.styles';

interface IColumnProps {
  column: IColumn;
  index: number;
}

const Column = (props: IColumnProps) => {
  const { column } = props;
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
      <ColumnHeader>
        <h3>{column.title}</h3>
        {column.userCanAddTask && (
          <AddTask onClick={toggleTaskInput}>
            {showTaskInput ? <>&#8722;</> : <>&#43;</>}
          </AddTask>
        )}
      </ColumnHeader>
      {showTaskInput && (
        <TaskInput
          onChange={(e) => {
            setTaskTitle(e.target.value);
          }}
          autoFocus
          onKeyDown={addTask}
        />
      )}
      <Droppable droppableId={column.id} key={column.id}>
        {(provided, snapshot) => (
          <TasksContainer
            {...provided.droppableProps}
            ref={provided.innerRef}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {column.tasks.map((task, index) => (
              <Task key={task.id} task={task} index={index} />
            ))}
          </TasksContainer>
        )}
      </Droppable>
    </ColumnContainer>
  );
};

export default Column;
