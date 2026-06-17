"use client";

import { useEffect, useState } from "react";

const START_DATE = "2026-10-01T09:00:00";

export function Countdown() {
  const [text, setText] = useState("Загрузка...");

  useEffect(() => {
    const start = new Date(START_DATE).getTime();

    function tick() {
      const diff = start - Date.now();
      if (diff <= 0) {
        setText("Марафон начался");
        return;
      }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor(diff / 3600000) % 24;
      const m = Math.floor(diff / 60000) % 60;
      const s = Math.floor(diff / 1000) % 60;
      setText(`${d} дн. ${h} ч. ${m} мин. ${s} сек.`);
    }

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return <div id="countdown">{text}</div>;
}
