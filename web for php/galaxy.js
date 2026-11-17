(() => {
    "use strict";

    const canvas = document.getElementById("galaxy-background");
    const toggle = document.getElementById("motion-toggle");

    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const nebula = document.createElement("canvas");
    const nebulaCtx = nebula.getContext("2d");
    if (!nebulaCtx) return;

    const motionPreference = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    let width = 0;
    let height = 0;
    let stars = [];
    let particles = [];

    let frameId = null;
    let previousTime = null;
    let elapsed = 0;
    let paused = motionPreference.matches;

    function addCloud(x, y, radius, color) {
        const gradient = nebulaCtx.createRadialGradient(
            x, y, 0,
            x, y, radius
        );

        gradient.addColorStop(0, color);
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        nebulaCtx.fillStyle = gradient;
        nebulaCtx.fillRect(0, 0, width, height);
    }

    function resize() {
        width = Math.max(1, window.innerWidth);
        height = Math.max(1, window.innerHeight);

        const pixelRatio = Math.min(
            window.devicePixelRatio || 1,
            2
        );

        canvas.width = Math.round(width * pixelRatio);
        canvas.height = Math.round(height * pixelRatio);

        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

        nebula.width = width;
        nebula.height = height;

        nebulaCtx.fillStyle = "#030510";
        nebulaCtx.fillRect(0, 0, width, height);

        const size = Math.max(width, height);

        addCloud(
            width * 0.75,
            height * 0.3,
            size * 0.55,
            "rgba(97, 35, 165, 0.4)"
        );

        addCloud(
            width * 0.15,
            height * 0.8,
            size * 0.5,
            "rgba(20, 65, 155, 0.35)"
        );

        const starCount = Math.min(
            450,
            Math.floor(width * height / 2500)
        );

        stars = Array.from({ length: starCount }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: 0.4 + Math.random() * 1.1,
            phase: Math.random() * Math.PI * 2,
            speed: 0.4 + Math.random() * 1.1
        }));

        const particleCount = width < 600 ? 700 : 1300;
        const galaxyRadius = Math.min(
            width * 0.75,
            height * 0.85
        );

        particles = Array.from(
            { length: particleCount },
            (_, index) => {
                const distance = Math.pow(Math.random(), 0.7);
                const arm = (index % 4) * Math.PI / 2;

                return {
                    radius: distance * galaxyRadius,
                    angle:
                        arm +
                        distance * 7 +
                        (Math.random() - 0.5) * 0.65,
                    size: 0.4 + Math.random() * 1.1,
                    alpha: 0.2 + Math.random() * 0.65,
                    color: distance < 0.2
                        ? "#fff0db"
                        : index % 3 === 0
                            ? "#c69bff"
                            : "#98cfff"
                };
            }
        );

        draw();
    }

    function draw() {
        ctx.globalAlpha = 1;
        ctx.drawImage(nebula, 0, 0);

        // Background stars.
        for (const star of stars) {
            ctx.globalAlpha =
                0.35 +
                0.6 * (
                    0.5 +
                    0.5 * Math.sin(
                        elapsed * star.speed + star.phase
                    )
                );

            ctx.fillStyle = "#e5edff";
            ctx.beginPath();

            ctx.arc(
                star.x,
                star.y,
                star.radius,
                0,
                Math.PI * 2
            );

            ctx.fill();
        }

        // Galaxy position and tilt.
        ctx.globalAlpha = 1;
        ctx.save();
        ctx.translate(width * 0.67, height * 0.4);
        ctx.rotate(-0.35);

        // Soft light at the center.
        const coreRadius = Math.min(width, height) * 0.22;

        const core = ctx.createRadialGradient(
            0, 0, 0,
            0, 0, coreRadius
        );

        core.addColorStop(
            0,
            "rgba(255, 235, 220, 0.5)"
        );

        core.addColorStop(
            0.18,
            "rgba(186, 145, 255, 0.28)"
        );

        core.addColorStop(
            1,
            "rgba(80, 40, 150, 0)"
        );

        ctx.fillStyle = core;

        ctx.fillRect(
            -coreRadius,
            -coreRadius,
            coreRadius * 2,
            coreRadius * 2
        );

        // Slowly rotating spiral arms.
        const rotation = elapsed * 0.018;

        for (const particle of particles) {
            const angle = particle.angle + rotation;

            const x = Math.cos(angle) * particle.radius;
            const y =
                Math.sin(angle) * particle.radius * 0.48;

            ctx.globalAlpha = particle.alpha;
            ctx.fillStyle = particle.color;
            ctx.beginPath();

            ctx.arc(
                x,
                y,
                particle.size,
                0,
                Math.PI * 2
            );

            ctx.fill();
        }

        ctx.restore();
        ctx.globalAlpha = 1;
    }

    function animate(timestamp) {
        if (previousTime !== null) {
            elapsed += Math.min(
                (timestamp - previousTime) / 1000,
                0.05
            );
        }

        previousTime = timestamp;
        draw();

        frameId = requestAnimationFrame(animate);
    }

    function updateAnimation() {
        if (frameId !== null) {
            cancelAnimationFrame(frameId);
            frameId = null;
        }

        previousTime = null;

        if (toggle) {
            toggle.textContent = paused
                ? "Resume galaxy"
                : "Pause galaxy";

            toggle.setAttribute(
                "aria-pressed",
                String(paused)
            );
        }

        // Stop animation while the browser tab is hidden.
        if (!paused && !document.hidden) {
            frameId = requestAnimationFrame(animate);
        } else {
            draw();
        }
    }

    if (toggle) {
        toggle.hidden = false;

        toggle.addEventListener("click", () => {
            paused = !paused;
            updateAnimation();
        });
    }

    motionPreference.addEventListener("change", (event) => {
        paused = event.matches;
        updateAnimation();
    });

    document.addEventListener(
        "visibilitychange",
        updateAnimation
    );

    window.addEventListener("resize", resize);

    resize();
    updateAnimation();
})();