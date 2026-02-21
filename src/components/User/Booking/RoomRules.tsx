import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faDoorClosed,
  faSmokingBan,
  faBed,
  faPaw,
  faWaterLadder,
} from "@fortawesome/free-solid-svg-icons";

export default function RoomRules() {
  return (
    <div className=" text-white py-4">
      <h2 className="text-3xl font-semibold text-yellow-100 font-dm  leading-tight text-shadow-sm mb-2">
        Our Room Rules
      </h2>

      <ul className="space-y-6 mt-5 ml-3">
        <Rule
          icon={faClock}
          title="Check-in Time"
          description="From 2:00 PM"
        />

        <Rule
          icon={faDoorClosed}
          title="Check-out Time"
          description="By 12:00 PM"
        />

        <Rule
          icon={faWaterLadder}
          title="Swimming Pool"
          description="Pool time  11 Am to  10 pm Proper pool dress must."
        />

        <Rule
          icon={faSmokingBan}
          title="Smoking Policy"
          description="All rooms are non-smoking."
        />

        <Rule
          icon={faBed}
          title="Extra Amenities"
          description="Requests for extra bedding, baby cots, or amenities."
        />

        <Rule
          icon={faPaw}
          title="Pets"
          description="Pets are not allowed."
        />
        <Rule
          icon={faClock}
          title="Early / Late Check-in"
          description="Subject to availability and may incur additional charges."
        />
      </ul>
    </div>
  );
}

/* ================= SINGLE RULE ================= */

function Rule({ icon, title, description }: any) {
  return (
    <li className="flex items-start gap-4">
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-black">
        <FontAwesomeIcon icon={icon} />
      </div>

      <div>
        <p className="font-semibold font-dm">{title}</p>
        <p className="text-yellow-100 text-sm font-dm">{description}</p>
      </div>
    </li>
  );
}
