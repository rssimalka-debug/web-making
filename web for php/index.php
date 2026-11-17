<?php
// change personal details here.
$name ="Imalka keshan";
$role ="University Student & web Development Learner";

$about = "Hello! I'am Imalka. i enjoy learning programming,
buliding website,and turning creative ideasd into practical projects.";

$university = "University of vocational TEchnology";
$education = "University Student";


$skills= [

    ["name" => "HTML", "icon" => "html5.png"],
    ["name" => "CSS", "icon" => "css3.png"],
    ["name" => "PHP", "icon" => "php.png"],
    ["name" => "Java", "icon" => "js.png"],
    ["name" => "C++", "icon" => "c++.png"]
   
];

// Safely display text inside HTML.
function escape(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES, "UTF-8");
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <meta
        name="description"
        content="Personal website of <?= escape($name) ?>"
    >

    <title><?= escape($name) ?> | Personal Website</title>

    <!-- Connect CSS -->
    <link rel="stylesheet" href="style.css">

    <!-- Connect JavaScript; run after HTML is ready -->
    <script src="galaxy.js" defer></script>
</head>

<body>
    <canvas id="galaxy-background" aria-hidden="true"></canvas>

    <a class="skip-link" href="#main">Skip to content</a>

    <header class="navbar">
        <a href="#home" class="logo">
            Imalka<span>.</span>
        </a>

        <nav aria-label="Main navigation">
            <a href="#about">About</a>
            <a href="#education">Education</a>
            <a href="#skills">Skills</a>
        </nav>
    </header>

    <main id="main">
        <section class="hero" id="home" aria-labelledby="hero-title">
            <div class="hero-text">
                <p class="eyebrow">WELCOME TO MY UNIVERSE</p>

                <h1 id="hero-title">
                    Hi, I'm
                    <span><?= escape($name) ?></span>
                </h1>

                <p class="role"><?= escape($role) ?></p>

                <p class="intro">
                    Exploring technology, learning every day,
                    and creating something of my own.
                </p>

                <div class="hero-actions">
                    <a href="#about" class="button">
                        About Me <span aria-hidden="true">↗</span>
                    </a>

                    <a href="#skills" class="button button-outline">
                        Explore My Skills
                    </a>
                </div>
            </div>

            <div class="portrait-area">
                <div class="portrait-ring">
                    <img
                        src="my photo.jpg"
                        alt="Portrait of <?= escape($name) ?>"
                        class="profile"
                        width="320"
                        height="320"
                    >
                </div>

                <p class="status">
                    <span class="status-dot" aria-hidden="true"></span>
                    Learning & Creating
                </p>
            </div>
        </section>

        <div class="cards">
            <section class="card" id="about">
                <p class="eyebrow">01 / INTRODUCTION</p>
                <h2>About Me</h2>

                <p><?= escape($about) ?></p>
            </section>

            <section class="card" id="education">
                <p class="eyebrow">02 / MY JOURNEY</p>
                <h2>Education</h2>

                <h3><?= escape($university) ?></h3>
                <p><?= escape($education) ?></p>

                <span class="badge">Always learning</span>
            </section>

            <section class="card skills-card" id="skills">
                <p class="eyebrow">03 / MY TOOLBOX</p>
                <h2>Skills I'm Building</h2>

                <p>
                    Languages and technologies I'm learning
                    through practice.
                </p>

                <ul class="skills">
                    <?php foreach ($skills as $skill): ?>
                        <li>
                            <span class="skill-icon">
                                <img
                                    src="<?= escape($skill['icon']) ?>"
                                    alt=""
                                    width="34"
                                    height="34"
                                    loading="lazy"
                                >
                            </span>

                            <span><?= escape($skill["name"]) ?></span>
                        </li>
                    <?php endforeach; ?>
                </ul>
            </section>
        </div>
    </main>

    <footer>
        <p>
            &copy; <?= date("Y") ?>
            <?= escape($name) ?>.
        </p>

        <div class="footer-actions">
            <button
                id="motion-toggle"
                type="button"
                aria-pressed="false"
                hidden
            >
                Pause galaxy
            </button>

            <a href="#home">Back to top ↑</a>
        </div>
    </footer>
</body>
</html>