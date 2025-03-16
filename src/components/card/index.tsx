"use client";
import { Project } from '@/app/data'
import React, { FC, useRef } from 'react'
import style from './style.module.scss';
import Image from 'next/image';
import {motion, MotionValue, useScroll, useTransform} from "framer-motion";

type CardProps = {
    project: Project,
    i: number,
    range: number[],
    targetScale: number,
    progress: MotionValue<number>
}

const index: FC<CardProps> = ({ project, i, progress, range, targetScale }) => {
    const { title, description, src, color } = project;

    const containerRef = useRef(null);
    const {scrollYProgress} = useScroll({
        target: containerRef,
        offset: ['start end', 'start start']

    });

    const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
    const scale = useTransform(progress, range, [1, targetScale]);


    return (
        <motion.div ref={containerRef} style={{top: `calc(10% + ${(i || 0) * 22}px)`, scale}} className={style.cardContainer}>
            <div style={{ backgroundColor: color }} className={style.card}>

                <h2>{title}</h2>
                <div className={style.body}>
                    <div className={style.description}>
                        <p>{description}</p>
                    </div>

                    <div className={style.imageContainer}>
                    <motion.div style={{scale: imageScale}} className={style.inner}>
                        <Image
                            src={`/images/${src}`}
                            fill={true}
                            alt="Image"
                        />
                    </motion.div>
                </div>
                </div>

            

            </div>
        </motion.div>
    )
}

export default index