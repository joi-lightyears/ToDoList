import React from 'react'
import styles from '../styles/modules/todoItem.module.scss'
import { motion, useMotionValue, useTransform } from "framer-motion"
const checkVariants = {
  initial:{
    color: '#fff'
  },
  checked:{
    pathLength: 1,
  },
  unChecked:{
    pathLength: 0,
  }
}

const boxVariant={
  checked:{
    background:'var(--primaryCyan)',
    transition: {duration: 0.1}
  },
  unChecked:{
    background: 'var(--gray-1)',
    transition: {
      duration:0.1
    }
  }
}
function CheckButton({checked, handleCheck}) {
  const pathLength = useMotionValue(0)
  const opacity = useTransform(pathLength, [0.05, 0.15], [0,1])
  return (
    <motion.div className={styles.svgBox}
    variants={boxVariant}
    animate={checked?'checked':'unChecked'}
    onClick={handleCheck}>
        <motion.svg
        className={styles.svg}
        viewBox="0 0 53 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        >
        <motion.path
          style={{pathLength, opacity}}
          variants={checkVariants}
          animate={checked?'checked':'unChecked'}
          fill="none"
          strokeMiterlimit="10"
          strokeWidth="6"
          d="M1.5 22L16 36.5L51.5 1"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </motion.svg>
    </motion.div>
  )
}

export default CheckButton