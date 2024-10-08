import Link from "next/link";
import styles from "./Logins.module.scss";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";

const LoginView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { push, query } = useRouter();

  const callbackUrl: any = query.callbackUrl || "/";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    const form = event.target as HTMLFormElement;
    try {
      const res = await signIn("credentials", {
        email: form.email.value,
        password: form.password.value,
        redirect: false,
        callbackUrl,
      });

      if (!res?.error) {
        setIsLoading(false);
        form.reset();
        push(callbackUrl);
      } else {
        setIsLoading(false);
        setError("Invalid email or password");
      }
    } catch (error) {
      setIsLoading(false);
      setError("Message: " + error);
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.login__form}>
        <h1 className={styles.login__form__title}>Login</h1>
        {error && <p className={styles.login__form__error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          {/* input email */}
          <Input label="Email" name="email" type="email" />

          {/* input password */}
          <Input label="Password" name="password" type="password" />

          {/* button login */}
          <Button
            type="submit"
            variant="primary"
            className={styles.login__form__button}
          >
            {isLoading ? "Loading..." : "Login"}
          </Button>
        </form>

        <hr className={styles.login__form__divider} />

        {/* button login with google */}
        <div className={styles.login__form__other}>
          <Button
            type="button"
            variant="secondary"
            onClick={() => signIn("google", { callbackUrl, redirect: false })}
            className={styles.login__form__other__button}
          >
            <i className="bx bxl-google" /> Login with Google
          </Button>
        </div>
        <p className={styles.login__text}>
          Don&apos;t have an account?
          <Link href="/auth/register">Sign up here</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginView;
