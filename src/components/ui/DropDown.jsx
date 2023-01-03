import { Menu } from "@headlessui/react";
import profileImage from "../../../public/assets/profile.png";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../../store/auth/thunks";

export const DropDown = () => {
  const dispatch = useDispatch();
  const { displayName } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(startLogout());
  };
  return (
    <Menu>
      <Menu.Button className="mr-2 lg:ml-8 md:ml-8 flex cursor-pointer ">
        <img className="h-16 w-16" src={profileImage} />
      </Menu.Button>
      <Menu.Items className="flex flex-col shadow-lg rounded p-3 absolute md:right-1 md:top-[80px]  border border-[#7f00ff] bg-white md">
        <Menu.Item>
          {({ active }) => (
            <div
              className={`${
                active && "bg-[#7f00ff] bg-opacity-25"
              }  text-black cursor-pointer my-2 flex gap-2`}
            >
              <div className={`${active && " text-black "}`}>
                <FontAwesomeIcon icon={faUser} className="text-[#7f00ff]" />
              </div>
              <div className={`${active && " text-black "}`}>{displayName}</div>
            </div>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <div
              onClick={onLogout}
              className={`${
                active && "bg-[#7f00ff] bg-opacity-25"
              }  text-black cursor-pointer flex gap-2`}
            >
              <div className={`${active && " text-black "}`}>
                <FontAwesomeIcon
                  icon={faRightFromBracket}
                  className="text-[#7f00ff]"
                />
              </div>
              <div className={`${active && " text-black "}`}>Cerrar Sesion</div>
            </div>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
};
