import './Fotter.css'; 


const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-sections">
                <div className="footer-column">
                    <h3>Solutions</h3>
                    <ul>
                        <li>AI Art Generator</li>
                        <li>AI Video Generator</li>
                        <li>Transparent PNG Generator</li>
                        <li>AI Marketing Tools</li>
                        <li>AI Graphic Design</li>
                        <li>AI Print on Demand</li>
                        <li>AI Marketing Tools</li>
                        <li>AI Graphic</li>
                        <li>AI Print to th</li>
                        <li>AI Architecture</li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h3>About</h3>
                    <ul>
                        <li>API</li>
                        <li>FAQ</li>
                        <li>Blog</li>
                        <li>Support</li>
                        <li>Contact us</li>
                        <li>Careers</li>
                        <li>AI Art Generator</li>
                        <li>AI Video Generator</li>
                        <li>Transparent PNG Generator</li>
                    </ul>
                </div>
                <div className="footer-column app-links">
                    <h3>Get the App</h3>
                    <div className="app-buttons">
                        <img src="/images/appstore.png" alt="App Store" />
                        <img src="/images/googleplay.png" alt="Google Play" />
                    </div>
                    <h3>Stay Tuned</h3>
                    <div className="social-icons">
                        <img src="/images/facebook.png" alt="App Store" />
                        <img src="/images/instagram.png" alt="Google Play" />
                        <img src="/images/tik-tok.png" alt="Google Play" />
                        <img src="/images/youtube.png" alt="App Store" />
                        <img src="/images/logos.png" alt="Google Play" />
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <img src="/images/profile/1.1.png" alt="SIB Logo" className="footer-logo" />
                <p>© 2025 All Rights Reserved, SIB - Smart Images Battle</p>
                <div className="legal-links">
                    <a href="#">Legal Notice</a> | <a href="#">DMCA</a> | <a href="#">Terms of Service</a> | <a href="#">Cookie Policy</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
