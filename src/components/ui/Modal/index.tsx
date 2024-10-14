import { useEffect, useRef } from "react";
import styles from "./Modal.module.scss";

type PropTypes = {
  children?: React.ReactNode;
  onClose: any;
  className?: string;
};

const Modal = (props: PropTypes) => {
  const { children, onClose, className } = props;
  const ref: any = useRef();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose();
      }
    };

    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className={`${styles.modal} ${className}`}>
      <div className={styles.modal__main} ref={ref}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
