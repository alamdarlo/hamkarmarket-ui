import { IconButton, Menu, MenuItem } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useEffect, useState } from "react";
import { SignInModal } from "../modals/SignInModal";
import { RegisterModal } from "../modals/RegisterModal";


export default function Avatar() {
  const [signInOpen, setSignInOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [userLogdein, setuserLogdein] = useState<boolean>(false);

  useEffect(() => {
    setuserLogdein(false);
  }, []);

  const handleSignInOpen = () => {
    setSignInOpen((prev) => !prev);
    //console.log("first:" + signInOpen);
  };

  const handleRegisterationOpen = () => {
    setRegisterOpen((prev) => !prev);
    //console.log("first:" + signInOpen);
  };

  const handleRegisterMenuOpen = () => {
    setRegisterOpen(true);
    setSignInOpen(false);
    //console.log("first:" + registerOpen);
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleExit = () => {
    handleClose();
    localStorage.removeItem("token");
    setuserLogdein(false);
  };

  const successLoginResult = (e: boolean) => {
    setuserLogdein(e);
    if (e) {
      setSignInOpen(false);
    }
  };

  const successRegisterationResult = (e: boolean) => {
    if (e) {
      setRegisterOpen(false);
    }
  };

  

  return (
    <>
      <div className="flex flex-row justify-center">
        <div
          className={
            userLogdein == true
              ? "flex-col flex  ml-4 w-24  text-center items-center"
              : "hidden"
          }
        >
          <IconButton
            className="flex flex-col flex-1 -mt-2 p-1"
            sx={{
              fontSize: "xx-large",
              "& .MuiSvgIcon-root": { fontSize: "xxx-large" },
            }}
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            onClick={handleClick}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>

          <span
            className="flex flex-1 text-center -mt-3 size-12 w-auto text-xs"
            style={{ fontSize: "small", textAlign: "center" }}
          >
            علمدارلو کرامت
          </span>
        </div>

        <div
          className={
            !userLogdein == true
              ? "flex-col flex  ml-4 w-24  text-center items-center"
              : "hidden"
          }
        >
          <IconButton
            className="flex flex-col flex-1  -mt-2 p-1 "
            sx={{
              fontSize: "xx-large",
              "& .MuiSvgIcon-root": { fontSize: "xxx-large" },
            }}
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            onClick={handleSignInOpen}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </div>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
            className: "w-28",
          }}
        >
          <MenuItem onClick={handleClose} sx={{}}>
            پروفایل
          </MenuItem>
          <MenuItem onClick={handleClose}>تغییر رمز</MenuItem>
          <MenuItem onClick={handleExit}>خروج </MenuItem>
        </Menu>

        <SignInModal
          open={signInOpen}
          handleProfileMenuOpen={handleSignInOpen}
          isLoginResultSuccess={(e) => successLoginResult(e)}
          handleRegisterMenuOpen = {handleRegisterMenuOpen}
        />
        <RegisterModal
          open={registerOpen}
          isLoginResultSuccess={(e) => successRegisterationResult(e)}
          handleRegisterModalOpen = {handleRegisterationOpen}
        />


      </div>
    </>
  );
}
