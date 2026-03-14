"use client";

import { useEffect, useRef } from "react";

export default function Features() {
    const cardRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLDivElement>(null);

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

        if (cardRef.current) observer.observe(cardRef.current);
        if (videoRef.current) observer.observe(videoRef.current);

        return () => observer.disconnect();
    }, []);

    return (
        <section className="features" id="features">
            <div className="container">
                {/* Description Card */}
                <div className="features__card reveal" ref={cardRef}>
                    <p className="features__description">
                        Ein patentiertes System, das ohne Mehraufwand die mentale
                        Leistungsfähigkeit und das gesundheitliche Wohlbefinden Ihrer{" "}
                        <strong>Inbound-Teams</strong> steigert. So erhöhen Sie die
                        Lösungsqualität im Erstkontakt und maximieren Ihre{" "}
                        <strong>First Call Resolution (FCR)</strong>.
                    </p>
                    <br />
                    <p className="features__description">
                        Durch die Vermeidung von Mehrfachkontakten{" "}
                        <strong>sinken Ihre Prozesskosten pro Ticket</strong> bei
                        gleichzeitig höchster Kundenzufriedenheit. Für skalierbare
                        Service-Performance und nachhaltige Kosteneinsparungen.
                    </p>
                </div>

                {/* Video Embed */}
                <div className="features__video-wrapper reveal" ref={videoRef}>
                    <iframe
                        src="https://www.youtube.com/embed/z4aQ-Nf9ryk?rel=0&modestbranding=1"
                        title="hybit NeuraFlow Video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                    />
                </div>
            </div>
        </section>
    );
}
