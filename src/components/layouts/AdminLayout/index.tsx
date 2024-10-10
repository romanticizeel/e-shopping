import Sidebar from "@/components/fragments/Sidebar";
import styles from "./AdminLayout.module.scss";

type PropsTypes = {
  children: React.ReactNode;
};

const listSidebarItem = [
  {
    title: "Dashboard",
    path: "/admin",
    icon: "bxs-dashboard",
  },
  {
    title: "Products",
    path: "/admin/products",
    icon: "bxs-package",
  },
  {
    title: "Users",
    path: "/admin/users",
    icon: "bxs-user",
  },
];

const AdminLayout = (props: PropsTypes) => {
  const { children } = props;
  return (
    <div className={styles.admin}>
      <Sidebar listSidebarItem={listSidebarItem} />
      {children}
    </div>
  );
};

export default AdminLayout;
