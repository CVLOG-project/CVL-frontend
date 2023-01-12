import React from 'react';
import Image from 'next/image';

export interface CardProps {
  image: string;
  title: string;
  content: string;
  user_id?: string | number;
  created_at?: string;
  description?: string;
  tag?: ReadonlyArray<string>;
}

const formatDate = (date: string) =>
  Intl.DateTimeFormat('ko-KR', {
    year: '2-digit',
    month: 'narrow',
    day: 'numeric',
    localeMatcher: 'lookup',
  }).format(new Date(date));

const Card = ({
  image,
  title,
  user_id,
  created_at,
  description,
  tag,
}: CardProps) => {
  return (
    <div className="transition-all duration-300 bg-gray-800 rounded-lg">
      <article className="max-w-md mx-auto overflow-hidden shadow-md rounded-xl md:h-48 md:max-w-3xl shadow-gray-800">
        <div className="flex flex-col-reverse md:flex-row">
          <div className="p-4 w-[32rem] md:p-4">
            <a
              href="#"
              className="block mt-1 text-lg font-medium leading-tight hover:underline"
            >
              <h3>{title}</h3>
            </a>
            <div className="flex gap-2 pt-1">
              {tag?.map((tagitem, index) => (
                <div
                  className="flex justify-start px-2 m-0.5 text-s bg-gray-700 cursor-pointer md:text-base md:px-3 md:p-1 rounded-xl hover:opacity-70"
                  key={index}
                >
                  {tagitem}
                </div>
              ))}
            </div>
            <span className="text-xs font-semibold tracking-wide uppercase text-slate-400">
              {created_at && formatDate(created_at)}
            </span>
            <strong className="flex gap-2 text-xs font-semibold tracking-wide uppercase text-slate-400">
              {user_id}
            </strong>
            <p className="mt-2 overflow-hidden h-7 text-slate-400 md:h-7">
              {description}
            </p>
          </div>
          <div className="md:shrink-0">
            <Image
              className="object-cover w-full h-48 rounded-xl md:h-full md:w-48 "
              width={300}
              height={300}
              src={image}
              alt={title}
            />
          </div>
        </div>
      </article>
    </div>
  );
};

export default Card;
