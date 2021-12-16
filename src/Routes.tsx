import { BrowserRouter, Routes as ReactRoutes, Route } from 'react-router-dom';

import { SelectGame } from './pages/SelectGame';
import { Game } from './pages/Game';
import { NotFound } from './pages/NotFound';

export default function Routes() {
  return (
    <BrowserRouter>
      <ReactRoutes>
        <Route path='/'>
          <Route index element={<SelectGame />} />
          <Route path='play' element={<SelectGame />} />
          <Route path='play/:gameId' element={<Game />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </ReactRoutes>
    </BrowserRouter>
  );
}
