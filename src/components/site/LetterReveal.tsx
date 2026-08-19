import styles from "./LetterReveal.module.css";

export function LetterReveal({
  text,
  active,
  as: As = "span",
  className,
}: {
  text: string;
  active: boolean;
  as?: "span" | "h1" | "h2";
  className?: string;
}) {
  return (
    <As aria-label={text} className={className}>
      {[...text].map((char, index) => (
        <span
          key={index}
          aria-hidden="true"
          className={styles.letter}
          data-in={active || undefined}
          style={{ transitionDelay: `${index * 45}ms` }}
        >
          {char === " " ? " " : char}
        </span>
      ))}
    </As>
  );
}
