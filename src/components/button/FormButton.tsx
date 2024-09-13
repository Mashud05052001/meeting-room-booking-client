type TFormButtonProps = {
  buttonText?: string;
  isLoading?: boolean;
  type?: "submit" | "reset" | "button";
};
const FormButton = ({
  buttonText = "Submit",
  isLoading,
  type = "submit",
}: TFormButtonProps) => {
  return (
    <button
      className={`rounded-md  px-10 py-2 text-white transition-colors bg-[#003669] hover:bg-[#054a8a] duration-150"  ${
        isLoading ? "opacity-50 cursor-wait" : "cursor-pointer"
      }`}
      disabled={isLoading}
      type={type}
    >
      {buttonText}
    </button>
  );
};

export default FormButton;
