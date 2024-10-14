import Button from "@/components/ui/Button";
import userServices from "@/services/user";
import styles from "./ModalDeleteUser.module.scss";
import ModalConfirm from "@/components/ui/ModalConfirm";

const ModalDeleteUser = (props: any) => {
  const { deletedUser, setDeletedUser, setUsersData } = props;

  return (
    <ModalConfirm onClose={() => setDeletedUser({})}>
      <div className={styles.modal__container}>
        <h2 className={styles.modal__container__title}>Are you sure?</h2>
        <div className={styles.modal__container__button__container}>
          <Button
            type="button"
            variant="outline-secondary"
            className={styles.modal__container__button}
            onClick={() => {
              userServices.deleteUser(deletedUser.id).then(() => {
                setDeletedUser({});
                userServices.getAllUsers().then((response) => {
                  setUsersData(response.data.data);
                });
              });
            }}
          >
            Yes
          </Button>
          <Button
            type="button"
            variant="primary"
            className={styles.modal__container__button}
            onClick={() => setDeletedUser({})}
          >
            No
          </Button>
        </div>
      </div>
    </ModalConfirm>
  );
};

export default ModalDeleteUser;
