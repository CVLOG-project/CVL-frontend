import React from 'react';
import Image from 'next/image';
import Text from '../Text/Text';
import { cn, colors } from 'styles/utils';

interface CardProps {
  image: string;
  title: string;
  author: string;
  description: string;
}

const Card = ({ image, title, author, description }: CardProps) => {
  return (
    <div
      className={cn(
        'rounded-lg',
        'transition-all',
        'duration-300',
        'hover:scale-95',
        colors('slate', 'bg', 900)
      )}
    >
      <article className="rounded-lg flex flex-col items-center">
        <Image
          className="w-full sm:max-h-52 object-cover rounded-t-lg"
          src={image}
          alt={title}
          width={800}
          height={600}
        />
        <div className="content flex flex-col justify-center items-center px-8 py-10">
          <Text variant="h2" className="mb-2">
            {title}
          </Text>
          <Text variant="labelMd">{author}</Text>
          <Text variant="labelSm">{description}</Text>
        </div>
      </article>
    </div>
  );
};

export default Card;
