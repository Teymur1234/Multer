import React from "react";

// Icons
import Logo from "../../Images/Logo.png";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store.ts";
import { AppDispatch } from "../../store/store.ts";
import { setUser } from "../../slices/user.slice.ts";


const Header: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  const logOut = () => {
    dispatch(setUser({   email: "",
    userName: "",
    profilePic: "",
    balance: 0,
    _id: "" }));
  }

  return (
    <header className="flex justify-between gap-2">
      <div>
        <img className="h-10 w-10 rounded-lg" src={Logo} alt="logo" />
      </div>
      {user.email && (
        <div className="flex gap-4">
          <button onClick={logOut} className=" bg-lightOrange text-white p-2 rounded-xl hover:scale-95 transition-all duration-200">
            Log out
          </button>
          <div>
            <img
              className="h-10 w-10 rounded-full"
              src={`http://localhost:8000/${user.profilePic}`}
              alt=""
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
