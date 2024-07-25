import React, { useEffect, useState } from "react";
import { getRoles } from "../../http/taskAPI";
import RadioInput from "../atoms/input-radio";
import FifthTitle from "../atoms/h5";

function ListRoles({ setRole }) {
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");

  useEffect(() => {
    const fetchRoles = async () => {
      const rolesData = await getRoles();
      setRoles(rolesData);
    };

    fetchRoles();
  }, []);

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
    setRole(event.target.value);
  };

  return (
    <div>
      <FifthTitle value="Направление:" />
      <form>
        {roles.map((role, index) => (
          <div key={index}>
            <RadioInput
              key={index}
              type="radio"
              id={`role-${index}`}
              name="role"
              value={role}
              checked={selectedRole === role}
              onChange={handleRoleChange}
            />
          </div>
        ))}
      </form>
    </div>
  );
}

export default ListRoles;
