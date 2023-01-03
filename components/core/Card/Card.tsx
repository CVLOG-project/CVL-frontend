import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Text from '../Text/Text';
import { cn } from 'styles/utils';

interface CardProps {
  image: string;
  title: string;
  author: string;
  date: Date;
  description?: string;
}

const formatDate = (date: Date) =>
  Intl.DateTimeFormat('ko-KR', {
    year: '2-digit',
    month: 'narrow',
    day: 'numeric',
    localeMatcher: 'lookup',
  }).format(date);

const Card = ({ image, title, author, date, description }: CardProps) => {
  return (
    <div className={cn('rounded-lg', 'transition-all', 'duration-300')}>
      <article className="max-w-md mx-auto overflow-hidden shadow-md rounded-xl md:h-48 md:max-w-3xl shadow-gray-800">
        <div className="flex flex-col-reverse md:flex-row">
          <div className="w-full py-8 md:p-4">
            <span className="text-sm font-semibold tracking-wide uppercase text-slate-400">
              {formatDate(date)}
            </span>
            <a
              href="#"
              className="block mt-1 text-lg font-medium leading-tight hover:underline"
            >
              <h3>{title}</h3>
            </a>
            <strong className="flex gap-2 text-sm font-semibold tracking-wide uppercase text-slate-400">
              {author}
            </strong>

            <p className="mt-2 text-slate-400">{description}</p>
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
