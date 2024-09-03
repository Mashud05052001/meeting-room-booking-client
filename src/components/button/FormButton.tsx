type TFormButtonProps = {
  buttonText?: string;
  isLoading: boolean;
};
const FormButton = ({ buttonText = "Submit", isLoading }: TFormButtonProps) => {
  return (
    <button
      className={`rounded-md  px-10 py-2 text-white transition-colors bg-common-500 hover:bg-common-600 dark:bg-sky-700"  ${
        isLoading ? "opacity-50" : ""
      }`}
      disabled={isLoading}
    >
      {buttonText}
    </button>
  );
};

export default FormButton;
