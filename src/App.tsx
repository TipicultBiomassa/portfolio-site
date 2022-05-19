// @ts-nocheck
import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState, Suspense, useRef} from 'react';

import {Parallax, ParallaxProvider} from 'react-scroll-parallax';
import InnerComponent from "./InnerComponent";
import { useTransition, animated,useSpring } from 'react-spring'
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Cloud, Sky } from "@react-three/drei"

import TextLeft from "./TextLeft";
import MainBody from "./bottom/MainBody";
import Greeting from "./static/025_waving_hand.webm";
import Sun from "./static/026_sun.webm";
import CloudIcon from "./static/013_sun_behind_cloud.webm";
import Moon from "./static/004_new_moon_face.webm";
function App() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [globalScroll, setGlobalScroll] = useState(0);
    const [isNextSlide, setNextSlide] = useState(false);

    const [additionalClouds, addCloud] = useState([]);

    const [isLight, setLightMode] = useState(false);
    const hiRef = useRef();
    const [buttonStyle, buttonChange] = useSpring((number,index) => ({ transform: 'translateY(1550px)'}));


    //setInterval(()=>console.log(scrollProgress),1500);
    // const initialDelay = useRef(true);
    useEffect(()=>{
        window.onbeforeunload = function () {
            window.scrollTo(0, 0);
        }
        window.scrollTo(0, 0);
        buttonChange.start((number,index) => ({to:{ transform: 'translateY(0px)' },config: {delay: 4500, duration: 5150 }}));
        setTimeout(()=>document.body.style.overflow = "hidden",20);
        setTimeout(()=> document.body.style.overflow = "auto",6500);
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

    const defaultBack = {background: "radial-gradient(circle at right, rgba(38,15,71,1) 31%, rgba(21,5,45,1) 50%, rgba(9,9,121,1) 72%, rgba(0,212,255,1) 100%)"};
    console.log(isNextSlide)
    // api.stop();

    //setTimeout(()=>setAnim(true),1500)

    function Rig() {
        const camera = useThree((state) => state.camera)
        return useFrame((state) => {
            camera.position.z = -scrollProgress * 130;
            // camera.position.y = -scrollProgress * 130;
        })
    }
    const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

    function addNewCloud() {
        addCloud([...additionalClouds, [random(-10,20),random(-10,20),random(-10,20)]]);
    }
    function returnLightMode () {


        return (
            <div className={'moonWrapper'}>
            <animated.div className={'testClassToFind'} style={buttonStyle}>
                <video muted autoPlay  loop className={'fixedCloud cursor-pointer'} onClick={addNewCloud} >
                    <source src={CloudIcon} type={'video/webm'} codecs="vp8"/>
                </video>

                <video muted autoPlay  loop className={'fixedMoon cursor-pointer'} onClick={()=>setLightMode(false)} style={{display: !isLight ? "none" : 'block'}}>
                    <source src={Sun} type={'video/webm'} codecs="vp8"/>
            </video>
            <video muted autoPlay  loop className={'fixedMoon cursor-pointer'} onClick={()=>setLightMode(true)} style={{display: isLight ? "none" : 'block'}}>
                <source src={Moon} type={'video/webm'} codecs="vp8"/>
            </video>
            </animated.div>
            </div>
        )
    }
  return (
        <>
            {returnLightMode()}

          <Parallax
              onProgressChange={(progress) => setScrollProgress(progress)}>
              <animated.div className="secondBody"
                            style={{...styles}}
              />

              <div className="anotherColor" style={{zIndex:-500}}/>




              <Parallax onProgressChange={(progress) => setGlobalScroll(progress)}>
                  <Canvas className={'absoluteCanvas'} camera={{ position: [0, 0, -5], fov: 35 }} style={{position:'absolute', height:'300vh'}}>
                      <ambientLight intensity={0.8} color="#00d4ff"/>
                      <pointLight intensity={13 * (globalScroll -0.6)} position={[0, 150, 5]} color="#A020F0"/>
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
                          {additionalClouds.map((el)=><Cloud position={el} speed={0.2} opacity={0.2} />)}
                      </Suspense>
                      {isLight ? <Sky azimuth={0.6} opacity={0.5} turbidity={50} elevation={1} rayleigh={0.5} inclination={0.6} distance={1000} sunPosition={[50, 50, 100]} /> : <></>}
                      <Rig />
                  </Canvas>
                  <div className="dummy">
                      <TextLeft isNextSlide={isNextSlide} />
                      <InnerComponent setNextSlide={setNextSlide} setScrollProgress={setScrollProgress}/>
                      {/*<div className={'h-40 w-64 flex self-center' } style={{marginTop: `${37 - globalScroll * 35}vh`}}>*/}
                        <div className={"flex self-center items-center justify-center"}  style={{marginTop: `${37 - globalScroll * 35}vh`}}>
                          <div className={'flex self-center items-center justify-center text-center bg-blue-100 rounded-lg p-5 font-sans text-3xl flex flex-col shadow-2xl shadow-cyan-500/50'}  style={globalScroll == 1 ? {opacity:0} : {opacity:1.7-globalScroll, zIndex: scrollProgress > 0.6 ? -5: 5}}>

                              Greetings, my name is Kirill and i'm a frontend developer.
                          </div>
                            <div  style={globalScroll == 1 ? {opacity:0} : {opacity:1.7-globalScroll, zIndex: scrollProgress > 0.6 ? -5: 5}}>
                            <video className={'z-10'} ref={hiRef} autoPlay muted style={{width:'10rem', height:'10rem'}} onMouseMove={()=>hiRef.current.play()}>
                                  <source src={Greeting} type={'video/webm'} codecs="vp8"/>
                              </video>
                            </div>
                        </div>
                      {/*</div>*/}
                  </div>

              </Parallax>


          </Parallax>
          {isNextSlide ? <MainBody /> : <></>}


        </>
     );
}

export default App;
