import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSnowflake,
  faTv,
  faTemperatureHigh,
  faMugHot,
  faShirt,
  faWheelchair,
  faBell,
  faPhone,
  faChair,
} from "@fortawesome/free-solid-svg-icons";

export default function Amenities() {
  return (
    <div className="py-4 text-white">
      <h2 className="text-3xl font-semibold text-yellow-100 font-dm  leading-tight text-shadow-sm mb-2">
        Explore Amenities
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Amenity icon={faSnowflake} label="Air Conditioner" />
        <Amenity icon={faTv} label="Flat-Screen TV" />
        <Amenity icon={faTemperatureHigh} label="Mini Refrigerator" />
        <Amenity icon={faMugHot} label="Coffee and Tea Station" />
        <Amenity icon={faChair} label="Study Table" />
        <Amenity icon={faShirt} label="Iron and Ironing Board" />
        <Amenity icon={faWheelchair} label="Wheel Chair Access" />
        <Amenity icon={faBell} label="Alarm Clock" />
        <Amenity icon={faPhone} label="Telephone" />
      </div>
    </div>
  );
}

/* ================= SINGLE AMENITY ================= */

function Amenity({ icon, label }: any) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg hover:animate-bounce transition">
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-black">
        <FontAwesomeIcon icon={icon} />
      </div>
      <p className="font-semibold font-dm">{label}</p>
    </div>
  );
}
