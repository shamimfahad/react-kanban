import { memo, useLayoutEffect, useRef } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { FixedSizeList } from 'react-window';

import { IColumn } from 'helpers/types';

import Row from 'components/row/row.component';
import { TaskContainer } from 'components/task/task.styles';
import { TasksContainerDiv } from './column.styles';

interface ITasksContainer {
  column: IColumn;
  index: number;
}

const TasksContainer = (props: ITasksContainer) => {
  const { column, index: columnIndex } = props;

  const listRef = useRef<any>();
  useLayoutEffect(() => {
    const list = listRef.current;
    if (list) {
      list.scrollTo(0);
    }
  }, [columnIndex]);

  return (
    <Droppable
      droppableId={column.id}
      key={column.id}
      mode='virtual'
      renderClone={(provided, snapshot, ruberic) => {
        const allowedProps = { ref: provided.innerRef };
        return (
          <TaskContainer
            {...allowedProps}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            isDragging={snapshot.isDragging}
          >
            <h3>{column.tasks[ruberic.source.index].title}</h3>
          </TaskContainer>
        );
      }}
    >
      {(provided, snapshot) => {
        const itemCount = snapshot.isUsingPlaceholder
          ? column.tasks.length + 1
          : column.tasks.length;

        return (
          <TasksContainerDiv isDraggingOver={snapshot.isDraggingOver}>
            <FixedSizeList
              height={window.innerHeight > 760 ? 600 : 500}
              itemCount={itemCount}
              itemSize={70}
              width={300}
              outerRef={provided.innerRef}
              itemData={column.tasks}
              className='task-list'
              ref={listRef}
            >
              {Row}
            </FixedSizeList>
          </TasksContainerDiv>
        );
      }}
    </Droppable>
  );
};

export default memo(TasksContainer);
