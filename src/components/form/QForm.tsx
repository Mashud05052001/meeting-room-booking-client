import { ReactNode } from "react";
import {
  useForm,
  FormProvider,
  SubmitHandler,
  FieldValues,
} from "react-hook-form";

type TQFormProps = {
  children: ReactNode;
  onSubmit: SubmitHandler<FieldValues>;
  defaultValues?: Record<string, unknown>;
  resolver?: unknown;
  className?: string;
};

const QForm = ({
  children,
  onSubmit,
  defaultValues,
  resolver,
  className,
}: TQFormProps) => {
  const formConfig: Record<string, unknown> = {};
  if (defaultValues) formConfig["defaultValues"] = defaultValues;
  if (resolver) formConfig["resolver"] = resolver;
  const methods = useForm(formConfig);
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((data) => {
          onSubmit(data);
          methods.reset();
        })}
        className={className}
      >
        {children}
      </form>
    </FormProvider>
  );
};

export default QForm;
