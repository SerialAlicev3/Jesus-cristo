"use client";

import { useEffect, useState } from "react";

const videoUrl = "https://www.youtube.com/embed/p4FMVtrnmuU?autoplay=1&mute=1&playsinline=1&rel=0&loop=1&playlist=p4FMVtrnmuU";

export function OpeningYoutubeVideo() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="opening-video-placeholder" />;
  }

  return (
    <iframe
      allow="autoplay; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      src={videoUrl}
      title="Mensagem em vídeo"
    />
  );
}
