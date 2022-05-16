import React, {useEffect, useState} from 'react';
import cx from 'classnames';
import {Parallax, useParallax} from 'react-scroll-parallax';
import ProfilePate from "./static/IMG_20211029_225833.jpg"
import ReactIcon from "./static/React.png"
import SvelteIcon from "./static/svelte.png"
import NodeIcon from "./static/node.png"
import TsIcon from "./static/ts.png"


export default function InnerComponent ({setNextSlide,setScrollProgress}){
    //const [isNextSlide, setNextSlide] = useState(false);
    //const [scrollProgress, setScrollProgress] = useState(0);
    const shared =
        'absolute bg-blue-100 border-2 border-blue-500 border-solid rounded-lg h-20 w-20 flex items-center justify-center';

    const parallax = useParallax<HTMLDivElement>({
        rotate: [0, 360],
        shouldAlwaysCompleteAnimation: true,
    });
    // setInterval(()=>console.log(isNextSlide),1500);
    return (
            <Parallax
                onEnter={() => setNextSlide(false)}
                onExit={() => setNextSlide(true)}
            >
            <div className="flex justify-center pt-20">
                <>
                    <div className="spinner-profile absolute h-48 md:h-96 w-48 md:w-96 w-1/4 md:mt-14 mt-16 md:w-1/5"><img alt="" className="border-2 border-blue-500 rounded-full" src={ProfilePate} /> </div>

                    <div
                        ref={parallax.ref}
                        className="relative border-4 border-red-200 border-solid h-48 md:h-96 w-48 md:w-96 rounded-full flex items-center justify-center text-4xl"
                    >
                        <div
                            className={cx(
                                shared,
                                'top-0 left-1/2 -translate-y-1/2 -translate-x-1/2'
                            )}
                        >
                            <div className="absolute"> <img src={ReactIcon} alt="" /></div>
                        </div>
                        <div
                            className={cx(
                                shared,
                                'right-0 top-1/2 -translate-y-1/2 translate-x-1/2'
                            )}
                        >
                            <div className="absolute m-1"> <img src={NodeIcon} alt="" /></div>
                        </div>
                        <div
                            className={cx(
                                shared,
                                'bottom-0 left-1/2 translate-y-1/2 -translate-x-1/2'
                            )}
                        >
                            <div className="absolute"> <img src={SvelteIcon} alt="" /></div>
                        </div>
                        <div
                            className={cx(
                                shared,
                                'top-1/2 left-0 -translate-y-1/2 -translate-x-1/2'
                            )}
                        >
                            <div className="absolute m-2"> <img src={TsIcon} alt="" /></div>
                        </div>
                    </div>
                </>
            </div>
            </Parallax>
    );
};