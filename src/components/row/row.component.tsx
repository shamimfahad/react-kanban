import { memo } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { areEqual } from 'react-window';

import Task from 'components/task/task.component';

const Row = (props: any) => {
  const { data: items, index, style } = props;
  const item = items[index];

  //rendering an extra item for the placeholder
  if (!item) {
    return null;
  }

  return (
    <Draggable draggableId={item.id} index={index} key={item.id}>
      {(provided, snapshot) => (
        <Task
          provided={provided}
          task={item}
          isDragging={snapshot.isDragging}
          style={style}
        />
      )}
    </Draggable>
  );
};

export default memo(Row, areEqual);
