import styles from "./page.module.css";
import { Posts } from "@/components";

export default function Home() {
  return (
    <div className={styles.page}>
      <Posts />
    </div>
  );
}
