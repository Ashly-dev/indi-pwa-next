// import { DEFAULT_REFERRAL } from "@/data/constants";
import "@/styles/globals.css";
// import axios from "axios";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
// import Script from "next/script";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// const GA_MEASUREMENT_ID = "G-QDC9RPWDDH";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // const sendPageView = (url: string) => {
  //   if (typeof window !== "undefined" && window.gtag) {
  //     const referral =
  //       new URLSearchParams(window.location.search).get("referral") ||
  //       DEFAULT_REFERRAL;

  //     window.gtag("event", "lp_view", {
  //       page_path: url,
  //       referral: referral,
  //     });
  //   }
  // };

  // Track page views on route change
  // useEffect(() => {
  //   if (router.isReady) {
  //     sendPageView(window.location.href);
  //     router.events.on("routeChangeComplete", sendPageView);
  //     return () => {
  //       router.events.off("routeChangeComplete", sendPageView);
  //     };
  //   }
  // }, [router.events, router.isReady]);

  // useEffect(() => {
  //   // Get referral from query params
  //   if (router.isReady) {
  //     const referral = router.query.referral || DEFAULT_REFERRAL;

  //     // Send visit data to the PHP endpoint
  //     const trackVisit = () => {
  //       try {
  //         axios.post("https://indi131.com/track_visit.php", {
  //           url: window.location.href,
  //           referral: referral,
  //         });
  //         console.log("Visit tracked successfully.");
  //       } catch (error) {
  //         console.error("Error tracking visit:", error);
  //       }
  //     };

  //     // Track visit when the page loads
  //     trackVisit();
  //   }
  // }, [router.query, router.isReady]);

  useEffect(() => {
    if (router.isReady) {
      const queryParams = new URLSearchParams(
        Object.entries(router.query).reduce((acc, [key, value]) => {
          acc[key] = Array.isArray(value) ? value[0] || "" : value || ""; // Handle undefined by defaulting to an empty string
          return acc;
        }, {} as Record<string, string>)
      ).toString();

      // const manifestUrl = "manifest.json"
      if (typeof window !== "undefined") {
        // Get the domain dynamically from window.location.origin
        const manifestUrl = `/manifest.php${
          queryParams ? `?${queryParams}` : ""
        }`;

        // Query and cast to HTMLLinkElement
        let manifestLink = document.querySelector(
          "link[rel='manifest']"
        ) as HTMLLinkElement | null;

        if (!manifestLink) {
          // Create the <link rel="manifest"> if it doesn't exist
          manifestLink = document.createElement("link") as HTMLLinkElement;
          manifestLink.rel = "manifest";
          document.head.appendChild(manifestLink);
        }

        // Update the href attribute of the manifest link
        manifestLink.href = manifestUrl;
      }

      // const manifestUrl = `https://indi36.com/manifest.php${queryParams ? `?${queryParams}` : ""
      //   }`;
      // console.log(manifestUrl);

      // // Query and cast to HTMLLinkElement
      // let manifestLink = document.querySelector(
      //   "link[rel='manifest']"
      // ) as HTMLLinkElement | null;

      // if (!manifestLink) {
      //   // Create the <link rel="manifest"> if it doesn't exist
      //   manifestLink = document.createElement("link") as HTMLLinkElement;
      //   manifestLink.rel = "manifest";
      //   document.head.appendChild(manifestLink);
      // }

      // // Update the href attribute of the manifest link
      // manifestLink.href = manifestUrl;
    }
    // Convert router.query (ParsedUrlQuery) to a Record<string, string>
  }, [router.isReady]);

  return (
    <>
      {/* Google Analytics Script */}
      {/* <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="ga4-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){ dataLayer.push(arguments); }
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
        `,
        }}
      /> */}
      <Component {...pageProps} />
      <ToastContainer position="top-center" theme="colored" />
    </>
  );
}
