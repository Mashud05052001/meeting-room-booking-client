import FilledButton from "@/components/button/FilledButton";
import QForm from "@/components/form/QForm";
import QInput from "@/components/form/QInput";
import OpacityMotion from "@/components/motionDiv/OpacityMotion";
import { contactUsArray } from "@/constant/fixedData.constant";
import { useContactUsEmailMutation } from "@/redux/features/auth/auth.api";
import { sendEmailSchema } from "@/schemas/auth.schema";
import { TSuccess } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";

const Contact = () => {
  const [sendEmail, { isLoading: emailSendLoading }] =
    useContactUsEmailMutation();

  const onSubmit = async (data: Record<string, string>) => {
    if (!data?.name || !data?.email || !data?.message) {
      toast.error("Pleas fill the form to send email.");
    } else {
      const returnEmail = window.prompt(
        "Please enter your email where the email will be sended. This is for assignment purpose to check email send successfully."
      );
      try {
        z.string().email().parse(returnEmail);
        const emailData = {
          userName: data.name,
          userEmail: data.email,
          message: data.message,
          sendToEmail: returnEmail,
        };
        const loadingId = toast.loading("Email sending...");
        try {
          const result = (await sendEmail(emailData).unwrap()) as TSuccess;
          if (result?.success) {
            toast.success("Email send successfull.", { id: loadingId });
          }
        } catch (error) {
          console.log(error);
          toast.error("Email send failed.", { id: loadingId });
        }
      } catch (error) {
        console.log(error);
        toast.error("Please enter a valid return email.");
      }
    }
  };

  return (
    <OpacityMotion className="py-5 px-4 lg:py-8  flex items-center mb-20">
      <div className="flex flex-col justify-center w-full ">
        {/* Contact Us Infos */}
        <div className="h-full w-full lg:w-7/12 mx-auto mb-10">
          <div className="mx-auto relative mb-3 lg:mb-0">
            <div className="mb-6 text-3xl font-semibold">
              <h1 className="text-center text-common-600">Contact Us</h1>
            </div>
            <div className="lg:space-x-2 grid gap-3 sm:grid-cols-2 md:grid-cols-3  font-semibold">
              {contactUsArray &&
                contactUsArray?.map((item) => (
                  <div
                    key={item.id}
                    className="space-y-2 hover:scale-105 duration-150 border-[0.1px] border-b-2 border-r-2  p-5 rounded-lg border-gray-200 shadow "
                  >
                    <div className="flex items-center space-x-3 justify-center">
                      <item.icon />
                      <h2>{item.title}</h2>
                    </div>
                    <p className="text-sm text-center">{item.value}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/* Contact Us Email */}
        <div className="flex justify-center w-full lg:w-7/12 mx-auto">
          <div className="w-full  mt-5 lg:mt-0">
            <div className="text-center space-y-1 mb-2">
              <h2 className="text-xl font-semibold text-common-600">
                Facing any issue?
              </h2>
              <p className="mb-6 text-sm">Feel free to contact us</p>
            </div>
            <div className="select-none border-[0.1px] border-b-2 border-r-2  p-5 rounded-lg border-gray-200 shadow-md ">
              <QForm
                onSubmit={onSubmit}
                resolver={zodResolver(sendEmailSchema)}
              >
                <div className="grid gap-6">
                  <QInput name="name" label="Enter Name" type="text" />
                  <QInput name="email" label="Enter Email" type="email" />
                  <QInput
                    name="message"
                    label="Enter Your Message"
                    type="textarea"
                    rows={6}
                  />
                </div>
                <div>
                  <FilledButton
                    buttonText="Send Email"
                    type="submit"
                    className="mt-10"
                    isLoading={emailSendLoading}
                  />
                </div>
              </QForm>
            </div>
          </div>
        </div>
      </div>
    </OpacityMotion>
  );
};

export default Contact;
