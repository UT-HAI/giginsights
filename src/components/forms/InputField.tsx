type InputFieldProps = {
  id: string;
  type: string;
  placeholder: string;
  label: string;
};

export const InputField = ({
  id,
  type,
  placeholder,
  label,
}: InputFieldProps) => (
  <>
    <label
      htmlFor={id}
      className="text-stone-800 text-sm font-normal font-['Inter'] mb-2"
    >
      {label}
    </label>
    <input
      className="p-3 w-72 h-9 rounded border border-stone-300 mb-4"
      id={id}
      name={id}
      type={type}
      placeholder={placeholder}
    />
  </>
);
