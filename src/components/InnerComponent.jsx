import React, {useEffect, useState} from 'react';
import cx from 'classnames';
import {Parallax, useParallax} from 'react-scroll-parallax';
import '../App.css';

import ProfilePate from "../static/IMG_20211029_225833.jpg"


export default function InnerComponent ({setScrollProgress}){
    const shared =
        'absolute bg-blue-100 border-2 border-blue-500 border-solid rounded-lg h-14 w-14 flex items-center justify-center';
    const [isNextSlide, setNextSlide] = useState(false);
    //const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(()=>{
        window.dispatchEvent(new CustomEvent('scroll'));
    })
    const parallax = useParallax<HTMLDivElement>({
        rotate: [0, 360],
        shouldAlwaysCompleteAnimation: true,
    });

    const conditinalRendering = () => {
        return (
                <>
                <div className="spinner-profile"><img alt="" className="border-2 border-blue-500 rounded-full" src={ProfilePate} /> </div>

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
                        💎
                    </div>
                    <div
                        className={cx(
                            shared,
                            'right-0 top-1/2 -translate-y-1/2 translate-x-1/2'
                        )}
                    >
                        🤡
                    </div>
                    <div
                        className={cx(
                            shared,
                            'bottom-0 left-1/2 translate-y-1/2 -translate-x-1/2'
                        )}
                    >
                        💰
                    </div>
                    <div
                        className={cx(
                            shared,
                            'top-1/2 left-0 -translate-y-1/2 -translate-x-1/2'
                        )}
                    >
                        👌🏻
                    </div>
                </div>
                </>
        )
    }
    return (
        <>
            <Parallax
                onProgressChange={(progress) => setScrollProgress(progress)}
                onEnter={() => setNextSlide(false)}
                onExit={() => setNextSlide(true)}
            >
            <div className="flex justify-center mt-20">
                <>
                    <div className="spinner-profile"><img alt="" className="border-2 border-blue-500 rounded-full" src={ProfilePate} /> </div>

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
                            💎
                        </div>
                        <div
                            className={cx(
                                shared,
                                'right-0 top-1/2 -translate-y-1/2 translate-x-1/2'
                            )}
                        >
                            🤡
                        </div>
                        <div
                            className={cx(
                                shared,
                                'bottom-0 left-1/2 translate-y-1/2 -translate-x-1/2'
                            )}
                        >
                            💰
                        </div>
                        <div
                            className={cx(
                                shared,
                                'top-1/2 left-0 -translate-y-1/2 -translate-x-1/2'
                            )}
                        >
                            👌🏻
                        </div>
                    </div>
                </>
            </div>
            </Parallax>
        </>
    );
};