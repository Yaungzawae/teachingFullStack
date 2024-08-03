import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

import { Separator } from "@/components/ui/separator"



import logo from "../../../assets/logo.png"
import bg from "../../../assets/nav-bg.jpg"
import { Link } from "react-router-dom"

function NavBar() {

  return (
    <div className="w-full h-[10vh] min-h-28  bg-[url('./assets/nav-bg.jpg')] bg-cover bg-repeat-x bg-center ">
      <div className="max-w-[1200px] h-[10vh] min-h-28 mx-auto flex flex-row justify-between text-white">

        <Link to="/" className="ml-4 max-w-24 my-auto">
          <img src={logo} />
        </Link>

        <div className="my-auto flex-row gap-5 mr-4 text-lg hidden sm:flex">

          <Link to="./classes"> Classes </Link>
          <Separator orientation="vertical" className="bg-white text-white h-auto" />
          <Link to="./classes"> Others </Link>

          <Separator orientation="vertical" className="bg-white text-white h-auto" />
          <HoverCard openDelay="10ms" closeDelay="200">
            <HoverCardTrigger className="select-none cursor-pointer">Account</HoverCardTrigger>
            <HoverCardContent className="flex flex-col gap-2 text-center">
              <Link to="/login/teacher">Login for Teachers</Link>
              <Separator className="bg-black my-1" />
              <Link to="/login">Login For Students</Link>
              <Separator />
              <Link to="/register">Register For Students</Link>
            </HoverCardContent>
          </HoverCard>
        </div>

        <div className="my-auto mr-4 block sm:hidden">
          <Popover>
            <PopoverTrigger>
              <FontAwesomeIcon icon={faBars} size="2x" />
            </PopoverTrigger>
            <PopoverContent className="w-28">
              <div className="flex flex-col gap-3 text-center">
                <Popover openDelay="10ms" closeDelay="200">
                  <PopoverTrigger className="select-none cursor-pointer">Account</PopoverTrigger>
                  <PopoverContent className="flex flex-col gap-2 text-center">
                    <Link to="/login/teacher">Login for Teachers</Link>
                    <Separator className="bg-black my-1" />
                    <Link to="/login">Login For Students</Link>
                    <Separator />
                    <Link to="/register">Register For Students</Link>
                  </PopoverContent>
                </Popover>
                <a href="./">Link 2</a>
                <a href="./">Link 3</a>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  )
}

export default NavBar;
