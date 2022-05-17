import * as THREE from 'three'
import React, { useRef, useState, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, OrbitControls  } from '@react-three/drei'
import HitMeUp from "../static/023_raised_hand.webm";
import github from "../static/github.png";

function Word({ children, ...props }) {
    const color = new THREE.Color()
    const fontProps = { font: '/Inter-Bold.woff', fontSize: 2.5, letterSpacing: -0.05, lineHeight: 1, 'material-toneMapped': false }
    const ref = useRef()
    const [hovered, setHovered] = useState(false)
    const over = (e) => (e.stopPropagation(), setHovered(true))
    const out = () => setHovered(false)
    // Change the mouse cursor on hover
    useEffect(() => {
        if (hovered) document.body.style.cursor = 'pointer'
        return () => (document.body.style.cursor = 'auto')
    }, [hovered])
    // Tie component to the render-loop
    useFrame(({ camera }) => {
        // Make text face the camera
        ref.current.quaternion.copy(camera.quaternion)
        // Animate font color
        ref.current.material.color.lerp(color.set(hovered ? '#fa2720' : 'white'), 0.1)
    })
    return <Text ref={ref} onPointerOver={over} onPointerOut={out} {...props} {...fontProps} children={children} />
}

function Cloud({ count = 4, radius = 20 }) {
    const wordsMy = [
        ['.Net','JS','CSS', 'TS', 'C#','Go','Git','NodeJS'],
        ['Django','Python',"Machine Learning",'PyTorch','PostgreSQL', 'PL/SQL', 'MongoDB', 'OpenCV'],
        ['C++', 'Unity', 'Express', 'NestJS', 'VueJS', 'Svelte', 'AkitaJS', 'RxJS'],
        ['Astro', 'Gatsby', 'React', 'NextJS', 'Redux', 'MobX', 'NativeScript', 'Java'],
        ['Kotlin', 'HTML5', 'Phaser3', 'Vite', 'Rollup', 'Docker', 'ClickHouse', 'Figma'],
        ['TensorFlow', 'Keras', 'Pandas', 'Neural networks', 'YouTrack', 'Jira', 'Tailwind', 'BEM'],
        ['UE5', 'Babel', 'npm', 'Sass', 'Jest', 'Playwright', 'NightWatch', 'Selenium'],
        ['WebPack', 'yarn', 'flask', 'Linux', 'SQLite', 'ThreeJS', 'Parcel','NuxtJS'],
    ]
    // Create a count x count random words with spherical distribution
    const words = useMemo(() => {
        const temp = []
        const spherical = new THREE.Spherical()
        const phiSpan = Math.PI / (count + 1)
        const thetaSpan = (Math.PI * 2) / count
        for (let i = 1; i < count + 1; i++)
            // Taken from https://discourse.threejs.org/t/can-i-place-obects-on-a-sphere-surface-evenly/4773/6
            for (let j = 0; j < count; j++) {
                // console.log(i+j);
                console.log(wordsMy[i])
                temp.push([new THREE.Vector3().setFromSpherical(spherical.set(radius, phiSpan * i, thetaSpan * j)), wordsMy[i-1][j] || 'aa'])}
        return temp
    }, [count, radius])
    return words.map(([pos, word], index) => <Word key={index} position={pos} children={word} />)
}

export default function MainBody() {
    return (
        <>
            {/*<div style={{marginTop:'800px'}}>*/}
        <Canvas style={{position: 'relative', width:'100%', height:"100vh"}} dpr={[1, 2]} camera={{ position: [0, 0, 35], fov: 90 }}>
            <fog attach="fog" args={['#202025', 0, 80]} />
            <Cloud count={8} radius={20} />
            <OrbitControls enablePan={false} enableZoom={false} />
        </Canvas>
            {/*</div>*/}
            <div className={'w-40 h-40'}>
                <div className={'relative items-center justify-center text-center bg-blue-100 rounded-lg p-5 font-sans text-3xl flex flex-col'} >

                    Hit me up
                    <video autoPlay loop muted style={{width:'10rem', height:'10rem'}}>
                        <source src={HitMeUp} type={'video/webm'} codecs="vp8"/>
                    </video>
                    <a href={'https://github.com/TipicultBiomassa'}><img alt='' src={github} style={{width:'5rem'}} /></a>
                </div>
            </div>
        </>
    )
}
