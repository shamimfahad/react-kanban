import styled from 'styled-components';

export const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  width: 300px;
  position: relative;
`;

export const TasksContainerDiv = styled.div<{ isDraggingOver?: boolean }>`
  background-color: ${({ isDraggingOver }) =>
    isDraggingOver ? '#EBF5FB' : '#fff'};
`;

export const AddTask = styled.button`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  background-color: #fff;
  cursor: pointer;
  height: 1rem;
  width: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ColumnHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  padding: 0.5rem;

  h3 {
    margin: 0;
    flex-grow: 1;
  }

  ${AddTask} {
    justify-self: flex-end;
  }
`;

export const ColumnName = styled.h3<{ name: string }>`
  color: ${({ name }) =>
    name === 'to-do'
      ? 'darkorange'
      : name === 'in-progress'
      ? 'dodgerblue'
      : name === 'done'
      ? 'limegreen'
      : '#333'};
`;

export const TaskInput = styled.input.attrs({
  type: 'text',
  placeholder: 'Type the title and press Enter',
})`
  margin: 0.5rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  background-color: #fff;
  width: calc(100% - 2rem);
`;
