
import React from 'react'
import { IoIosArrowForward } from "react-icons/io";
import { BlurFade } from "../components/magicui/blur-fade";

import { Button } from "@/components/ui/button"

import {AuroraText} from  '../components/magicui/aurora-text'



const LandingPage = () => {
    

  return (
    <>
    

      <BlurFade delay={0.50} inView>


        <section className="relative flex flex-col items-center justify-center py-12 lg:py-20">
          <div className="text-center">
            <span className=" border-gray-400 border rounded-full text-sm text-primary font-medium tracking-tight bg-primary/10 px-4 py-2">
              Introducing ManagingProduct 1.0
            </span>
            <h1 className="mt-8 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-3 tracking-tighter">
              Managing Products{" "}

              <span className="block -mt-1">
                <h1 className="text-5xl font-extrabold tracking-tighter md:text-6xl lg:text-8xl">
                <AuroraText speed={2}>super</AuroraText> <AuroraText speed={2}>easy!</AuroraText>
                </h1>
              </span>
            </h1>

            <p className="max-w-xl mx-auto mt-4 lg:text-lg text-muted-foreground">
            Your one-stop destination for unlocking ease of managing product. With cutting-edge analytics, expert maps, and real-time data.
            </p>

            <div className="mt-7 mb-12">
              <a href="/signupForm">
                <Button className="bg-black text-white font-bold cursor-pointer rounded-none h-10 w-50 border-b shadow-2xl ">Get Unlimted Access<IoIosArrowForward /></Button>
              </a>
            </div>
          </div>

          <div className="relative items-center w-full py-7 mx-auto mt-12">
            <svg
              className="absolute inset-0 -mt-24 blur-3xl"
              style={{ zIndex: -1 }}
              fill="none"
              viewBox="0 0 400 400"
              height="100%"
              width="100%"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_10_20)">
                <g filter="url(#filter0_f_10_20)">
                  <path
                    d="M128.6 0H0V322.2L106.2 134.75L128.6 0Z"
                    fill="#03FFE0"
                  ></path>
                  <path
                    d="M0 322.2V400H240H320L106.2 134.75L0 322.2Z"
                    fill="#7C87F8"
                  ></path>
                  <path
                    d="M320 400H400V78.75L106.2 134.75L320 400Z"
                    fill="#4C65E4"
                  ></path>
                  <path
                    d="M400 0H128.6L106.2 134.75L400 78.75V0Z"
                    fill="#043AFF"
                    ></path>
                </g>
              </g>
              <defs>
                <filter
                  colorInterpolationFilters="sRGB"
                  filterUnits="userSpaceOnUse"
                  height="720.666"
                  id="filter0_f_10_20"
                  width="720.666"
                  x="-160.333"
                  y="-160.333"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                  <feBlend
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    mode="normal"
                    result="shape"
                  ></feBlend>
                  <feGaussianBlur
                    result="effect1_foregroundBlur_10_20"
                    stdDeviation="80.1666"
                  ></feGaussianBlur>
                </filter>
              </defs>
            </svg>
             <img
              src='/logo.png'
              alt="Hero image"
              className="relative w-[1200px] h-[1300px] mx-auto  rounded-lg lg:rounded-2xl shadow-2xl"
            />
            
          </div>
        </section>
      </BlurFade>

                   
    </>
  )
}

export default LandingPage