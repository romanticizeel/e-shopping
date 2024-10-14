import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import styles from "./ModalUpdateUser.module.scss";
import { FormEvent, useState } from "react";
import userServices from "@/services/user";
import { useSession } from "next-auth/react";

const ModalUpdateUser = (props: any) => {
  const { updatedUser, setUpdatedUser, setUsersData } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const session: any = useSession();

  const handleUpdateUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    const form: any = event.target as HTMLFormElement;
    const data = { role: form.role.value };

    try {
      await userServices.updateUser(
        updatedUser.id,
        data,
        session.data?.accessToken
      );
      setIsLoading(false);
      setUpdatedUser({});
      const response = await userServices.getAllUsers();
      setUsersData(response.data.data);
    } catch (error) {
      setIsLoading(false);
      setError("Error updating user");
    }
  };

  return (
    <Modal onClose={() => setUpdatedUser({})}>
      <h3>Update User</h3>
      <form onSubmit={handleUpdateUser} className={styles.modalUpdateUser}>
        {error && <p className={styles.modalUpdateUser__error}>{error}</p>}
        <Input
          label="Full Name"
          name="fullName"
          type="text"
          defaultValue={updatedUser.fullName}
          disabled
        />
        <Input
          label="Email"
          name="email"
          type="email"
          defaultValue={updatedUser.email}
          disabled
        />
        <Input
          label="Phone"
          name="phone"
          type="number"
          defaultValue={updatedUser.phone}
          disabled
        />
        <Select
          label="Role"
          name="role"
          defaultValue={updatedUser.role}
          options={[
            { value: "admin", label: "Admin" },
            { value: "member", label: "Member" },
          ]}
        />
        <Button
          type="submit"
          variant="primary"
          className={styles.modalUpdateUser__button}
        >
          {isLoading ? "Loading..." : "Update"}
        </Button>
      </form>
    </Modal>
  );
};

export default ModalUpdateUser;
