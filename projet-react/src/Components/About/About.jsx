import React from 'react';

const FullWidthSection = () => {
  return (
    <div className="relative isolate overflow-hidden bg-gray-900 py-8 sm:py-16 mt-7">
      <img
        src="../../../public/pexels-victorfreitas-2261477.jpg"
        alt=""
        className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
      />
      {/* Superposition de couleur bleu foncé plus opaque */}
      <div className="absolute inset-0 bg-blue-950 opacity-70 -z-10"></div>

      <div
        className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
        aria-hidden="true"
      >
        <div
          className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-blue-900 to-gray-800 opacity-30"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        ></div>
      </div>
      <div
        className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
        aria-hidden="true"
      >
        <div
          className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-blue-900 to-gray-800 opacity-30"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        ></div>
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-5xl font-semibold tracking-tight text-white sm:text-7xl">Cherchez votre coach</h2>
          <p className="mt-8 text-lg font-medium text-white sm:text-xl/8">
            Élevez vos compétences sportives à un niveau supérieur grâce à notre sélection de cours spécialement conçus.
            Inspirés pour vous motiver, vous former et vous accompagner dans votre parcours sportif.
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base/7 font-semibold text-white sm:grid-cols-2 md:flex lg:gap-x-10">
            <a href="#">Postes ouverts<span aria-hidden="true">&rarr;</span></a>
            <a href="#">collaborations<span aria-hidden="true">&rarr;</span></a>
            <a href="#">Top 10 coaches<span aria-hidden="true">&rarr;</span></a>
            <a href="#">La team dev<span aria-hidden="true">&rarr;</span></a>
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col-reverse gap-1">
              <dt className="text-base/7 text-white">Coachs experts</dt>
              <dd className="text-4xl font-semibold tracking-tight text-white">300+</dd>
            </div>
            <div className="flex flex-col-reverse gap-1">
              <dt className="text-base/7 text-white">Cours</dt>
              <dd className="text-4xl font-semibold tracking-tight text-white">50+</dd>
            </div>
            <div className="flex flex-col-reverse gap-1">
              <dt className="text-base/7 text-white">Inscrits</dt>
              <dd className="text-4xl font-semibold tracking-tight text-white">1000+</dd>
            </div>
            <div className="flex flex-col-reverse gap-1">
              <dt className="text-base/7 text-white">Accès sur le site</dt>
              <dd className="text-4xl font-semibold tracking-tight text-white">Illimité</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default FullWidthSection;
