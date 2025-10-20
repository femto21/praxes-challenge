import { FaUserDoctor } from "react-icons/fa6";

const RoleToggle = () => {
  return (
    <label className="toggle text-base-content toggle-xl">
      <input type="checkbox" />
      <FaUserDoctor />

      <img src="patient.png" />
    </label>
  );
};

export default RoleToggle;
