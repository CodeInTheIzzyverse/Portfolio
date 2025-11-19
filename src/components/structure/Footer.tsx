import "./Footer.scss"
import Githubicon from "@/assets/social/github.png";
import Linkedinicon from "@/assets/social/linkedin.png";
import Whatsappicon from "@/assets/social/whatsapp.png";

function Footer() {
    return (
        <footer className="footer">
            <p className="credits">Made with ❤️ by Isabela Bedoya Gaviria</p>
            <p className="copyright">Copyright © 2025 IB</p>
            <div className="social">
                <a target="_blank" href="https://github.com/CodeInTheIzzyverse" rel="noreferrer"><img src={Githubicon} alt="Github" /></a>
                <a target="_blank" href="https://www.linkedin.com/in/isabela-bedoya-gaviria-168308262/" rel="noreferrer"><img src={Linkedinicon} alt="LinkedIn" /></a>
                <a target="_blank" href="https://wa.me/573194327423" rel="noreferrer"><img src={Whatsappicon} alt="WhatsApp" /></a>
            </div>
        </footer>
    );
}

export default Footer;