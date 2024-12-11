import { cloneDeep } from 'lodash';
import { Link } from 'react-router-dom';

import { HOME_PATH, LOGIN_PATH } from './path';
import { TypeNavs, TypeRoutes } from './type-navs';
import { Todos } from '@/pages';
import { capitalizeFirstLetter } from '@/utils';
import AuthPage from '@/pages/auth';
import { getAuthToken } from '@/features/auth/services/auth-storage';

const isAuthenticated = !!getAuthToken();

const navs: TypeNavs[] = [
  {
    key: LOGIN_PATH,
    label: 'login',
    element: <AuthPage />,
  },
  {
    key: HOME_PATH,
    label: 'Home',
    element: <Todos />,
  },
];

const filteredNavs = navs.filter((nav) => {
  if (nav.key === LOGIN_PATH && isAuthenticated) return false;
  return true;
});

const getRoutes = (arr: TypeRoutes[], nav: TypeNavs, basePath = '') => {
  if (nav.children) {
    for (const n of nav.children) {
      getRoutes(arr, n, basePath + nav.key);
    }
  }
  if (!nav.element) return;

  arr.push({
    path: basePath + nav.key,
    element: nav.element,
  });

  return arr;
};

const addLink = (nav: TypeNavs, path: string) => {
  return nav.children ? (
    capitalizeFirstLetter(nav.label as string)
  ) : (
    <Link to={path}>{capitalizeFirstLetter(nav.label as string)}</Link>
  );
};

const getShowNavigation = (
  nav: TypeNavs,
  basePath = '',
): TypeNavs | undefined => {
  if (!nav.label) return;
  if (nav.children) {
    const arr: TypeNavs[] = [];
    for (const n of nav.children) {
      const formatN = getShowNavigation(n, basePath + nav.key);
      if (formatN) arr.push(formatN);
    }

    nav.children = arr.length > 0 ? arr : undefined;
  }

  return {
    key: basePath + nav.key,
    label: addLink(nav, basePath + nav.key),
    children: nav.children,
    element: nav.element,
  };
};

const menuList: TypeNavs[] = [];
const routeList: TypeRoutes[] = [];
const navList: TypeNavs[] = filteredNavs.map((nav) => ({
  key: nav.key,
  label: nav.label,
}));

for (const nav of filteredNavs) {
  const nav1 = cloneDeep(nav);
  const n = getShowNavigation(nav1);
  n && menuList.push(n);

  const nav2 = cloneDeep(nav);
  getRoutes(routeList, nav2);
}

export { routeList, menuList, navList };
