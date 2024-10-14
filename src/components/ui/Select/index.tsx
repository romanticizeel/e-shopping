import styles from "./Select.module.scss";

type OptionTypes = {
  value: string;
  label: string;
};

type PropsTypes = {
  label?: string;
  name: string;
  defaultValue?: string;
  disabled?: boolean;
  options: OptionTypes[];
};

const Select = (props: PropsTypes) => {
  const { label, name, defaultValue, disabled, options } = props;
  return (
    <div className={styles.container}>
      {label && <label htmlFor={name}>{label}</label>}
      <select
        className={styles.container__select}
        id={name}
        name={name}
        defaultValue={defaultValue}
        disabled={disabled}
      >
        {options.map((option) => (
          <option key={option.label} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
