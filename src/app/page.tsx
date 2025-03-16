"use client";
import React, { useEffect } from 'react'
import { projects } from "@/app/data"
import Card from "@/components/card";
import { motion, useScroll } from "framer-motion";
import Lenis from '@studio-freight/lenis';

import style from './page.module.scss';
const page = () => {
  const container = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end end']
  })

  useEffect(() => {
    scrollYProgress.on("change", e => {
      console.log(e);
    })

    const lenis = new Lenis();

    // Use requestAnimationFrame to continuously update the scroll
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

  }, [])

  return (
    <main ref={container} className={style.main}>
      {
        projects.map((project, i) => {
          const targetScale = 1 - ((projects.length - i) * 0.05);
          return <Card project={project} key={project.title + i} i={i} range={[i * 0.25, 1]} targetScale={targetScale} progress={scrollYProgress} />
        })
      }
    </main>
  )
}

export default page