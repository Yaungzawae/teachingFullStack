import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";
import logo from "../../../assets/logo.png";
import { Link } from "react-router-dom";
import { Toggle } from "@/components/ui/toggle"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"


function NavBar() {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language");
    if (storedLanguage) {
      setLanguage(storedLanguage);
    }
  }, []);

  const handleLanguageChange = () => {
    localStorage.setItem("language", language == "en" ? "zh" : "en");
    setLanguage(language == "en" ? "zh" : "en");
    console.log(language);
    window.location.reload(false);
  };

  const currentLang = localStorage.getItem("language");

  return (
    <div className="w-full h-[10vh] min-h-28 bg-[url('./assets/nav-bg.jpg')] bg-cover bg-repeat-x bg-center">
      <div className="max-w-[1200px] h-[10vh] min-h-28 mx-auto flex flex-row justify-between text-white">
        <Link to="/" className="ml-4 max-w-24 my-auto">
          <img src={logo} />
        </Link>

        <div className="my-auto flex-row gap-5 mr-4 text-lg hidden sm:flex items-center">
          <Link to="./profile">
            {currentLang === "en" ? "Profile" : "个人资料"}
          </Link>

          <Separator orientation="vertical" className="bg-white text-white" />

          <HoverCard openDelay="10ms" closeDelay="200">
            <HoverCardTrigger className="select-none cursor-pointer">
              {currentLang === "en" ? "Account" : "账户"}
            </HoverCardTrigger>
            <HoverCardContent className="flex flex-col gap-2 text-center">
              <Link to="/login/teacher">
                {currentLang === "en" ? "Login for Teachers" : "教师登录"}
              </Link>
              <Separator className="bg-black my-1" />
              <Link to="/login">
                {currentLang === "en" ? "Login For Students" : "学生登录"}
              </Link>
              <Separator />
              <Link to="/register">
                {currentLang === "en" ? "Register For Students" : "学生注册"}
              </Link>
            </HoverCardContent>
          </HoverCard>
          <Separator orientation="vertical" className="bg-white text-white h-auto" />

          <Toggle onClick={handleLanguageChange}>
            <p className="text-lg">{currentLang === "en" ? "Chinese" : "中文"}</p>
          </Toggle>
        </div>

        <div className="my-auto mr-4 block sm:hidden">
          <Sheet>
            <SheetTrigger>
              <FontAwesomeIcon icon={faBars} size="2x" />
            </SheetTrigger>
            <SheetContent className="max-w-[400px] w-3/4">
              <SheetHeader>
                <SheetContent>
                  <p onClick={handleLanguageChange}>{currentLang === "en" ? "Chinese" : "中文"}</p>
                  <Separator className="my-4" />

                  <Link to="./profile">
                    {currentLang === "en" ? "Profile" : "个人资料"}
                  </Link>
                  <Separator className="my-4" />

                  <Link to="/login/teacher">
                    {currentLang === "en" ? "Login for Teachers" : "教师登录"}
                  </Link>
                  <Separator className="my-4" />
                  <Link to="/login">
                    {currentLang === "en" ? "Login For Students" : "学生登录"}
                  </Link>
                  <Separator className="my-4" />
                  <Link to="/register">
                    {currentLang === "en" ? "Register For Students" : "学生注册"}
                  </Link>

                </SheetContent>
              </SheetHeader>
            </SheetContent>
          </Sheet>

        </div>

        {/* <div className="my-auto mr-4 block sm:hidden">
          <Popover>
            <PopoverTrigger>
              <FontAwesomeIcon icon={faBars} size="2x" />
            </PopoverTrigger>
            <PopoverContent className="w-28">
              <div className="flex flex-col gap-3 text-center">
                <Popover openDelay="10ms" closeDelay="200">
                  <PopoverTrigger className="select-none cursor-pointer">
                    {currentLang === "en" ? "Account" : "账户"}
                  </PopoverTrigger>
                  <PopoverContent className="flex flex-col gap-2 text-center">
                    <Link to="/login/teacher">
                      {currentLang === "en" ? "Login for Teachers" : "教师登录"}
                    </Link>
                    <Separator className="bg-black my-1" />
                    <Link to="/login">
                      {currentLang === "en" ? "Login For Students" : "学生登录"}
                    </Link>
                    <Separator />
                    <Link to="/register">
                      {currentLang === "en" ? "Register For Students" : "学生注册"}
                    </Link>
                  </PopoverContent>
                </Popover>
                <a href="./">
                  {currentLang === "en" ? "Link 2" : "链接 2"}
                </a>
                <a href="./">
                  {currentLang === "en" ? "Link 3" : "链接 3"}
                </a>
              </div>
            </PopoverContent>
          </Popover>
        </div> */}
      </div>
    </div>
  );
}

export default NavBar;