import styled from 'styled-components';

export const TaskContainer = styled.div<{ isDragging: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  border: 1px solid;
  border-radius: 0.25rem;
  cursor: grab;

  border-color: ${({ isDragging }) => (isDragging ? '#EC7063' : '#ccc')};

  h3 {
    margin: 0;
    font-size: 1rem;
    font-weight: 500;
  }
`;
