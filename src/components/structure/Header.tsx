import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/pixelact-ui/menubar";
import { HashLink } from 'react-router-hash-link';
import Logo from "@/assets/logo/Isotipo.png";
import "./Header.scss";

function Header() {
    return (
        <header className="header">
            <nav className="nav">
                <Menubar>
                    <HashLink to="/#about"><img src={Logo} alt="logo" /></HashLink>
                    <MenubarMenu>
                        <MenubarTrigger>
                            <HashLink to="/#about">About</HashLink>
                        </MenubarTrigger>
                    </MenubarMenu>
                    <MenubarMenu>
                        <MenubarTrigger>
                            <HashLink to="/#skills">Skills</HashLink>  
                        </MenubarTrigger>
                    </MenubarMenu>
                    <MenubarMenu>
                        <MenubarTrigger>
                            <HashLink to="/#projects">Projects</HashLink>
                        </MenubarTrigger>
                    </MenubarMenu>
                    <MenubarMenu>
                        <MenubarTrigger>
                            <HashLink to="/#education">Education</HashLink>
                        </MenubarTrigger>
                    </MenubarMenu>
                    <MenubarMenu>
                        <MenubarTrigger>
                            <HashLink to="/#contact">Contact</HashLink>
                        </MenubarTrigger>
                    </MenubarMenu>
                </Menubar>
            </nav>
        </header>
    );
}

export default Header;