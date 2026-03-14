import HybitLogo from "./HybitLogo";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <HybitLogo className="footer__logo-icon" />
                <span
                    className="footer__text"
                    style={{ fontFamily: "var(--font-montserrat)" }}
                >
                    hybit.
                </span>
            </div>
        </footer>
    );
}
