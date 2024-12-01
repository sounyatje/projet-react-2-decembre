import React from 'react';
import { CalendarDaysIcon, HandRaisedIcon } from '@heroicons/react/24/outline';

const Example = () => {
  return (
    <div className="relative isolate overflow-hidden bg-orange/80 bg-gradient-to-r from-orange to-blueLight hover:from-blueLight hover:to-orange transition-all duration-500 shadow-md py-16 sm:py-24 lg:py-32 mt-5">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
          <div className="max-w-xl lg:max-w-lg">
            <h2 className="text-4xl font-semibold tracking-tight text-lightGray">Abonnez-vous à notre newsletter</h2>
            <p className="mt-4 text-lg text-gray">
              Restez informé avec nos derniers articles, offres et conseils de nos experts.
            </p>
            <div className="mt-6 flex max-w-md gap-x-4">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                placeholder="Entrez votre email"
                autoComplete="email"
                className="min-w-0 flex-auto rounded-md border-0 bg-gray-200/10 px-3.5 py-2 text-lightGray shadow-sm ring-1 ring-inset ring-gray focus:ring-2 focus:ring-inset focus:ring-blueLight sm:text-sm"
              />
              <button
                type="submit"
                className="flex-none rounded-md bg-blueLight px-3.5 py-2.5 text-sm font-semibold text-lightGray shadow-sm hover:bg-blueDark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blueLight"
              >
                Abonnez-vous
              </button>
            </div>
          </div>
          <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
            <div className="flex flex-col items-start">
              <div className="rounded-md bg-gray-300/10 p-2 ring-1 ring-gray-300">
                <CalendarDaysIcon aria-hidden="true" className="h-6 w-6 text-lightGray" />
              </div>
              <dt className="mt-4 text-base font-semibold text-lightGray">Articles hebdomadaires</dt>
              <dd className="mt-2 text-gray">
                Profitez de nos conseils et astuces exclusifs chaque semaine.
              </dd>
            </div>
            <div className="flex flex-col items-start">
              <div className="rounded-md bg-gray-300/10 p-2 ring-1 ring-gray-300">
                <HandRaisedIcon aria-hidden="true" className="h-6 w-6 text-lightGray" />
              </div>
              <dt className="mt-4 text-base font-semibold text-lightGray">Pas de spam</dt>
              <dd className="mt-2 text-gray">
                Recevez uniquement des informations pertinentes et utiles.
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div aria-hidden="true" className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6">
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-blueLight to-blueDark opacity-30"
        />
      </div>
    </div>
  );
};

export default Example;

