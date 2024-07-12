"use client";
import Script from "next/script";
import React from "react";

export default function InteraktChatbot() {
  return (
    <Script id="interakt-chatbot" defer>
      {`(function(w,d,s,c,r,a,m){
            w['KiwiObject']=r;
            w[r]=w[r] || function () {
              (w[r].q=w[r].q||[]).push(arguments)};
              w[r].l=1*new Date();
              a=d.createElement(s);
              m=d.getElementsByTagName(s)[0];
            a.async=1;
            a.src=c;
            m.parentNode.insertBefore(a,m)
            })(window,document,'script',"https://app.interakt.ai/kiwi-sdk/kiwi-sdk-17-prod-min.js?v="+ new Date().getTime(),'kiwi');
        window.addEventListener("load",function () {
            kiwi.init('', 'VjLmEvPfE3ANyJc8hQZKmMo3XrH3neWx', {});
        });`}
    </Script>
  );
}
