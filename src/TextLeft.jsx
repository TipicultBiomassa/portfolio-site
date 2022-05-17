import React, {useEffect, useRef, useState} from 'react';
import cx from 'classnames';
import { useParallax } from 'react-scroll-parallax';
import { useSpring, animated } from "react-spring";
import Glasses from "./static/smiling-face-with-sunglasses.png"
import Smirk from "./static/smirking-face.png"
import SvelteIcon from "./static/svelte.png";
import Victory from "./static/007_victory_hand.webm";
import SmirkVideo from "./static/003_smirking_face.webm";
import GlassesVideo from "./static/030_smiling_face_with_sunglasses.webm";
import VictoryImg from "./static/Victory.png";
export default function TextLeft ({isNextSlide}) {

    // const [isLoaded, setLoaded] = useState(false);
    // useEffect(() => {
    //     setTimeout(()=>setLoaded(true), 5000);
    // }, [])
    const refVideo = useRef();
    const refSmirk = useRef();
    const refGlasses = useRef();

    const [victoryPlaying, stopVictoryPlaying] = useState(true);
    const [smirkPlaying, stopSmirkPlaying] = useState(true);
    const [glassesPlaying, stopGlassesPlaying] = useState(true);
    const [styles, api] = useSpring((number,index) => ({
            opacity: 0,
            transform: 'translateX(-250px)'
        }));

    api.stop();
    api.start((number,index) => ({
        opacity: 1,
        transform: 'translateX(0px)'
    }))
    const springProps = useSpring({
        opacity: 1,
        delay: 6200,
        transform: 'translateX(0px)',
        from: {
            opacity: 0,
            transform: 'translateX(-250px)'
        } });

    const springProps2 = useSpring({
        opacity: 1,
        delay: 3200,
        transform: 'translateX(0px)',
        from: {
            opacity: 0,
            transform: 'translateX(-250px)'
        } });
    // const springProps2 = useSpring({
    //     opacity: 1,
    //     delay: 2200,
    //     transform: 'translateX(0px)',
    //     from: {
    //         opacity: 0,
    //         transform: 'translateX(-250px)'
    //     } });
    useEffect(()=>{
        refVideo.current.play();
        refSmirk.current.play();
        refGlasses.current.play();
        setTimeout(()=>{
            // console.log();
            refVideo.current.pause();
        },3310)
        setTimeout(()=>{
            // console.log();
            refSmirk.current.pause();
        },7210)
        setTimeout(()=>{
            // console.log();
            refGlasses.current.pause();
            stopGlassesPlaying(false);
        },11150)
    },[])

    // if (isNextSlide){
    //     springProps2 = useSpring({
    //         opacity: 1,
    //         delay: 2200,
    //         transform: 'translateX(-250px)',
    //         from: {
    //             opacity: 0,
    //             transform: 'translateX(0px)'
    //         } });
    // }

      return(
          <>
              <div className={"flex flex-col gap-y-10 w-full "} style={{position:'absolute',paddingTop: "500px"}}>
          <animated.div style={{...springProps}} className={"text-block w-96 flex"} >
            Was working with JavaScript and TypeScript, wide experience in commercial frontend development
              {/*<img src={Glasses} alt="" style={{width:'3rem',height:'3rem'}}/>*/}

              <video ref={refGlasses} autoPlay muted loop style={{width:'5rem',height:'5rem'}}>
                  <source src={GlassesVideo} type={'video/webm'} codecs="vp8"/>
              </video>
          </animated.div>
            <animated.div style={{...springProps2}} className={"text-block2 w-96 flex items-center"} >
                Built a metaverse platform. Simmilar to Zoom but with game features using Phaser3 and React. Made most of frontend side. Choosed architecture and built app from the ground up.
                <video ref={refSmirk} autoPlay muted loop style={{width:'5rem',height:'5rem'}}>
                    <source src={SmirkVideo} type={'video/webm'} codecs="vp8"/>
                </video>
            </animated.div>
          <animated.div style={{...styles}} className={"text-block2 w-96 flex items-center"} >
              Have experience in backend development using NodeJS and also Django.
              {<video ref={refVideo} autoPlay muted loop style={{width:'5rem',height:'5rem'}}>
                  <source src={Victory} type={'video/webm'} codecs="vp8"/>
              </video>}
          </animated.div>
            </div>
          </>
          );
}