import { Avatar, Dropdown } from 'flowbite-react';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useState } from 'react';

const Phone = () => {
  const [token, setToken] = useState(false);
  const { data: session } = useSession();
  console.log(session);

  return (
    <Dropdown
      arrowIcon={false}
      inline={true}
      label={<Avatar alt="User settings" img={'/images/more.png'} size="xs" />}
    >
      {session && session.user && (
        <Dropdown.Header>
          <div className="flex">
            <Avatar
              alt="User settings"
              img={`${session.user.image}`}
              size="sm"
              rounded={true}
            />
            <div className="flex items-end ml-2 text-xs">
              {session.user.name}
            </div>
          </div>
        </Dropdown.Header>
      )}
      <div className="w-32 ">
        {session ? (
          <Dropdown.Item
            onClick={() => signOut()}
            className="flex justify-center"
          >
            Sign Out
          </Dropdown.Item>
        ) : (
          <Dropdown.Item
            onClick={() => signIn()}
            className="flex justify-center"
          >
            Sign In
          </Dropdown.Item>
        )}
        <Dropdown.Item className="flex justify-center">Alarm</Dropdown.Item>
        <Dropdown.Item className="flex justify-center">Setting</Dropdown.Item>
      </div>
    </Dropdown>
  );
};

export default Phone;
