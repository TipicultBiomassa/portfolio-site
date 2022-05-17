// @ts-nocheck
import React, {useEffect, useState} from 'react';
import cx from 'classnames';
import {Parallax, useParallax} from 'react-scroll-parallax';
import ProfilePate from "./static/IMG_20211029_225833.jpg"
import ReactIcon from "./static/React.png"
import SvelteIcon from "./static/svelte.png"
import NodeIcon from "./static/node.png"
import TsIcon from "./static/ts.png"
import './App.css';
import {useSpring,animated} from "react-spring";

export default function InnerComponent ({setNextSlide,setScrollProgress}){
    const [glowClass, deleteClass] = useState('glowingStyle')
    const springProps = useSpring({
        opacity: 0,
        config: {
            delay: 500,
            duration: 4500,
        },
        from: {
            opacity:1,
        } });
    useEffect(()=>{
        // setTimeout(()=>{
        //     deleteClass('')
        // },2300)
    },[])
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
            <animated.div className="flex justify-center pt-20">
                <>
                    <div className="spinner-profile absolute h-48 w-1/4 lg:mt-16 md:mt-16"><img alt="" className="border-2 border-blue-500 rounded-full" src={ProfilePate} /> </div>
                    <animated.div className={"absolute border-4 border-cyan-200 border-solid h-48 md:h-96 w-48 md:w-96 rounded-full flex items-center justify-center text-4xl drop-shadow-2xl shadow-yellow-300 " + glowClass} style={{...springProps}}>                    </animated.div>

                    <div
                        ref={parallax.ref}
                        className={"relative border-4 border-cyan-200 border-solid h-48 md:h-96 w-48 md:w-96 rounded-full flex items-center justify-center text-4xl drop-shadow-2xl shadow-yellow-300"}
                        style={{opacity:1}}
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
            </animated.div>
            </Parallax>
    );
};