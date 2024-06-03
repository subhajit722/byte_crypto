import React from "react";
import Button from "../Common/Button";
import "./style.css";
import gradient from "../../assets/gradient.png";
import iphone from "../../assets/iphone.png";
import { motion } from "framer-motion";
import { RWebShare } from "react-web-share";
import { toast } from "react-toastify";

const Intropage = ()=> {
  return (
    <div className="main-flex">
      <div className="info-landing">
        <motion.h1
          className="heading1"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
         Byte Crypto
        </motion.h1>
        <motion.h1
          className="heading2"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.75, duration: 1 }}
        >
          Real Time.
        </motion.h1>
        <motion.p
          className="info-text"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          Open your crypto walet 
      
        </motion.p>
        <motion.div
          className="btn-flex"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.25, duration: 0.75 }}
        >
          <a href="/dashboard">
            <Button text={"Dashboard"} outlined={true} />
          </a>
         
            <Button text={"Share App"} outlined={true} />
       
        </motion.div>
      </div>
      <div className="gradient-div">
        <img src={gradient} className="gradient" />
        <motion.img
          src={iphone}
          className="iphone"
          initial={{ y: -10 }}
          animate={{ y: 10 }}
          transition={{
            type: "smooth",
            repeatType: "mirror",
            duration: 2,
            repeat: Infinity,
          }}
        />
      </div>
    </div>
  );
}

export default Intropage;