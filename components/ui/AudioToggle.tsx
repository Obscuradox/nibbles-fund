"use client";

import { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { getAudio } from "@/lib/audio";

export function AudioToggle() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    getAudio().setEnabled(on);
  }, [on]);

  return (
    <button
      onClick={() => setOn((v) => !v)}
      className="fixed bottom-4 right-4 z-40 flex h-11 w-11 items-center justify-center border border-brass/40 bg-cream-paper/95 text-ink backdrop-blur hover:bg-whiteboard-cream"
      style={{ borderRadius: 2 }}
      aria-label={on ? "Mute terminal ambience" : "Unmute terminal ambience"}
      title={on ? "Mute" : "Enable terminal ambience"}
    >
      {on ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4 opacity-60" />}
    </button>
  );
}
