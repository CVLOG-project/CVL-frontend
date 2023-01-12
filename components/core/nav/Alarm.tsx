import React from 'react';
import { Dropdown } from 'flowbite-react';
import { useSession } from 'next-auth/react';

interface AlarmData {
  id: number;
  text: string;
  date: string;
}

const Alarm = () => {
  const { data: session } = useSession();

  return (
    <>
      {session ? (
        ALARM_DATA.map(alarm => (
          <Dropdown.Item key={alarm.id}>
            <div className="flex justify-between w-60">
              <div className="w-40 h-5 overflow-hidden">{alarm.text}</div>
              <div className="mt-2 text-xs text-gray-400">{alarm.date}</div>
            </div>
          </Dropdown.Item>
        ))
      ) : (
        <div className="p-2 hover:cursor-not-allowed">Login Please</div>
      )}
    </>
  );
};

export default Alarm;

//FIXME 백엔드 통신 시 삭제 될 목 데이터입니다.

const ALARM_DATA: AlarmData[] = [
  { id: 1, text: '알람1', date: '23/01/04' },
  {
    id: 2,
    text: '알람2알람2알람2알람2알람2알람2알람2알람2알람2알람2알람2',
    date: '23/01/05',
  },
  { id: 4, text: '알람3', date: '23/01/05' },
];
