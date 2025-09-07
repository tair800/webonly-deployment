import React from 'react';
import logoWhite from '/assets/logo-white.png';
import footerLogo from '/assets/footer-new.png';
import nextIcon from '/assets/next.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube, faFacebookF, faXTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faLocationDot, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-col footer-col-left">
                    <div className="footer-logo-row">
                        <img src={logoWhite} alt="Logo White" className="footer-logo-white" />
                    </div>
                    <p className="footer-desc">Şirkət yeni standartlarla proqram təminatı satışı və servisi həyata keçirən proqramlaşdırma şirkətidir.</p>
                    <form className="footer-email-form">
                        <input type="email" placeholder="Email daxil edin" className="footer-email-input" />
                        <button type="submit" className="footer-email-btn">
                            <img src={nextIcon} alt="Next" className="footer-email-btn-arrow" />
                        </button>
                    </form>
                    <div className="footer-socials">
                        <a href="#" aria-label="YouTube"><FontAwesomeIcon icon={faYoutube} /></a>
                        <a href="#" aria-label="Facebook"><FontAwesomeIcon icon={faFacebookF} /></a>
                        <a href="#" aria-label="X"><FontAwesomeIcon icon={faXTwitter} /></a>
                        <a href="#" aria-label="Instagram"><FontAwesomeIcon icon={faInstagram} /></a>
                        <a href="#" aria-label="LinkedIn"><FontAwesomeIcon icon={faLinkedinIn} /></a>
                    </div>
                    <hr className="footer-divider" />
                    <div className="footer-meta-row">
                        <div className="footer-madeby">Veb-sayt Webonly tərəfindən hazırlanıb.</div>
                        <div className="footer-copyright">Copywrite @2025. Bütün hüquqlar qorunur.</div>
                    </div>
                </div>

                <div className="footer-col footer-col-center">
                    <h3 className="footer-title">Məhsullar</h3>
                    <ul className="footer-links">
                        <li>Ticarət və Anbar</li>
                        <li>Market</li>
                        <li>Ticarət və Anbar</li>
                        <li>Restoran idarəetmə modulu</li>
                        <li>Tekstil Modulu</li>
                        <li>Kredit və Lombard</li>
                        <li>Mobil Satış</li>
                        <li>Aptek idarəetmə modulu</li>
                        <li>İstehsal idarəetmə modulu</li>
                    </ul>
                </div>

                <div className="footer-col footer-col-right">
                    <h3 className="footer-title">Əlaqə</h3>
                    <ul className="footer-contact">
                        <li><FontAwesomeIcon icon={faLocationDot} className="footer-contact-icon" /> Baku, Azerbaijan</li>
                        <li><FontAwesomeIcon icon={faPhone} className="footer-contact-icon" /> +994 xx xxx xx xx<br />+994 xxx xx xx</li>
                        <li><FontAwesomeIcon icon={faEnvelope} className="footer-contact-icon" /> example@mail.az</li>
                    </ul>
                </div>
                <img src={footerLogo} alt="Footer Decorative" className="footer-bg-img" />
            </div>
        </footer>
    );
}

export default Footer; 
