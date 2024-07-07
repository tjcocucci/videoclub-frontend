import styles from "./ErrorList.module.css";

export default function ErrorList({ errors }: { errors: string[] }) {
  return (
    <ul className={styles.error}>
      {errors.map((error, index) => (
        <li key={index}>{error}</li>
      ))}
    </ul>
  );
}
