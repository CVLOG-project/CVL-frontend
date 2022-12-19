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
      <article className="max-w-md mx-auto rounded-xl shadow-md overflow-hidden md:h-48 md:max-w-2xl">
        <div className="flex flex-col-reverse md:flex-row">
          <div className="py-8 md:p-8">
            <span className="uppercase tracking-wide text-sm text-slate-400 font-semibold">
              {formatDate(date)}
            </span>
            <a
              href="#"
              className="block mt-1 text-lg leading-tight font-medium hover:underline"
            >
              <h3>{title}</h3>
            </a>
            <strong className="flex gap-2 uppercase tracking-wide text-sm text-slate-400 font-semibold">
              {author}
            </strong>

            <p className="mt-2 text-slate-400">{description}</p>
          </div>
          <div className="md:shrink-0">
            <Image
              className="h-48 w-full rounded-xl object-cover md:h-full md:w-48 "
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
