import { lazy } from 'react';

const Home = lazy(() => import('@/pages/home'));

const Todos = lazy(() => import('@/pages/home/index'));

export { Home, Todos };
