import React from "react";
import { Link } from "react-router-dom";

import {
    Navbar,
    Collapse,
    Typography,
    IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

function NavList() {
    return (
        <ul className="  my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <li className="p-1 font-medium">
                <Link to="/" className="flex items-center hover:text-blue-500 transition-colors">
                    Home
                </Link>
            </li>
            <li className="p-1 font-medium">
                <Link to="/tos" className="flex items-center hover:text-blue-500 transition-colors">
                    Terms
                </Link>
            </li>
            <li className="p-1 font-medium">
                <Link to="/blocks" className="flex items-center hover:text-blue-500 transition-colors">
                    Blocks
                </Link>
            </li>
            <li className="p-1 font-medium">
                <Link to="/docs" className="flex items-center hover:text-blue-500 transition-colors">
                    Docs
                </Link>
            </li>
        </ul>
    );
}
export function NavbarSimple() {
    const [openNav, setOpenNav] = React.useState(false);

    const handleWindowResize = () =>
        window.innerWidth >= 960 && setOpenNav(false);

    React.useEffect(() => {
        window.addEventListener("resize", handleWindowResize);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);

    return (
        <Navbar className="mb-3 mx-auto max-w-screen-xl px-6 py-3">
            <div className="flex items-center justify-between text-blue-gray-900">
                <Typography
                    as="a"
                    href="#"
                    variant="h6"
                    className="mr-4 cursor-pointer py-1.5"
                >
                    Material Tailwind
                </Typography>
                <div className="hidden lg:block">
                    <NavList />
                </div>
                <IconButton
                    variant="text"
                    className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                    ripple={false}
                    onClick={() => setOpenNav(!openNav)}
                >
                    {openNav ? (
                        <XMarkIcon className="h-6 w-6" strokeWidth={2} />
                    ) : (
                        <Bars3Icon className="h-6 w-6" strokeWidth={2} />
                    )}
                </IconButton>
            </div>
            <Collapse open={openNav}>
                <NavList />
            </Collapse>
        </Navbar>
    );
}