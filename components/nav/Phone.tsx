import React, { useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Avatar, Dropdown } from 'flowbite-react';

const Phone = () => {
  //FIXME 로컬 토큰
  // const [localToken, setLocalToken] = useState(false);
  const { data: result } = useSession();

  return (
    <Dropdown
      arrowIcon={false}
      inline={true}
      label={<Avatar alt="User settings" img="/images/more.png" size="xs" />}
    >
      {result?.user && (
        <Dropdown.Header>
          <div className="flex">
            <Avatar
              alt="User settings"
              img={`${result.user.image}`}
              size="sm"
              rounded={true}
            />
            <div className="flex items-end ml-2 text-xs">
              {result.user.name}
            </div>
          </div>
        </Dropdown.Header>
      )}
      <div className="w-32 ">
        {result ? (
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
