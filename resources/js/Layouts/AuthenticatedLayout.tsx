import { useState, useEffect, useRef } from 'react';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import ThemeButton from '@/Components/ThemeButton';
import { BellIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { User } from '@/types';
import { Link } from '@inertiajs/react';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import { PropsWithChildren, ReactNode } from 'react';

type Notification = {
  id: number;
  message: string;
  formatted_date_time: string;
  read: boolean;
};

export default function Authenticated({
  user,
  header,
  children,
}: PropsWithChildren<{
  user: User;
  header?: ReactNode;
}>) {
  const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
  const [showInstancesDropdown, setShowInstancesDropdown] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRefDesktop = useRef<HTMLDivElement>(null);
  const dropdownRefMobile = useRef<HTMLDivElement>(null);
  const [showDropdownDesktop, setShowDropdownDesktop] = useState(false);
  const [showDropdownMobile, setShowDropdownMobile] = useState(false);

  useEffect(() => {
    axios.get('/notifications').then((response) => {
      setNotifications(response.data.notifications);
      setUnreadCount(response.data.unread_count);
    });
  }, []);

  const toggleDropdownDesktop = () => {
    setShowDropdownDesktop((prev) => !prev);
    if (unreadCount > 0 && !showDropdownDesktop) {
      axios.post('/notifications/mark-read').then(() => setUnreadCount(0));
    }
  };

  const toggleDropdownMobile = () => {
    setShowDropdownMobile((prev) => !prev);
    if (unreadCount > 0 && !showDropdownMobile) {
      axios.post('/notifications/mark-read').then(() => setUnreadCount(0));
    }
  };

  const handleOutsideClickDesktop = (event: MouseEvent) => {
    if (dropdownRefDesktop.current && !dropdownRefDesktop.current.contains(event.target as Node)) {
      setShowDropdownDesktop(false);
    }
  };

  const handleOutsideClickMobile = (event: MouseEvent) => {
    if (dropdownRefMobile.current && !dropdownRefMobile.current.contains(event.target as Node)) {
      setShowDropdownMobile(false);
    }
  };

  useEffect(() => {
    if (showDropdownDesktop) {
      document.addEventListener('click', handleOutsideClickDesktop);
    } else {
      document.removeEventListener('click', handleOutsideClickDesktop);
    }
  
    return () => {
      document.removeEventListener('click', handleOutsideClickDesktop);
    };
  }, [showDropdownDesktop]);

  useEffect(() => {
    if (showDropdownMobile) {
      document.addEventListener('click', handleOutsideClickMobile);
    } else {
      document.removeEventListener('click', handleOutsideClickMobile);
    }
  
    return () => {
      document.removeEventListener('click', handleOutsideClickMobile);
    };
  }, [showDropdownMobile]);

  return (
    <div className="min-h-screen">
      <nav className="border-b border-gray-100 dark:border-gray-700">
        <div className={cn('px-4 mx-auto max-w-[1728px] sm:px-6 lg:px-8')}>
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex items-center shrink-0">
                <Link href="/">
                  <img
                    className="w-auto h-10 m-auto rounded-full"
                    src="/images/logo.jpeg"
                    alt="Logo"
                  />
                </Link>
              </div>
              <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                  Dashboard
                </NavLink>
                <NavLink href={route('instances.index')} active={route().current('instances.index')}>
                  Dinas
                </NavLink>
                <DropdownMenu onOpenChange={setShowInstancesDropdown}>
                  <DropdownMenuTrigger asChild className="flex items-center">
                    <button>
                      <NavLink href="#" active={route().current('documents.*')}>
                        Kantor
                      </NavLink>
                      <ChevronRightIcon
                        className={cn(
                          'transition-all duration-300',
                          showInstancesDropdown && 'rotate-90'
                        )}
                      />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <NavLink
                        href={route('documents.index', { type: 'central' })}
                        active={route().current('documents.index', { type: 'central' })}
                        className="w-full"
                      >
                        PTSP Pusat
                      </NavLink>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <NavLink
                        href={route('documents.index', { type: 'east' })}
                        active={route().current('documents.index', { type: 'east' })}
                        className="w-full"
                      >
                        UPTSA Timur
                      </NavLink>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <NavLink href={route('reports.index')} active={route().current('reports.index')}>
                  Laporan
                </NavLink>
                <NavLink href={route('backups.index')} active={route().current('backups.index')}>
                  Backup
                </NavLink>
              </div>
            </div>

            <div className="hidden sm:flex sm:items-center sm:ms-6">
              <div className="relative notification-dropdown" ref={dropdownRefDesktop}>
                <BellIcon
                  className="w-6 h-6 cursor-pointer text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  onClick={toggleDropdownDesktop}
                />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
                    {unreadCount}
                  </span>
                )}
                {showDropdownDesktop && (
                  <div
                    className="absolute mt-2 w-64 border rounded-lg shadow-lg bg-white text-black dark:bg-gray-800 dark:text-white"
                    style={{ left: '50%', transform: 'translateX(-50%)' }}
                  >
                    <ul
                      className="text-sm font-medium leading-4"
                      style={{ maxHeight: '100px', overflowY: 'auto' }}
                    >
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <li
                            key={notification.id}
                            className="p-3 hover:bg-gray-200 dark:hover:bg-gray-700"
                          >
                            <p className="font-semibold text-gray-800 dark:text-gray-200">
                              {notification.message}
                            </p>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {notification.formatted_date_time}
                            </span>
                          </li>
                        ))
                      ) : (
                        <li className="p-3 text-center text-gray-500 dark:text-gray-400">
                          Tidak Ada Notifikasi
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </div>

              <div className="relative flex items-center ms-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out border border-transparent rounded-md dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none"
                    >
                      {user.name}
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <Link href={route('profile.edit')}>
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                    </Link>
                    <Link method="post" href={route('logout')}>
                      <DropdownMenuItem>Log Out</DropdownMenuItem>
                    </Link>
                  </DropdownMenuContent>
                </DropdownMenu>
                <ThemeButton />
              </div>
            </div>

            <div className="flex items-center -me-2 sm:hidden">
              <div className="relative notification-dropdown" ref={dropdownRefMobile}>
                <BellIcon
                  className="w-6 h-6 cursor-pointer text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  onClick={toggleDropdownMobile}
                />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
                    {unreadCount}
                  </span>
                )}
                {showDropdownMobile && (
                  <div
                    className="absolute mt-2 w-64 border rounded-lg shadow-lg bg-white text-black dark:bg-gray-800 dark:text-white"
                    style={{ right: '0' }}
                  >
                    <ul
                      className="text-sm font-medium leading-4"
                      style={{ maxHeight: '100px', overflowY: 'auto' }}
                    >
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <li
                            key={notification.id}
                            className="p-3 hover:bg-gray-200 dark:hover:bg-gray-700"
                          >
                            <p className="font-semibold text-gray-800 dark:text-gray-200">
                              {notification.message}
                            </p>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {notification.formatted_date_time}
                            </span>
                          </li>
                        ))
                      ) : (
                        <li className="p-3 text-center text-gray-500 dark:text-gray-400">
                          Tidak Ada Notifikasi
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
              <button
                onClick={() => setShowingNavigationDropdown((prevState) => !prevState)}
                className="inline-flex items-center justify-center p-2 text-gray-400 transition duration-150 ease-in-out rounded-md dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 focus:outline-none"
              >
                <svg className="w-6 h-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path
                    className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                  <path
                    className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
          <div className="pt-2 pb-3 space-y-1">
            <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
              Dashboard
            </ResponsiveNavLink>
            <ResponsiveNavLink href={route('instances.index')} active={route().current('instances.index')}>
              Dinas
            </ResponsiveNavLink>
            <ResponsiveNavLink
              href="#"
              active={route().current('documents.*')}
              onClick={(e) => {
                e.preventDefault(); // Prevent default behavior
                setShowInstancesDropdown((prev) => !prev); // Toggle dropdown
              }}
            >
              Kantor
            </ResponsiveNavLink>
            {showInstancesDropdown && (
              <div className="ml-4 space-y-1">
                <ResponsiveNavLink
                  href={route('documents.index', { type: 'central' })}
                  active={route().current('documents.index', { type: 'central' })}
                >
                  PTSP Pusat
                </ResponsiveNavLink>
                <ResponsiveNavLink
                  href={route('documents.index', { type: 'east' })}
                  active={route().current('documents.index', { type: 'east' })}
                >
                  UPTSA Timur
                </ResponsiveNavLink>
              </div>
            )}
            <ResponsiveNavLink href={route('reports.index')} active={route().current('reports.index')}>
              Laporan
            </ResponsiveNavLink>
            <ResponsiveNavLink href={route('backups.index')} active={route().current('backups.index')}>
              Backup
            </ResponsiveNavLink>
          </div>

          <div className="pt-4 pb-1 border-t border-gray-200 dark:border-gray-600">
            <div className="flex items-center justify-between px-4">
              <div>
                <div className="text-base font-medium text-gray-800 dark:text-gray-200">
                  {user.name}
                </div>
                <div className="text-sm font-medium text-gray-500">
                  {user.username}
                </div>
              </div>
              <ThemeButton className="ml-4" />
            </div>

            <div className="mt-3 space-y-1">
              <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
              <ResponsiveNavLink method="post" href={route('logout')} as="button">
                Log Out
              </ResponsiveNavLink>
            </div>
          </div>
        </div>
      </nav>

      {header && (
        <header>
          <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">{header}</div>
        </header>
      )}

      <main>{children}</main>
    </div>
  );
}
