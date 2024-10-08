import Link from "next/link";
import styles from "./register.module.scss";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

const RegisterView = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(''); 
    const push = useRouter();
    
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setError('');
        const form = event.target as HTMLFormElement;
        const data = {
            fullName: form.fullName.value,
            email: form.email.value,
            phone: form.phone.value,
            password: form.password.value,
        }

        const result = await fetch("/api/user/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (result.status === 200) {
            form.reset();
            setIsLoading(false);
            push.push('/auth/login');
        } else {
            setIsLoading(false);
            setError("Email already registered");
        }
    }

  return (
    <div className={styles.register}>
      <h1 className={styles.register__title}>Register</h1>
      {error && <p className={styles.register__error}>{error}</p>}
      <div className={styles.register__form}>
        <form onSubmit={handleSubmit}>
          {/* input full name */}
          <div className={styles.register__form__item}>
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              className={styles.register__form__item__input}
              required
            />
          </div>

          {/* input email */}
          <div className={styles.register__form__item}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className={styles.register__form__item__input}
              required
            />
          </div>

          {/* input phone number */}
          <div className={styles.register__form__item}>
            <label htmlFor="phone">Phone Number</label>
            <input
              type="number"
              name="phone"
              id="phone"
              className={styles.register__form__item__input}
              required
            />
          </div>

          {/* input password */}
          <div className={styles.register__form__item}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className={styles.register__form__item__input}
              required
            />
          </div>

          {/* button register */}
          <button type="submit" className={styles.register__form__item__button}>
            {isLoading ? "Loading..." : "Register"}
          </button>
        </form>
      </div>
      <p className={styles.register__text}>
        Have an account? <Link href="/auth/login">Sign in here</Link>
      </p>
    </div>
  );
};

export default RegisterView;
