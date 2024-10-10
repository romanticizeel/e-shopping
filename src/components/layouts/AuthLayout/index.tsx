import styles from "./AuthLayout.module.scss";
import Link from "next/link";

type PropsType = {
  error?: string;
  title?: string;
  children: React.ReactNode;
  link: string;
  linkText?: string;
  pText?: string;
};

const AuthLayout = (props: PropsType) => {
  const { error, title, children, link, linkText, pText } = props;
  return (
    <div className={styles.auth}>
      <div className={styles.auth__form}>
        <h1 className={styles.auth__form__title}>{title}</h1>
        {error && <p className={styles.auth__form__error}>{error}</p>}
        {children}
        <p className={styles.auth__text}>
          {pText}
          <Link href={link}>{linkText}</Link>
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;
