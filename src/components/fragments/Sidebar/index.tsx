import { useRouter } from "next/router";
import styles from "./Sidebar.module.scss";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { signOut } from "next-auth/react";

type PropsTypes = {
  listSidebarItem: {
    title: string;
    path: string;
    icon: string;
  }[];
};

const Sidebar = (props: PropsTypes) => {
  const { listSidebarItem } = props;
  const { pathname } = useRouter();

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar__top}>
        <h1 className={styles.sidebar__top__title}>E-shopping</h1>
        <div className={styles.sidebar__top__lists}>
          {listSidebarItem.map((item) => {
            return (
              <Link
                key={item.title}
                href={item.path}
                className={`${styles.sidebar__top__lists__item} ${pathname === item.path && styles.sidebar__top__lists__item__active}`}
              >
                <i
                  className={`bx ${item.icon} ${styles.sidebar__top__lists__item__icon}`}
                />
                <h4 className={styles.sidebar__top__lists__item__title}>
                  {item.title}
                </h4>
              </Link>
            );
          })}
        </div>
        <div className={styles.sidebar__bottom}>
          <Button
            variant="secondary"
            className={styles.sidebar__bottom__button}
            type="button"
            onClick={() => {
              signOut();
            }}
          >
            <i className="bx bx-log-out" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
