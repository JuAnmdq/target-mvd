import React from 'react';
import { Switch, BrowserRouter } from 'react-router-dom';

import { useSession } from 'hooks';
import RouteFromPath from 'components/routes/RouteFromPath';
import routes from '../routes';

const App = () => {
  const { authenticated } = useSession();

  return (
    <BrowserRouter>
      <Switch>
        {routes.map((route, index) => (
          <RouteFromPath key={`route${index}`} {...route} authenticated={authenticated} />
        ))}
      </Switch>
    </BrowserRouter>
  );
};

export default App;
