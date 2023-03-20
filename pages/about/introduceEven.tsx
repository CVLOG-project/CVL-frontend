import React from 'react';
import { Introduce } from '.';

const IntroduceEven = ({ Element }: { Element: Introduce }) => {
  return (
    <>
      {Element && (
        <section className="flex flex-col items-center justify-center w-full md:m-10 md:flex-row md:h-96">
          <article className="w-full px-5 md:w-2/3 md:h-96">
            <video
              src={Element.src}
              autoPlay
              loop
              muted
              playsInline
              className="object-cover w-full h-full rounded-xl"
            />
          </article>
          <article className="flex items-center justify-center h-full p-2 md:w-1/3 md:p-0">
            <div className="md:w-5/6 md:h-full md:mt-20">
              <h1 className="mb-1 text-lg text-center md:text-3xl text-ftBlue md:text-left">
                {Element.title}
                <br className="hidden md:block" /> {Element.titleBr}
              </h1>
              <p className="px-5 text-xs text-gray-700 md:px-0 md:text-base">
                {Element.message}
                <br />
                <span className="hidden md:block">{Element.messageBr}</span>
              </p>
            </div>
          </article>
        </section>
      )}
    </>
  );
};

export default IntroduceEven;
