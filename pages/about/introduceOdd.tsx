import React from 'react';
import { Introduce } from '.';

const IntroduceOdd = ({ Element }: { Element: Introduce }) => {
  return (
    <>
      {Element && (
        <section className="flex flex-col-reverse items-center justify-center w-full  md:my-28 md:flex-row md:h-96 ">
          <article className="flex items-center justify-center h-full p-2 md:w-1/3 md:p-0">
            <section className="md:w-5/6 md:h-full md:mt-20">
              <h1 className="mb-1 text-lg text-center md:text-3xl text-ftBlue md:text-left">
                {Element.title}
                <br className="hidden md:block" /> {Element.titleBr}
              </h1>
              <p className="px-5 text-xs text-gray-700 md:px-0 md:text-base ">
                {Element.message}
                <br />
                <span className="hidden md:block">{Element.messageBr}</span>
              </p>
            </section>
          </article>
          <article className="w-full px-5 md:w-2/3 md:h-96 flex justify-center">
            <video
              src={Element.src}
              autoPlay
              loop
              muted
              playsInline
              className="object-fill w-auto h-32 md:h-full md:w-full rounded-xl"
            />
          </article>
        </section>
      )}
    </>
  );
};

export default IntroduceOdd;
