import React from "react";
import Script from "next/script";

const GoogleAnalyticss = () => {
  return (
    <>
      <Script id="" strategy="worker">
        {`
            function gtag_report_conversion(url) {
                var callback = function () {
                    if (typeof(url) != 'undefined') {
                    window.location = url;
                    }
                };
                gtag('event', 'conversion', {
                    'send_to': 'AW-11427244694/n0lqCOr1978ZEJbV98gq',
                    'event_callback': callback
                });
                return false;
            }
            `}
      </Script>
    </>
  );
};

export default GoogleAnalyticss;
