import { Providers } from "@/store/provider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from 'react';
import toast, { Toaster, useToasterStore } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  const { toasts } = useToasterStore();
  const TOAST_LIMIT = 1;
  // Enforce Limit
  useEffect(() => {
    toasts
      .filter((t) => t.visible) // Only consider visible toasts
      .filter((_, i) => i >= TOAST_LIMIT) // Is toast index over limit
      .forEach((t) => toast.dismiss(t.id)); // Dismiss – Use toast.remove(t.id) removal without animation
  }, [toasts]);
  return (
    <Providers>
      <Component {...pageProps} />
      <Toaster />
    </Providers>
  );
}
