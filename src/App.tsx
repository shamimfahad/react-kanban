import { BoardContextProvider } from 'context/board-context';

import Board from './components/board/board.component';
import { AppBanner, AppContainer } from 'App.styles';

const App = () => {
  return (
    <BoardContextProvider>
      <AppContainer>
        <AppBanner>React Kanban</AppBanner>
        <Board />
      </AppContainer>
    </BoardContextProvider>
  );
};

export default App;
