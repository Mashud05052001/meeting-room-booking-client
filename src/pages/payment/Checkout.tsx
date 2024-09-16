import FilledButton from "@/components/button/FilledButton";
import ScrollToTopContainer from "@/components/container/ScrollToTopContainer";
import MainLoading from "@/components/loading/MainLoading";
import useUserInfoFromToken from "@/hook/useUserInfoFromToken";
import { useGetUserQuery } from "@/redux/features/auth/auth.api";
import { useMakePaymentMutation } from "@/redux/features/payment/payment.api";
import { useGetMultipleSlotsQuery } from "@/redux/features/roomSlotManagement/roomSlotManagement.api";
import { TError, TTokenUser } from "@/types";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";

const Checkout = () => {
  const [makePayment, { isLoading: paymentProcessLoading }] =
    useMakePaymentMutation();
  const [selectedPaymentOption, setSelectedPaymentOption] = useState<
    "stripe" | "" | "sslcommertz" | "aamarPay"
  >("");
  const [error, setError] = useState(false);
  const userTokenInfo = useUserInfoFromToken();
  const { state } = useLocation();
  const { slotsId } = state as {
    slotsId: string[];
  };
  const { data: userData, isLoading: userDataLoading } = useGetUserQuery({
    email: (userTokenInfo as TTokenUser).email!,
  });
  const { data: roomSlotsData, isLoading: roomSlotsDataLoading } =
    useGetMultipleSlotsQuery(slotsId);

  if (userDataLoading || roomSlotsDataLoading) {
    return <MainLoading />;
  }

  const slotsTime = roomSlotsData?.slots
    ?.map((slot) => `${slot.startTime}-${slot.endTime}`)
    ?.join(", ");

  const userInfo = userData?.data;
  const room = roomSlotsData?.room;
  const date = roomSlotsData?.slots[0].date;
  const pricePerSlot = room?.pricePerSlot as number;
  const totalAmount = pricePerSlot * (roomSlotsData?.slots.length as number);

  const handlePayment = async () => {
    if (selectedPaymentOption === "") {
      setError(true);
      toast.error("Please select a payment option");
      return;
    }
    if (selectedPaymentOption === "stripe") {
      toast.error("Stripe will be implemented soon");
      return;
    }
    const loadingId = toast.loading("Payment processing...");
    const bookingsData = {
      room: room?._id,
      date: date,
      slots: slotsId,
      user: userData?.data._id,
      totalAmount,
      isConfirmed: "unconfirmed",
      isDeleted: false,
      customerName: userInfo?.name,
      customerEmail: userInfo?.email,
      customerPhone: userInfo?.phone,
      cancleUrl: `${import.meta.env.VITE_FRONTEND_URL}/meeting-room/${
        room?._id
      }?status=payment_canceled`,
    };
    try {
      const payment = await makePayment(bookingsData).unwrap();
      window.location.href = payment?.data;
    } catch (error) {
      const slotsBookedMessage = "Slots with ";
      const errorMessage = (error as TError)?.data?.message;
      if (errorMessage.includes(slotsBookedMessage)) {
        const bookedSlots: string[] = [];
        const slotsMessage = errorMessage?.split("ID: ")[1];
        slotsMessage.split(",").map((slotId) => bookedSlots.push(slotId));
        const slotsTime = bookedSlots
          ?.map((bookedSlotId) => {
            const singleSlotData = roomSlotsData?.slots.find(
              (slotData) => bookedSlotId === slotData?._id
            );
            if (singleSlotData) {
              return `${singleSlotData?.startTime}-${singleSlotData?.endTime}`;
            }
          })
          .join(", ");
        toast.error(`This "${slotsTime}" slots are already booked or deleted`, {
          id: loadingId,
        });
        return;
      }
      toast.error(`Payment Failed. ${errorMessage}`, { id: loadingId });
    }
  };

  return (
    <ScrollToTopContainer scrollBehaviour="instant" className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Checkout</h1>

      {/* Checkout Form */}
      <div className="mb-6 p-6 px-4 md:px-8 border border-gray-200 rounded-lg shadow-md  md:min-w-[40rem] md:w-[44rem] md:max-w-[70rem] space-y-5">
        <h1 className="text-2xl font-semibold">Booking Information </h1>
        {/* Booking Information */}
        <div className="grid md:grid-cols-2 ml-5 space-y-4 md:space-y-0">
          {/* Room Information */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Room Info</h2>
            <div className="space-y-2 ml-3 md:ml-0">
              <div className="flex">
                <div className="w-[65px] font-medium">Name:</div>
                {room?.name}
              </div>
              <div className="flex">
                <div className="w-[65px] font-medium">Date:</div>
                {date}
              </div>
              <div className="flex">
                <div className="min-w-[65px] font-medium">Time:</div>
                <div className="max-w-[220px]">{slotsTime}</div>
              </div>
              <div className="flex">
                <div className="w-[120px] font-medium">Price per slot:</div>$
                {pricePerSlot}
              </div>
              <div className="flex">
                <div className="w-[120px] font-medium">Total cost:</div>$
                {totalAmount}
              </div>
            </div>
          </div>
          {/* User Information */}
          <div>
            <h2 className="text-xl font-semibold mb-4">User Info</h2>
            <div className="space-y-2 ml-3 md:ml-0">
              <div className="flex">
                <div className="w-[80px] font-medium">Name:</div>{" "}
                {userInfo?.name}
              </div>
              <div className="flex">
                <div className="w-[80px] font-medium">Email:</div>{" "}
                {userInfo?.email}
              </div>
              <div className="flex">
                <div className="w-[80px] font-medium">Phone:</div>{" "}
                {userInfo?.phone}
              </div>
              <div className="flex">
                <div className="w-[80px] font-medium">Address:</div>{" "}
                {userInfo?.address}
              </div>
            </div>
          </div>
        </div>
        {/* Payment Selection Options */}
        <div className="mb-6 pt-2">
          <h2 className="text-2xl font-semibold mb-4">Payment Options</h2>
          {/* <PaymentOptions /> */}
          <div className="ml-5">
            <div className="flex items-center flex-row sm:space-x-5 sm:items-center relative">
              <h3 className="font-medium mb-3 pt-2 mr-6 sm:mr-0">
                Select Payment:
              </h3>
              <div className="flex space-x-3">
                <div
                  className={`border-2 flex items-center  rounded-md ${
                    selectedPaymentOption === "stripe"
                      ? "border-common-700"
                      : ""
                  }`}
                  onClick={() => {
                    setError(false);
                    setSelectedPaymentOption("stripe");
                  }}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="stripe"
                    className="appearance-none"
                  />
                  <label className="px-3 py-1 cursor-pointer hover:bg-gray-100 duration-100 rounded-md">
                    Stripe
                  </label>
                </div>
                <div
                  className={`border-2 flex items-center  rounded-md ${
                    selectedPaymentOption === "aamarPay"
                      ? "border-common-700"
                      : ""
                  }`}
                  onClick={() => {
                    setError(false);
                    setSelectedPaymentOption("aamarPay");
                  }}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="aamarPay"
                    className="appearance-none"
                  />
                  <label className="px-3 py-1 cursor-pointer hover:bg-gray-100 duration-100 rounded-md">
                    aamarPay
                  </label>
                </div>
                {error && (
                  <small className="absolute -bottom-4 -left-3.5 text-red-600 font-semibold">
                    *Payment method required
                  </small>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Confirm Payment Button */}
        <div
          className="mb-6 pt-6"
          onClick={() => {
            if (!paymentProcessLoading) {
              console.log("object");
              handlePayment();
            }
          }}
        >
          <FilledButton
            type="button"
            buttonText="Confirm Payment"
            isLoading={paymentProcessLoading}
          />
        </div>
      </div>
    </ScrollToTopContainer>
  );
};

export default Checkout;
