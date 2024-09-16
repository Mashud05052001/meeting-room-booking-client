type TFormButtonProps = {
  buttonText?: string;
  disabled?: boolean;
  isLoading?: boolean;
  type?: "submit" | "reset" | "button";
  className?: string;
};
const FilledButton = ({
  buttonText = "Submit",
  disabled = false,
  isLoading,
  type = "submit",
  className,
}: TFormButtonProps) => {
  return (
    <button
      className={`${className} rounded-md  px-10 py-2 text-white transition-colors bg-[#003669] hover:bg-[#054a8a] duration-150"  ${
        isLoading ? "opacity-50 cursor-wait" : "cursor-pointer"
      }
      ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
      `}
      disabled={disabled}
      type={type}
    >
      {buttonText}
    </button>
  );
};

export default FilledButton;
