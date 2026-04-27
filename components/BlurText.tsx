"use client";
import { useEffect, useRef } from "react";

interface Props {
  text: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  delay?: number; // base delay in ms between words
}

export default function BlurText({ text, as: Tag = "span", className = "", delay = 80 }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const words = el.querySelectorAll<HTMLSpanElement>(".word");

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      words.forEach((w, i) => {
        setTimeout(() => w.classList.add("go"), i * delay);
      });
      observer.disconnect();
    }, { threshold: 0.1 });

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  const words = text.split(" ").map((word, i) => (
    <span key={i} className="word">{word}</span>
  ));

  // @ts-expect-error dynamic tag
  return <Tag ref={ref} className={className}>{words}</Tag>;
}
