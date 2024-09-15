import OutlineButton from "@/components/button/OutlineButton";
import useUserInfoFromToken from "@/hook/useUserInfoFromToken";
import "@/styles/singleCart.style.css";
import { TRoom } from "@/types";
import { useNavigate } from "react-router-dom";

const SingleCart = ({ room }: { room: TRoom }) => {
  const userInfo = useUserInfoFromToken();
  const navigate = useNavigate();

  const showRoomDetail = () => {
    if (!userInfo?.email) {
      const confirm = window.confirm("Please login to visit this page.");
      if (confirm) {
        // navigate(`/login?returnUrl=/meeting-room/${room?._id}`);
        navigate("/login", {
          state: { returnUrl: `/meeting-room/${room?._id}` },
        });
      }
    } else {
      navigate(`/meeting-room/${room?._id}`);
    }
  };
  return (
    <div className="max-w-[250px] space-y-4 rounded-lg bg-white p-4 shadow mx-auto singleCartContainer">
      {/* Card Image */}
      <div className="h-[160px] w-full overflow-hidden rounded-md">
        <img
          className="h-full w-full object-cover rounded-md singleCartImage hover:scale-105 "
          src={room?.pictures[0]}
          alt={room?.name}
        />
      </div>
      {/* Card Heading */}
      <div className="space-y-2">
        <h2 className="text-lg font-bold text-slate-800 truncate">
          {room?.name}
        </h2>
        <div className="text-sm text-slate-600 space-y-1">
          <p>
            Price per slot:{" "}
            <span className="font-semibold text-slate-800">
              {room?.pricePerSlot}
            </span>
          </p>
          <p>
            Capacity:{" "}
            <span className="font-semibold text-slate-800">
              {room?.capacity}
            </span>
          </p>
        </div>
      </div>
      {/* Card Details Button */}
      <div onClick={showRoomDetail}>
        <OutlineButton buttonText="Show Details" className="w-full" />
        {/* <NavLink to={`/meeting-room/${room?._id}`}>
        </NavLink> */}
      </div>
    </div>
  );
};

export default SingleCart;
