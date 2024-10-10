import styles from "./Login.module.scss";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import AuthLayout from "@/components/layouts/AuthLayout";
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
    <AuthLayout
      title="Login"
      link="/auth/register"
      linkText="Sign up here"
      pText="Don't have an account?"
      error={error}
    >
      <form onSubmit={handleSubmit}>
        {/* input email */}
        <Input label="Email" name="email" type="email" />

        {/* input password */}
        <Input label="Password" name="password" type="password" />

        {/* button login */}
        <Button
          type="submit"
          variant="primary"
          className={styles.login__button}
        >
          {isLoading ? "Loading..." : "Login"}
        </Button>
      </form>
      <hr className={styles.login__divider} />

      {/* button login with google */}
      <div className={styles.login__other}>
        <Button
          type="button"
          variant="secondary"
          onClick={() => signIn("google", { callbackUrl, redirect: false })}
          className={styles.login__other__button}
        >
          <i className="bx bxl-google" /> Login with Google
        </Button>
      </div>
    </AuthLayout>
  );
};

export default LoginView;
