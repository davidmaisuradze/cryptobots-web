import React, { FC, useEffect } from 'react';
import Image from 'next/image';
import { Navbar, Dropdown, Avatar } from 'flowbite-react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../state/selectors';
import { cookieAuthService } from '../../../services';
import { useDispatch } from 'react-redux';
import { UserActions } from '../../../state/actions';

export const Header: FC = () => {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const token = cookieAuthService.getAccessToken();

  useEffect(() => {
    console.log(user, '----- user');
  }, [user]);

  const logout = () => {
    dispatch({ type: UserActions.USER_LOGOUT_REQUEST });
  };

  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="/">
        <Image
          alt="3DCryptoBots"
          height="32"
          src="/assets/images/page_logo.png"
          width="32"
        />
        <span className="self-center whitespace-nowrap pl-3 text-xl font-semibold dark:text-white">
          3D Crypto Bots
        </span>
      </Navbar.Brand>
      <Navbar.Collapse>
        <Navbar.Link href="/navbars" active>
          Home
        </Navbar.Link>
        <Navbar.Link href="/navbars">About</Navbar.Link>
        <Navbar.Link href="/navbars">Services</Navbar.Link>
        <Navbar.Link href="/navbars">Pricing</Navbar.Link>
        <Navbar.Link href="/navbars">Contact</Navbar.Link>
      </Navbar.Collapse>

      {user.email && token ? 
        (<div className="flex md:order-2">
          <Dropdown
            inline
            label={
              <Avatar
                alt="User settings"
                img="/assets/images/default_avatar.png"
                rounded
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">{user.firstName} {user.lastName}</span>
              <span className="block truncate text-sm font-medium">
                {user.email}
              </span>
            </Dropdown.Header>
            <Dropdown.Item>Dashboard</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Item>Earnings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={logout}>Sign out</Dropdown.Item>
          </Dropdown>
          <Navbar.Toggle />
        </div>) 
        : (
          <Navbar.Collapse>
            <Navbar.Link href="/auth/login">Login</Navbar.Link>
            <Navbar.Link href="/auth/register">Register</Navbar.Link>
          </Navbar.Collapse>
        )
      }
    </Navbar>
  );
};

export default Header;
