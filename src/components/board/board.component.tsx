import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import { useGlobalContext } from 'context/global-context';

import Column from '../column/column.component';

import { BoardContainer } from './board.styles';

const Board = () => {
  const {
    state: { currentBoard },
    dispatch,
  } = useGlobalContext();

  const dragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination } = result;
    dispatch({
      type: 'MOVE_TASK',
      payload: {
        source,
        destination,
      },
    });
  };

  return (
    <BoardContainer>
      <DragDropContext onDragEnd={dragEnd}>
        {currentBoard.columns
          ? currentBoard.columns.map((column, index) => (
              <Column key={column.id} column={column} index={index} />
            ))
          : null}
      </DragDropContext>
    </BoardContainer>
  );
};

export default Board;
