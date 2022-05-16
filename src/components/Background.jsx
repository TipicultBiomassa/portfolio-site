import { useTransition, animated } from 'react-spring'
import React, {useEffect, useState} from 'react';


export default function Mount({scrollProgress}) {
    const [show, set] = useState(false)


    // if (scrollProgress === 1) {
    //     set(!show)
    // }
    useEffect(()=>{
        scrollProgress > 0.9 ? setTimeout(()=>set(true),200) : setTimeout(()=>set(false),200);
    },[scrollProgress])

    const transitions = useTransition(show, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        reverse: show,
        delay: 200,
        config: { mass: 1, tension: 280, friction: 120 },
        // onRest: () => set(!show),
    })
    return transitions(
        (styles, item) => item && <animated.div className={'mainBody'} style={styles} />
    )
}