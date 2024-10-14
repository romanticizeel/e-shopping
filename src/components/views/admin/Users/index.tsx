import AdminLayout from "@/components/layouts/AdminLayout";
import styles from "./Users.module.scss";
import Button from "@/components/ui/Button";
import ModalUpdateUser from "./ModalUpdateUser";
import { useState, useEffect } from "react";
import userServices from "@/services/user";
import ModalDeleteUser from "./ModalDeleteUser";

type PropTypes = {
  users: any;
};

const AdminUsersView = (props: PropTypes) => {
  const { users } = props;

  const [updatedUser, setUpdatedUser] = useState<any>({});
  const [deletedUser, setDeletedUser] = useState<any>({});
  const [usersData, setUsersData] = useState<any[]>([]);

  useEffect(() => {
    setUsersData(users);
  }, [users]);
  return (
    <>
      <AdminLayout>
        <div className={styles.users}>
          <h1 className={styles.users__title}>User Management</h1>
          <div className={styles.users__tableWrapper}>
            <table className={styles.users__table}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {usersData.map((user: any, index: number) => (
                  <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td>{user.fullName}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.role}</td>
                    <td>
                      <div className={styles.users__table__action}>
                        <Button
                          type="button"
                          variant="outline-secondary"
                          className={styles.users__table__action__button}
                          onClick={() => setUpdatedUser(user)}
                        >
                          <i className="bx bx-edit"></i>
                        </Button>
                        <Button
                          type="button"
                          variant="outline-secondary"
                          className={styles.users__table__action__button}
                          onClick={ () => setDeletedUser(user)}
                        >
                          <i className="bx bx-trash-alt"></i>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </AdminLayout>

      {Object.keys(updatedUser).length > 0 && (
        <ModalUpdateUser
          updatedUser={updatedUser}
          setUpdatedUser={setUpdatedUser}
          setUsersData={setUsersData}
        />
      )}
      {Object.keys(deletedUser).length > 0 && (
        <ModalDeleteUser
          deletedUser={deletedUser}
          setDeletedUser={setDeletedUser}
          setUsersData={setUsersData}
        />
      )}
    </>
  );
};

export default AdminUsersView;
