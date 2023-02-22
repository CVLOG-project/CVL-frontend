import React from 'react';
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

const Card = ({
  // image,
  title,
  user_id,
  created_at,
  description,
  tags,
}: CardProps) => {
  return (
    <div className="transition-all duration-300 rounded-lg bg-zinc-100">
      <article className="max-w-md mx-auto overflow-hidden shadow-md rounded-xl md:h-48 md:max-w-3xl shadow-gray-800">
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
                <div
                  className="flex justify-start px-2 m-0.5 text-s bg-gray-700 cursor-pointer md:text-base md:px-3 md:p-1 rounded-xl hover:opacity-70"
                  key={tagitem.id}
                >
                  {tagitem.name}
                </div>
              ))}
            </div>
            <span className="text-xs font-semibold tracking-wide uppercase text-cardFtBlack">
              {created_at && formatDate(created_at)}
            </span>
            <strong className="flex gap-2 text-xs font-semibold tracking-wide uppercase text-cardFtBlack">
              {user_id}
            </strong>
            <p className="mt-2 overflow-hidden h-7 md:h-7 text-cardFtBlack">
              {description}
            </p>
          </div>
          <div className="md:shrink-0">
            {/* <Image
              className="object-cover w-full h-48 rounded-xl md:h-full md:w-48 text-cardFtBlack "
              width={300}
              height={300}
              src={image}
              alt={title}
            /> */}
          </div>
        </div>
      </article>
    </div>
  );
};

export default Card;
