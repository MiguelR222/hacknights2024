'use client'

import { FC, useState } from 'react'
import Image from 'next/image'

const HeroSection: FC = () => {
  return (
    <div className="relative flex-grow flex flex-col items-center justify-center min-h-screen">
      {/* Imagen de fondo */}
      <Image
        src="/heroSectionBackground.jpg"
        alt="Background"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="absolute inset-0 z-0"
      />
      <div className="relative z-10 px-6 pt-14 pb-20 lg:px-8">
        <div className="mx-auto max-w-5xl py-24 sm:py-32 lg:py-40">
          <div className="hidden lg:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full font-bold px-8 py-3 text-sm/8 text-[#1f2536] ring-1 ring-gray-900 bg-orange-200">
              Una iniciativa local para soluciones globales.
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-center text-4xl font-semibold tracking-tight text-[#1f2536] sm:text-6xl bg-white/80 p-9 m-4 rounded-lg">
              Deja que tus herramientas trabajen por ti:<br /> Gana dinero y cuida el planeta.
            </h1>
            <p className="mt-6 text-pretty text-lg font-semibold text-[#1f2536] lg:text-xl/8 w-full max-w-3xl mx-auto bg-white/80 p-4 rounded-lg">
              Comparte las herramientas que ya no usas con tu comunidad, obtén ingresos adicionales y contribuye a un futuro más sostenible. ¡Es fácil, seguro y ecológico!
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-emerald-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#549b5e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Consulta el catálogo
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
