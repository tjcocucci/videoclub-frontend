import styles from "./FormContainer.module.css";

export default function FormContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return <form className={styles.container}>{children}</form>;
}
