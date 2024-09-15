type TFormButtonProps = {
  buttonText?: string;
  isLoading?: boolean;
  type?: "submit" | "reset" | "button";
  className?: string;
};
const FilledButton = ({
  buttonText = "Submit",
  isLoading,
  type = "submit",
  className,
}: TFormButtonProps) => {
  return (
    <button
      className={`${className} rounded-md  px-10 py-2 text-white transition-colors bg-[#003669] hover:bg-[#054a8a] duration-150"  ${
        isLoading ? "opacity-50 cursor-wait" : "cursor-pointer"
      }`}
      disabled={isLoading}
      type={type}
    >
      {buttonText}
    </button>
  );
};

export default FilledButton;
