type TFormButtonProps = {
  buttonText?: string;
  isLoading?: boolean;
  type?: "submit" | "reset" | "button";
  className?: string;
};
const OutlineButton = ({
  buttonText = "Submit",
  isLoading,
  type = "submit",
  className,
}: TFormButtonProps) => {
  return (
    <button
      className={`${className} rounded-md py-1 transition-colors border-2 w-full border-[#003669] hover:bg-[#054a8a] duration-150 text-[#003669] hover:text-white ${
        isLoading ? "opacity-50 cursor-wait" : "cursor-pointer"
      }`}
      disabled={isLoading}
      type={type}
    >
      {buttonText}
    </button>
  );
};

export default OutlineButton;
