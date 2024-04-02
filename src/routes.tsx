import { ReactNode } from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';
import Login from './components/Login';
import Orders from './components/orders-page/orders/Orders.tsx';
import Staff from './components/staff/Staff.tsx';
import Frame from './components/frame/Frame.tsx';
import Assignments from './components/Assignments.tsx';
import Clients from './components/Clients.tsx';
import Tools from './components/Tools.tsx';
import { TitleContextProvider } from './context/TitleContext.tsx';
import LoginRole from './components/LoginRole.tsx';
import { DocumentsNavigation } from './components/orders-page/DocumentsNavigation.tsx';
import { Entries } from './components/orders-page/entries/Entries.tsx';

export default function Router(): ReactNode {
  const routes: RouteObject[] = [
    {
      element: <Login />,
      path: '/',   
    },
    {
      element: <LoginRole />,
      path: '/loginAs',   
    },
    {
      element: (
        <TitleContextProvider>
          <Frame />
        </TitleContextProvider>
      ),
      children: [
        {
          path: '/documentos',
          element: <DocumentsNavigation />,
          children: [
            {
              path: '/documentos/ordenes',
              element: <Orders />
            },
            {
              path: '/documentos/entradas',
              element: <Entries />
            }
          ]
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
