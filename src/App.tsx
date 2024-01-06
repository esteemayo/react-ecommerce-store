import { RouterProvider } from 'react-router-dom';

import { router } from './utils/route';

function App() {
  return <RouterProvider router={router} />;
}

export default App;
