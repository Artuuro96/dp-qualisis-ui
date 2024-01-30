import { ReactNode } from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';
import Login from './components/Login';
import Orders from './components/Orders.tsx';
import Staff from './components/Staff.tsx';
import Frame from './components/frame/Frame.tsx';
import Assignments from './components/Assignments.tsx';
import Clients from './components/Clientes.tsx';
import Tools from './components/Tools.tsx';

export default function Router(): ReactNode {
  const routes: RouteObject[] = [
    {
      element: <Login />,
      path: '/',      
    },
    {
      element: <Frame />,
      children: [
        {
          path: '/ordenes',
          element: <Orders />
        },
        {
          path: '/asignaciones',
          element: <Assignments />
        },
        {
          path: '/personal',
          element: <Staff />
        },
        {
          path: '/clientes',
          element: <Clients />
        },
        {
          path: '/herramientas',
          element: <Tools />
        }
      ]
    },
    {
      path: '*',
      element: <Navigate to="/recents" replace />,
    },
  ];

  const routesElement = useRoutes(routes);

  return routesElement;
}
