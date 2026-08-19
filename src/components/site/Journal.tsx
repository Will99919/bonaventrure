import type { PostItem } from "./types";
import styles from "./Journal.module.css";

export function Journal({ posts }: { posts: PostItem[] }) {
  return (
    <section id="journal" className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Journal d&rsquo;atelier</h2>
        <a
          href="https://instagram.com/bonaventure.couture"
          target="_blank"
          rel="noreferrer"
          className={styles.link}
        >
          @bonaventure.couture
        </a>
      </div>

      <div className={styles.strip}>
        {posts.map((post, index) => (
          <div
            key={post.id}
            className={styles.tile}
            style={{ background: index % 2 === 1 ? "var(--placeholder-b)" : "var(--placeholder-a)" }}
          >
            {post.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={post.image} alt={post.caption} className={styles.image} />
            ) : (
              <span className={styles.caption}>{post.caption}</span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
