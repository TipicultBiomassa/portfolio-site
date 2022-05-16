import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState,Suspense} from 'react';

import {Parallax, ParallaxProvider} from 'react-scroll-parallax';
import InnerComponent from "./InnerComponent";
import { useTransition, animated,useSpring } from 'react-spring'
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Cloud, Sky } from "@react-three/drei"

import TextLeft from "./TextLeft";
import Mount from "./Background";
import MainBody from "./bottom/MainBody";
import Greeting from "./static/025_waving_hand.webm";
import github from "./static/github.png";
import HitMeUp from "./static/023_raised_hand.webm";
function App() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [globalScroll, setGlobalScroll] = useState(0);
    const [isNextSlide, setNextSlide] = useState(false);



    //setInterval(()=>console.log(scrollProgress),1500);
    // const initialDelay = useRef(true);
    useEffect(()=>{
        window.onbeforeunload = function () {
            window.scrollTo(0, 0);
        }
    },[])
    // const [isAnimationOver, setAnim] = useState(false);
    const [styles, api] = useSpring((number,index) => ({ opacity: 1}));
    api.stop();
    if (isNextSlide ) {
        api.start((number,index) => ({to:{ opacity: 0 },config: { duration: 350 }}));
    }
    if (!isNextSlide) {
        api.start((number,index) => ({to:{ opacity: 1  },config: { duration: 350 }}));
    }
    //
    const defaultBack = {background: "radial-gradient(circle at right, rgba(38,15,71,1) 31%, rgba(21,5,45,1) 50%, rgba(9,9,121,1) 72%, rgba(0,212,255,1) 100%)"};
    console.log(isNextSlide)
    // api.stop();

    console.log(scrollProgress);
    //setTimeout(()=>setAnim(true),1500)

    function Rig() {
        const camera = useThree((state) => state.camera)
        return useFrame((state) => {
            camera.position.z = -scrollProgress * 130;
            // camera.position.y = -scrollProgress * 130;
        })
    }
  return (
        <>
          {/*{!isNextSlide ? <></> : <Mount isNextSlide={isNextSlide} />}*/}
          <Parallax
              onProgressChange={(progress) => setScrollProgress(progress)}>


              <div className="anotherColor" />


              <animated.div className="secondBody"
                  // style={{background: `radial-gradient(circle at right, rgba(38,15,71,${opacity}) 31%, rgba(21,5,45,${opacity}) 50%, rgba(9,9,121,${opacity}) 72%, rgba(0,212,255,${opacity}) 100%);`}}
                  // style={{opacity: scrollProgress > 0.99 ? 0 : 1}}
                            style={styles}
              />
              <Parallax onProgressChange={(progress) => setGlobalScroll(progress)}>
                  <Canvas className={'absoluteCanvas'} camera={{ position: [0, 0, -5], fov: 35 }} style={{position:'absolute', height:'250vh'}}>
                      <ambientLight intensity={0.8} color="#00d4ff"/>
                      <pointLight intensity={20 * (globalScroll -0.6)} position={[0, 150, 5]} color="#A020F0"/>
                      <Suspense fallback={null}>
                          <Cloud position={[-8 * scrollProgress*10, 15, 10]} speed={0.81} opacity={0.5 } />
                          <Cloud position={[-3* scrollProgress*10, 12, 30]} speed={1} opacity={ 0.6} />
                          <Cloud position={[-4* scrollProgress*10, 35, 50]} speed={0.31} opacity={0.3} />
                          <Cloud position={[4* scrollProgress*10, 15, 40]} speed={0.5} opacity={0.2 } segments={3} />
                          <Cloud position={[-3* scrollProgress*10, 12, 40]} speed={0.1} opacity={0.5} />
                          <Cloud position={[1* scrollProgress*10 + scrollProgress, 12, 40]} speed={1} opacity={0.5} />
                          <Cloud position={[1* scrollProgress*10 + scrollProgress, 3, 5]} speed={1} opacity={0.5} segments={15}/>
                          <Cloud position={[4* scrollProgress*10, 12, 50]} speed={0.6} opacity={0.3} />
                          <Cloud position={[5* scrollProgress*10, 12, 60]} speed={0.2} opacity={0.2} />
                          <Cloud position={[5, 35 + scrollProgress*2, 20]} speed={0.2} opacity={0.2} />
                      </Suspense>
                      {/*<Sky azimuth={0.4} opacity={0} turbidity={10} elevation={1} rayleigh={0.5} inclination={0.6} distance={1000} />*/}
                      <Rig />
                  </Canvas>
                  <div className="dummy">
                      <TextLeft isNextSlide={isNextSlide} />
                      <InnerComponent setNextSlide={setNextSlide} setScrollProgress={setScrollProgress}/>
                  </div>
                  <div className={'itsmid h-40'} style={{marginTop: `${37 - globalScroll * 35}vh`}}>
                      <div className={'relative items-center justify-center text-center bg-blue-100 rounded-lg p-5 font-sans text-3xl flex flex-col shadow-2xl shadow-cyan-500/50'} style={globalScroll == 1 ? {opacity:0} : {opacity:1.7-globalScroll}}>

                          Greetings, my name is Kirill and i'm a frontend developer.
                          <video autoPlay muted style={{width:'10rem', height:'10rem'}}>
                              <source src={Greeting} type={'video/webm'} codecs="vp8"/>
                          </video>
                      </div>
                  </div>
              </Parallax>


          </Parallax>
          {isNextSlide ? <MainBody /> : <></>}
          <div className={'itsmid h-40'} style={{marginTop: `160vh`}}>
              <div className={'relative items-center justify-center text-center bg-blue-100 rounded-lg p-5 font-sans text-3xl flex flex-col'} >

                  Hit me up
                  <video autoPlay loop muted style={{width:'10rem', height:'10rem'}}>
                      <source src={HitMeUp} type={'video/webm'} codecs="vp8"/>
                  </video>
                  <a href={'https://github.com/TipicultBiomassa'}><img alt='' src={github} style={{width:'5rem'}} /></a>
              </div>
          </div>
        </>
     );
}

export default App;
