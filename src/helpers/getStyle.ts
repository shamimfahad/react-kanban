export const getStyle = ({ draggableStyle, virtualStyle, isDragging }: any) => {
  const combined = {
    ...virtualStyle,
    ...draggableStyle,
  };
  const grid = 8;

  // using draggable style for placement when dragging
  const result = {
    ...combined,
    height: combined.height - grid * 3,
    left: combined.left + grid,
    width: isDragging
      ? draggableStyle.width
      : `calc(${combined.width} - 2.5rem)`,
    marginBottom: grid,
  };

  return result;
};

export default getStyle;
