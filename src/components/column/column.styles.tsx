import styled from 'styled-components';

export const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  width: 300px;
  position: relative;
`;

export const TasksContainer = styled.div<{ isDraggingOver: boolean }>`
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: calc(100% - 1rem);
  position: relative;
  flex-grow: 1;
  background-color: ${({ isDraggingOver }) =>
    isDraggingOver ? '#f5f5f5' : '#fff'};
  border-radius: 0.25rem;
  height: 600px;
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
