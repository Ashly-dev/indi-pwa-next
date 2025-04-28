import nextPWA from "next-pwa";

const withPWA = nextPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
});

export default withPWA({
  reactStrictMode: true, // Enables React strict mode for additional checks
});
