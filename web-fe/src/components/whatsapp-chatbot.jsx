"use client";
import React, { useState } from "react";
import Image from "next/image";
import styles from "./WhatsAppWidget.module.css";
import { Muted } from "./ui/typography";

const WhatsAppWidget = () => {
  const [isActive, setIsActive] = useState(false);
  return (
    <div className="relative z-[999999]">
      <div className={`${styles.whatsappBox} ${isActive ? styles.active : ""}`}>
        <div className={styles.whatsappChat}>
          <div className={styles.chatbox}>
            <Image
              src="/whatsapp/arrow.png"
              alt="Arrow"
              className={styles.arrow}
              width={20}
              height={20}
            />
            <h6>Infra Buddy</h6>
            <p>
              Hi There 👋
              <br />
              How can I help you?
            </p>
            <p className={styles.time}>16:37</p>
          </div>
        </div>
        <div className={styles.chatBtnBox}>
          <div className={styles.chatBtn}>
            <a
              href="https://wa.me/+919266415151?text=Hello%20I%20Want%20To%20Know%20About%20Your%20Services"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/whatsapp/whatsapp.svg"
                alt="WhatsApp"
                width={20}
                height={20}
              />
              &nbsp;
              <p>Click To Chat</p>
            </a>
          </div>
        </div>
      </div>
      <div
        className={`${styles.whatsappStickyBtn}`}
        onClick={() => setIsActive(!isActive)}
      >
        <Muted
          className={
            "absolute -left-[84px] top-1/2 -z-10 -translate-y-1/2 text-nowrap rounded-s-full bg-black px-4 py-1 pl-3 text-xs text-white"
          }
        >
          Infra Buddy
        </Muted>
        <div className="relative z-10 rounded-full bg-[#00a884] p-4">
          <Image
            src="/whatsapp/whatsapp.svg"
            alt="WhatsApp Icon"
            width={40}
            height={40}
          />
        </div>
      </div>
    </div>
  );
};

export default WhatsAppWidget;
