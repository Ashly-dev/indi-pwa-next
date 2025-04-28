declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataLayer: any[];
  }
  interface Navigator {
    standalone?: boolean;
  }
  interface Window {
    gtag: (
      event: string,
      action: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

export {};
