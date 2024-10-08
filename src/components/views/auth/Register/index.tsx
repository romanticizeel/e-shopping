import Link from "next/link";
import styles from "./Registers.module.scss";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";

const RegisterView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { push, query } = useRouter();

  const callbackUrl: any = query.callbackUrl || "/";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    const form = event.target as HTMLFormElement;
    const data = {
      fullName: form.fullName.value,
      email: form.email.value,
      phone: form.phone.value,
      password: form.password.value,
    };

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
      push("/auth/login");
    } else {
      setIsLoading(false);
      setError("Email already registered");
    }
  };

  return (
    <div className={styles.register}>
      <div className={styles.register__form}>
        <h1 className={styles.register__form__title}>Register</h1>
        {error && <p className={styles.register__form__error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          {/* input full name */}
          <Input label="Full Name" name="fullName" type="text" />

          {/* input email */}
          <Input label="Email" name="email" type="email" />

          {/* input phone number */}
          <Input label="Phone Number" name="phone" type="number" />

          {/* input password */}
          <Input label="Password" name="password" type="password" />

          {/* button register */}
          <Button
            type="submit"
            variant="primary"
            className={styles.register__form__button}
          >
            {isLoading ? "Loading..." : "Register"}
          </Button>
        </form>

        <hr className={styles.register__form__divider} />

        {/* button login with google */}
        <div className={styles.register__form__other}>
          <Button
            type="button"
            variant="secondary"
            onClick={() => signIn("google", { callbackUrl, redirect: false })}
            className={styles.register__form__other__button}
          >
            <i className="bx bxl-google" /> Login with Google
          </Button>
        </div>

        <p className={styles.register__text}>
          Have an account? <Link href="/auth/login">Sign in here</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterView;
