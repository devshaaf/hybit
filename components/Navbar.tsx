"use client";

import { useEffect, useState, useCallback } from "react";
import HybitLogo from "./HybitLogo";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isDark, setIsDark] = useState(false);

    const updateNavbar = useCallback(() => {
        setIsScrolled(window.scrollY > 60);

        // Check if navbar overlaps dark sections
        const navbar = document.getElementById("navbar");
        if (!navbar) return;
        const navRect = navbar.getBoundingClientRect();

        const darkSections = document.querySelectorAll(".contact, .footer");
        let overDark = false;
        darkSections.forEach((section) => {
            const rect = section.getBoundingClientRect();
            if (rect.top < navRect.bottom && rect.bottom > navRect.top) {
                overDark = true;
            }
        });
        setIsDark(overDark);
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", updateNavbar, { passive: true });
        updateNavbar();
        return () => window.removeEventListener("scroll", updateNavbar);
    }, [updateNavbar]);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const target = document.querySelector("#contact");
        if (target) {
            const offset = 100;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: "smooth" });
        }
    };

    const className = [
        "navbar",
        isDark ? "dark" : isScrolled ? "scrolled" : "",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <nav className={className} id="navbar">
            <div className="container">
                <a href="#" className="navbar__logo" aria-label="hybit Home">
                    <HybitLogo className="navbar__logo-icon" />
                    <span className="navbar__logo-text" style={{ fontFamily: "var(--font-montserrat)" }}>
                        hybit.
                    </span>
                </a>
                <a href="#contact" className="navbar__cta" onClick={handleClick}>
                    Get started
                </a>
            </div>
        </nav>
    );
}
