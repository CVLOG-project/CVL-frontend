import React from 'react';
import Image from 'next/image';
import Text from '../Text/Text';

interface CardProps {
  image: string;
  title: string;
  author: string;
  description: string;
}

const Card = ({ image, title, author, description }: CardProps) => {
  return (
    <div className="wrapper">
      <article>
        <Image src={image} alt={title} width={800} height={600} />
        <div className="content">
          <Text variant="h2">{title}</Text>
          <Text variant="labelMd">{author}</Text>
          <Text variant="labelSm">{description}</Text>
        </div>
      </article>
    </div>
  );
};

export default Card;
