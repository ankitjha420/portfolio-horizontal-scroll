import React, {useEffect, useRef} from 'react';
import './styles/App.scss'
import { gsap } from "gsap";
import LocomotiveScroll from 'locomotive-scroll';
import '../node_modules/locomotive-scroll/src/locomotive-scroll.scss'
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger)

export default function App(){

    // refs go here
    const wrapperRef = useRef(null)
    const lastPageRef = useRef(null)
    const pageTitle = useRef()
    const progressRef = useRef()
    const AppTitleRef = useRef()

    // everthing that runs once the App is mounted goes here
    useEffect(() => {
        if (wrapperRef){
            const myScroller = new LocomotiveScroll({
                el: wrapperRef.current,
                smooth: true,
                direction: 'horizontal',
                multiplier: 0.4,
            })
        if (AppTitleRef){
            // animation for intro sequence
            gsap.fromTo(AppTitleRef.current, {autoAlpha: 0.1, y: -20}, {duration: 2, autoAlpha: 1, y: 0})
        }

            // All scroll position based things go here
            myScroller.on('scroll', (args) => {
                // Get all current elements : args.currentElements
                if(typeof args.currentElements['hey'] === 'object') {
                    let progress = args.currentElements['hey'].progress;
                    console.log(progress);
                    // ouput log example: 0.34
                    // gsap example : myGsapAnimation.progress(progress);
                    gsap.to(progressRef.current, {duration: 1,
                    x: `${(progress*100) - 100}%`,
                    ease: 'Power3.out'})


                    if(progress > 0.3 && progress < 0.7){
                        // play gsap animation
                        gsap.to(wrapperRef.current, {duration: 1.5,
                        backgroundColor: 'white'})
                    }
                    else(gsap.to(wrapperRef.current, {duration: 1.5,
                    backgroundColor: '#f5deb3'}))
                }
            });
        }
        console.log(wrapperRef.current)
    }, [])














    return(
        <>
        <p className='bar'>Progress bar</p>
        <div className='real-bar'>
            <div className='progress-bar' ref={progressRef}></div>
        </div>
        <div className="wrapper" data-scroll-container ref={wrapperRef}>

            <div className='App Page' data-scroll-section data-scroll>
                <h1 ref={AppTitleRef}>Ankit Jha</h1>
            </div>
            <div className='Page-2 Page' data-scroll-section data-scroll data-scroll-id='hey'>
                <h1 ref={pageTitle}>Work</h1>
            </div>
            <div className='Page-3 Page' data-scroll-section data-scroll ref={lastPageRef}>
                <h1>About Me</h1>
            </div>

        </div>
        </>
    )
}