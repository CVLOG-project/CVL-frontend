import React from 'react';
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
  created_at?: string;
  description?: string;
  tags: Tagitem[];
}

const formatDate = (date: string) =>
  Intl.DateTimeFormat('ko-KR', {
    year: '2-digit',
    month: 'narrow',
    day: 'numeric',
    localeMatcher: 'lookup',
  }).format(new Date(date));

const Card = ({ title, user_id, created_at, content, tags }: CardProps) => {
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

  return (
    <div className="transition-all duration-300 rounded-lg bg-[#f6f6f6]">
      <article className="max-w-md mx-auto overflow-hidden shadow-md rounded-xl md:h-48 md:max-w-3xl shadow-gray-400">
        <div className="flex flex-col-reverse md:flex-row">
          <div className="p-4 w-[32rem] md:p-4">
            <a
              href="#"
              className="block mt-1 text-lg font-medium leading-tight hover:underline text-cardFtBlack"
            >
              <h3>{title}</h3>
            </a>
            <div className="flex gap-2 pt-1">
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
            <span className="text-xs font-semibold tracking-wide uppercase text-cardFtBlack">
              {created_at && formatDate(created_at)}
            </span>
            <strong className="flex gap-2 text-xs font-semibold tracking-wide uppercase text-cardFtBlack">
              {user_id}
            </strong>
            <p className="mt-2 overflow-hidden h-7 md:h-7 text-cardFtBlack">
              {markdownToText(result)}
            </p>
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
