import React from "react";
import { motion} from "framer-motion";
function BlobSvg({ variants}: any) {
  const pathVariants = {
    hidden: {
      pathLength: 0,
    },
    visible: {
      pathLength: 1,
      transition: {
        duration: 2,
        ease: "easeInOut",
      },
    },
    exit: { opacity: [1, 0.5, 0], x: -100 },
  };
  return (
    <>
      <motion.svg
        whileHover={{
          opacity: 1,
          scale: 1.2,
          transition: { ease: "easeOut", duration: 2 },
          pathLength: 1,
        }}
        style={{ cursor: "pointer" }}
        variants={variants}
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={pathVariants}
          fill="#000"
          d="M41.9,-50.6C55.9,-38.2,69.8,-26.5,72.8,-12.4C75.8,1.6,67.7,18,58.4,33.5C49.2,48.9,38.8,63.4,23.4,72.6C8,81.9,-12.4,85.9,-29.9,80.3C-47.5,74.8,-62.4,59.7,-71,42.2C-79.7,24.7,-82.2,4.9,-76,-10.5C-69.9,-26,-55.1,-37,-41,-49.3C-26.8,-61.7,-13.4,-75.4,0.3,-75.7C14,-76,27.9,-63,41.9,-50.6Z"
          transform="translate(100 100)"
        />
      </motion.svg>
    </>
  );
}

export default BlobSvg;