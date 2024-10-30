import { useEffect, useState } from "react";

function getCurrentWidth(): number {
  if (window) {
    return window.innerWidth;
  }
  return 0;
}

export default function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState(getCurrentWidth());

  const handleResize = () => {
    setWindowWidth(getCurrentWidth());
  };

  useEffect(() => {
    window?.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { windowWidth };
}
