interface IProps {
  label: string;
  value: string;
  onValue: (x: string) => void;
  currentValue: string;
}

const InputRadio = (props: IProps) => {
  const { label, value, onValue, currentValue } = props;
  return (
    <div className="flex items-center gap-1">
      <input
        className="w-[15px] h-[15px]"
        name="sex"
        type="radio"
        value={value}
        checked={currentValue === value}
        onChange={(e) => onValue(e.target.value)}
        id={value}
      ></input>
      <label htmlFor={value}>{label}</label>
    </div>
  );
};

export default InputRadio;
