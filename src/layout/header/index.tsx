import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { ButtonTheme } from '@/components';
import { useActiveMenu } from '@/hooks';
import { useAuth } from '@/provider/auth-provider';
import { HOME_PATH, LOGIN_PATH } from '@/data/constant/path';
import { Todos } from '@/pages';
import AuthPage from '@/pages/auth';

const HeaderComponent = () => {
  const { checkActive } = useActiveMenu();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const navList = useMemo(() => {
    const navs = [
      {
        key: LOGIN_PATH,
        label: 'Login',
        element: <AuthPage />,
      },
      {
        key: HOME_PATH,
        label: 'Home',
        element: <Todos />,
      },
    ];

    return navs.filter((nav) => {
      if (nav.key === LOGIN_PATH && isAuthenticated) return false;
      return true;
    });
  }, [isAuthenticated]);

  return (
    <header className="bg-secondary block fixed w-full inset-x-0 z-30 h-16 px-4 shadow-xl">
      <div className="w-full h-full flex items-center justify-between mx-auto">
        <div className="w-full flex justify-between items-center">
          <div className="flex gap-5">
            {navList.map((item) => (
              <Link key={item.key} to={item.key}>
                <span
                  className={`uppercase font-bold text-sm px-4 py-2 ${
                    checkActive(item.key)
                      ? 'bg-slate-400 dark:bg-slate-700'
                      : 'bg-slate-300 dark:bg-slate-500'
                  }  hover:bg-slate-400  dark:hover:bg-slate-700 rounded-md transition-all duration-150`}
                >
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
          <div>
            <ButtonTheme />
            {isAuthenticated && (
              <IconButton onClick={handleLogout} color="inherit">
                <LogoutIcon />
              </IconButton>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;
