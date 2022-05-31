import styled from 'styled-components';

export const TaskContainer = styled.div<{ isDragging: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  width: calc(100% - 1.1rem);
  cursor: grab;
  background-color: ${({ isDragging }) => (isDragging ? '#f5f5f5' : '#fff')};

  h3 {
    margin: 0;
    font-size: 1rem;
    font-weight: 500;
  }
`;
