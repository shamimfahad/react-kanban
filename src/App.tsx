import { GlobalContextProvider } from 'context/global-context';

import Board from './components/board/board.component';
import { AppBanner, AppContainer } from 'App.styles';

const App = () => {
  return (
    <GlobalContextProvider>
      <AppContainer>
        <AppBanner>React Kanban</AppBanner>
        <Board />
      </AppContainer>
    </GlobalContextProvider>
  );
};

export default App;
