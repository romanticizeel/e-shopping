import styles from "./Register.module.scss";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import authServices from "@/services/auth";
import AuthLayout from "@/components/layouts/AuthLayout";

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

    try {
      const result = await authServices.registerAccount(data);

      if (result.status === 200) {
        form.reset();
        setIsLoading(false);
        push("/auth/login");
      }
    } catch (error: any) {
      setIsLoading(false);
      if (error.response && error.response.status === 400) {
        setError("Email already registered");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <AuthLayout
      title="Register"
      link="/auth/login"
      linkText="Sign in here"
      pText="Have an account?"
      error={error}
    >
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
          className={styles.register__button}
        >
          {isLoading ? "Loading..." : "Register"}
        </Button>
      </form>

      <hr className={styles.register__divider} />

      {/* button login with google */}
      <div className={styles.register__other}>
        <Button
          type="button"
          variant="secondary"
          onClick={() => signIn("google", { callbackUrl, redirect: false })}
          className={styles.register__other__button}
        >
          <i className="bx bxl-google" /> Login with Google
        </Button>
      </div>
    </AuthLayout>
  );
};

export default RegisterView;
