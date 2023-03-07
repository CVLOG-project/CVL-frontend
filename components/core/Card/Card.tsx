import React, { useEffect, useState } from 'react';
import { Badge } from 'flowbite-react';
import markdownToText from 'markdown-to-text';
import Image from 'next/image';
// import Image from 'next/image';

export interface Tagitem {
  id: number;
  name: string;
}
export interface CardProps {
  image?: string;
  title: string;
  content: string;
  user_id?: string | number;
  updated_at?: string;
  description?: string;
  tags: Tagitem[];
}
type TimeAgoProps = {
  date: string;
};

// const formatDate = (date: string) =>
//   Intl.DateTimeFormat('ko-KR', {
//     year: '2-digit',
//     month: 'narrow',
//     day: 'numeric',
//     localeMatcher: 'lookup',
//   }).format(new Date(date));

const Card = ({ title, user_id, updated_at, content, tags }: CardProps) => {
  const [timeString, setTimeString] = useState('');
  const makeImageUrl = (content: string) => {
    const regex = /!\[.*?\]\((.*?)\)/;
    const match = regex.exec(content);
    if (match && match.length > 1) {
      const imageUrl = match[1];
      return imageUrl;
    }
    return;
  };
  const imageUrl = makeImageUrl(content) ?? '/images/kakao.png';
  const result = content.replace(/!\[.*\]\(.+\)\n/g, '');

  const getTimeAgoString = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    const minute = 60;
    const hour = minute * 60;
    const day = hour * 24;
    const week = day * 7;
    const month = day * 30;
    const year = day * 365;

    if (seconds < minute) {
      return `${seconds}초 전`;
    } else if (seconds < hour) {
      return `${Math.floor(seconds / minute)}분 전`;
    } else if (seconds < day) {
      return `${Math.floor(seconds / hour)}시간 전`;
    } else if (seconds < week) {
      return `${Math.floor(seconds / day)}일 전`;
    } else if (seconds < month) {
      return `${Math.floor(seconds / week)}주 전`;
    } else if (seconds < year) {
      return `${Math.floor(seconds / month)}달 전`;
    } else {
      return `${Math.floor(seconds / year)}년 전`;
    }
  };

  const stringToDate = (date: string) => {
    const result = new Date(date).getTime();
    return result;
  };

  return (
    <div className="w-80 sm:w-96 md:w-full transition-all duration-300 rounded-lg bg-[#f6f6f6]">
      <article className="max-w-md mx-auto overflow-hidden shadow-md rounded-xl md:h-full md:max-w-3xl shadow-gray-400">
        <div className="flex flex-col-reverse md:flex-row">
          <div className="p-4 w-[20rem] md:w-[32rem] md:p-4">
            <a
              href="#"
              className="block my-1 overflow-hidden text-lg font-medium leading-tight hover:underline text-cardFtBlack max-h-20 "
            >
              <h3>{title}</h3>
            </a>
            <div className="flex flex-wrap w-full gap-2 py-1 md:py-3 ">
              {tags?.map(tagitem => (
                <Badge
                  className="relative p-4 mr-2 shadow-sm shadow-gray-400"
                  color="info"
                  size="sm"
                  key={tagitem.id}
                >
                  {tagitem.name}
                </Badge>
              ))}
            </div>

            <strong className="flex gap-2 text-xs font-semibold tracking-wide uppercase text-cardFtBlack">
              {user_id}
            </strong>
            <p className="w-full mt-2 truncate h-7 md:h-7 text-cardFtBlack">
              {markdownToText(result)}
            </p>
            <div className="w-full text-right">
              <span className="text-xs font-semibold tracking-wide text-gray-500 uppercase ">
                {updated_at && getTimeAgoString(stringToDate(updated_at))}
              </span>
            </div>
          </div>
          <div className="md:shrink-0 w-full md:w-[250px] h-[192px] relative">
            <Image
              className="absolute top-0 left-0 object-cover w-full h-full rounded-xl md:h-full md:w-full text-cardFtBlack "
              width={2000}
              height={2000}
              src={imageUrl}
              alt={title}
            />
          </div>
        </div>
      </article>
    </div>
  );
};

export default Card;
