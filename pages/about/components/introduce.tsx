import React from 'react';
import { IntroduceInterface } from '..';

const Introduce = ({ Element }: { Element: IntroduceInterface }) => {
  return (
    <>
      {Element && (
        <section
          className={`flex ${
            Element.id % 2 === 1 ? 'md:flex-row' : 'md:flex-row-reverse'
          } items-center justify-center w-full md:my-28  md:h-96 flex-col`}
        >
          <article className="flex justify-center w-full px-5 md:w-2/3 md:h-96">
            <video
              src={Element.src}
              autoPlay
              loop
              muted
              playsInline
              className="object-fill w-auto h-32 shadow-xl md:h-full md:w-full rounded-xl"
            />
          </article>
          <article className="flex items-center justify-center h-full p-2 md:w-2/5 md:p-0">
            <div className="flex flex-col justify-between md:w-5/6 md:h-full md:py-3">
              <div className="flex md:pt-5">
                <div className="items-center justify-center hidden w-12 h-12 text-3xl text-white rounded-full md:flex bg-ftBlue">
                  {Element.id + 1}
                </div>
                <h1 className="w-11/12 pl-3 text-lg text-center md:text-3xl text-ftBlue md:text-left">
                  {Element.title}
                </h1>
              </div>
              <p className="px-5 text-xs text-gray-700 md:px-0 md:text-lg">
                {Element.message}
                <br />
                <span className="hidden md:block md:text-xs md:my-3 md:mt-8">
                  {Element.messageBr}
                </span>
              </p>
            </div>
          </article>
        </section>
      )}
    </>
  );
};

export default Introduce;
