/* eslint-disable @typescript-eslint/no-explicit-any */
import Banner from "@/Components/Banner";
import Featured from "@/Components/Featured";
import Layout from "@/Components/Layout";
import OfferHighlight from "@/Components/OfferHighlight";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isPWA =
        window.matchMedia("(display-mode: standalone)").matches ||
        (navigator as any).standalone; // iOS Safari uses navigator.standalone

      if (isPWA && !localStorage.getItem("hasVisitedPWA")) {
        localStorage.setItem("hasVisitedPWA", "true");

        (window as any).dataLayer = (window as any).dataLayer || [];
        (window as any).dataLayer.push({
          event: "FirstAppOpen",
          status: "first_visit",
          message: "The user has opened the app as a PWA for the first time.",
        });
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const { query } = router;

      // Remove 'referral' from query parameters
      const { game = "live", ...otherQueryParams } = query;

      // Determine the path based on 'game' query parameter
      const availablePaths: Record<string, string> = {
        home: "home",
        live: "casino",
        slot: "slot",
        indigames: "indigames",
        sports: "sports",
        footballbook: "footballbook",
      };

      const gameKey = Array.isArray(game)
        ? game[0]?.toLowerCase()
        : (game as string).toLowerCase();
      const path = availablePaths[gameKey] || "live";

      const sanitizedQueryParams: Record<string, string> = Object.entries(
        otherQueryParams
      ).reduce((acc, [key, value]) => {
        if (typeof value === "string") {
          acc[key] = value; // Add string values directly
        } else if (Array.isArray(value)) {
          acc[key] = value.join(","); // Join array values into a comma-separated string
        }
        return acc;
      }, {} as Record<string, string>);

      // Rebuild the query string
      const newQueryString = new URLSearchParams(
        sanitizedQueryParams
      ).toString();

      // Check logged-in status from localStorage
      const loggedInStatus = localStorage.getItem("loggedIn");

      if (loggedInStatus === "1") {
        // Redirect to the appropriate URL
        router.push(`https://www.indibet.in/${path}?${newQueryString}`);
      }
    }
  }, [router]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Indibet | Landing</title>
      </Head>
      <Layout>
        <Banner />
        <Featured />
        <OfferHighlight />
      </Layout>
    </>
  );
}
