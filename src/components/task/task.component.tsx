import { ITask } from 'context/board-context';
import { Draggable } from 'react-beautiful-dnd';
import { TaskContainer } from './task.styles';

interface ITaskProps {
  task: ITask;
  index: number;
}

const Task = (props: ITaskProps) => {
  const { task, index } = props;
  return (
    <Draggable draggableId={task.id} key={task.id} index={index}>
      {(provided, snapshot) => {
        const allowedProps = { ref: provided.innerRef };
        return (
          <TaskContainer
            {...allowedProps}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            isDragging={snapshot.isDragging}
          >
            <h3>{task.title}</h3>
          </TaskContainer>
        );
      }}
    </Draggable>
  );
};

export default Task;
