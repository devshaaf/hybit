"use client";

import { useState, useEffect, useRef, FormEvent } from "react";

export default function Contact() {
    const [submitted, setSubmitted] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const formWrapperRef = useRef<HTMLDivElement>(null);

    // Reveal animation
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
        );

        if (headingRef.current) observer.observe(headingRef.current);
        if (formWrapperRef.current) observer.observe(formWrapperRef.current);

        return () => observer.disconnect();
    }, []);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());
        console.log("Contact form submitted:", data);

        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 5000);
    };

    return (
        <section className="contact" id="contact" ref={sectionRef}>
            <div className="container">
                <h2
                    className="contact__heading reveal"
                    ref={headingRef}
                    style={{ fontFamily: "var(--font-inter)" }}
                >
                    Kontakt
                </h2>

                {!submitted ? (
                    <div ref={formWrapperRef} className="reveal">
                        <form className="contact__form" onSubmit={handleSubmit}>
                            <div className="contact__row">
                                <div className="contact__field">
                                    <label className="contact__label" htmlFor="contact-name">
                                        Name
                                    </label>
                                    <input
                                        className="contact__input"
                                        type="text"
                                        id="contact-name"
                                        name="Name"
                                        placeholder="Jane Smith"
                                        required
                                    />
                                </div>
                                <div className="contact__field">
                                    <label className="contact__label" htmlFor="contact-email">
                                        Email
                                    </label>
                                    <input
                                        className="contact__input"
                                        type="email"
                                        id="contact-email"
                                        name="Email"
                                        placeholder="jane@framer.com"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="contact__field">
                                <label className="contact__label" htmlFor="contact-message">
                                    Message
                                </label>
                                <textarea
                                    className="contact__textarea"
                                    id="contact-message"
                                    name="Message"
                                    placeholder="Your message..."
                                    required
                                />
                            </div>
                            <button className="contact__submit" type="submit">
                                Submit
                            </button>
                        </form>
                    </div>
                ) : (
                    <div
                        className="contact__success show"
                        style={{ display: "block" }}
                    >
                        <h3>✓ Nachricht gesendet!</h3>
                        <p>Wir melden uns in Kürze bei Ihnen.</p>
                    </div>
                )}
            </div>
        </section>
    );
}
