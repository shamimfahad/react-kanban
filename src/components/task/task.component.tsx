import { DraggableProvided } from 'react-beautiful-dnd';

import { ITask } from 'helpers/types';

import { TaskContainer } from './task.styles';
import getStyle from 'helpers/getStyle';

interface ITaskProps {
  task: ITask;
  provided: DraggableProvided;
  isDragging: boolean;
  style: any;
}

const Task = (props: ITaskProps) => {
  const { task, provided, isDragging, style } = props;
  return (
    <TaskContainer
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      isDragging={isDragging}
      style={getStyle({
        draggableStyle: provided.draggableProps.style,
        virtualStyle: style,
        isDragging,
      })}
    >
      <h3>{task.title}</h3>
    </TaskContainer>
  );
};

export default Task;
