import { BoardContextProvider } from 'context/board-context';
import Board from './components/board/board.component';

const App = () => {
  return (
    <BoardContextProvider>
      <div className='App'>
        <h2>React Kanban</h2>
        <Board />
      </div>
    </BoardContextProvider>
  );
};

export default App;
