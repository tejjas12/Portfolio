
import "./App.css";
import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  Menu,
  X
} from "lucide-react";

const projects = [
  {
    number: "01",
    title: "HomeMate",
    category: "MACHINE LEARNING",
    description: "A house price prediction application using Linear Regression and Decision Tree models."
  },
  {
    number: "02",
    title: "Student Academic Risk Predictor",
    category: "DATA SCIENCE",
    description: "An ML-powered application designed to identify students' academic risk."
  },
  {
    number: "03",
    title: "Crop Yield Prediction",
    category: "MACHINE LEARNING",
    description: "Using agricultural data and machine learning to explore crop yield prediction."
  },
  {
    number: "04",
    title: "MHT-CET Updates Hub",
    category: "WEB DEVELOPMENT",
    description: "A frontend platform designed to organize important MHT-CET updates."
  },
  {
    number: "05",
    title: "Netflix Analytics Dashboard",
    category: "DATA ANALYTICS",
    description: "An interactive Tableau dashboard exploring Netflix content, movies, TV shows, genres and platform insights.",
  }
];



function Reveal({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        y: 70,
        scale: 0.96,
        filter: "blur(8px)"
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)"
      }}
      viewport={{
        once: false,
        amount: 0.25
      }}
      transition={{
        duration: 1.3,
        delay,
        ease: [0.16, 1, 0.3, 1]
      }}
    >
      {children}
    </motion.div>
  );
}

// App Function //

function App() {
  // ACTIVE NAVIGATION
const [activeSection, setActiveSection] = useState("home");

useEffect(() => {
  const sections = document.querySelectorAll("section[id]");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    },
    {
      rootMargin: "-35% 0px -55% 0px",
    }
  );

  sections.forEach((section) => observer.observe(section));

  return () => observer.disconnect();
}, []);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  // HERO IMAGE PARALLAX
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -100]
  );

  const imageScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 0.94]
  );


const [cursorPosition, setCursorPosition] = useState({
  x: 0,
  y: 0
});

const [cursorActive, setCursorActive] = useState(false);

useEffect(() => {
  const handleMouseMove = (event) => {
    setCursorPosition({
      x: event.clientX,
      y: event.clientY
    });
  };

  const handleMouseOver = (event) => {
    setCursorActive(
      Boolean(
        event.target.closest(
          "a, button, .skill-card, .project-card"
        )
      )
    );
  };

  window.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseover", handleMouseOver);

  return () => {
    window.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseover", handleMouseOver);
  };
}, []);

  return (
    <main>


      {/* NAVIGATION */}
      <header className="navbar">
        <a href="#home" className="logo" onClick={closeMenu}>
        PORTFOLIO<span>.</span>
        </a>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
  {[
    { label: "HOME", id: "home" },
    { label: "ABOUT", id: "about" },
    { label: "WORK", id: "work" },
    { label: "SKILLS", id: "skills" },
    { label: "CONTACT", id: "contact" },
  ].map((item) => (
    <a
      key={item.id}
      href={`#${item.id}`}
      onClick={(e) => {
        e.preventDefault();
        closeMenu();

        document.getElementById(item.id)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        setActiveSection(item.id);
      }}
      className={activeSection === item.id ? "active" : ""}
    >
      {item.label}
    </a>
  ))}
</nav>

        <a href="#contact" className="nav-cta">
          LET'S TALK <ArrowUpRight size={15} />
        </a>
      </header>

      

{/* HERO SECTION */}
<section className="hero" id="home" ref={heroRef}>
  <div className="hero-topline">
    <span>
      <i className="availability-dot" />
      AVAILABLE FOR OPPORTUNITIES
    </span>
    <span>PUNE, INDIA · 2026</span>
  </div>

  <div className="hero-content">
    <div className="hero-copy">
      <motion.p
        className="hero-label"
        initial={{ opacity: 0, y: 25, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        HELLO, I'M TEJAS PATIL
      </motion.p>

      <motion.div
        className="hero-heading"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.35 }}
        variants={{
          hidden: { opacity: 1 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.25,
              delayChildren: 0.2
            }
          }
        }}
      >
        {["THINK.", "CREATE.", "BUILD."].map((word, index) => (
          <div className="heading-mask" key={word}>
            <motion.h1
              className={index === 1 ? "outline-text" : ""}
              variants={{
                hidden: {
                  opacity: 0,
                  y: "110%",
                  filter: "blur(12px)"
                },
                visible: {
                  opacity: 1,
                  y: "0%",
                  filter: "blur(0px)"
                }
              }}
              transition={{
                duration: 1.25,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              {word === "BUILD." ? (
                <>BUILD<span className="accent-dot">.</span></>
              ) : word}
            </motion.h1>
          </div>
        ))}
      </motion.div>

      <motion.p
        className="hero-description"
        initial={{ opacity: 0, y: 30, filter: "blur(5px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1, delay: 1.25 }}
      >
        Computer Science student specializing in Data Science.
        Exploring the intersection of technology, data and
        creative development.
      </motion.p>

      <motion.div
        className="hero-actions"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.45 }}
      >
        <a href="#work" className="primary-btn">
          EXPLORE MY WORK <ArrowUpRight size={17} />
        </a>

        <a href="#about" className="secondary-btn">
          MORE ABOUT ME <ArrowDownRight size={17} />
        </a>
      </motion.div>
    </div>

    <motion.div
      className="hero-image-wrap"
      initial={{
        opacity: 0,
        scale: 0.92,
        y: 35,
        filter: "blur(8px)"
      }}
      animate={{
        opacity: 1,
        filter: "blur(0px)"
      }}
      transition={{
        duration: 1.2,
        delay: 0.4,
        ease: [0.22, 1, 0.36, 1]
      }}
      style={{
        y: imageY,
        scale: imageScale
      }}
    >
      <div className="image-frame">
        <img
          src={`${import.meta.env.BASE_URL}profile.png`}
          alt="Tejas Patil"
          className="profile-image"
        />
      </div>

      <motion.div
        className="image-caption"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.3 }}
      >
        <span>THE PERSON BEHIND THE CODE</span>
      </motion.div>
    </motion.div>
  </div>

  <div className="hero-footer">
    <span>SCROLL TO EXPLORE</span>

    <motion.div
      animate={{ y: [0, 9, 0], opacity: [0.5, 1, 0.5] }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <ArrowDownRight size={19} />
    </motion.div>

    <span>DATA SCIENCE · DEVELOPMENT · CREATIVITY</span>
  </div>
</section>



      {/* ABOUT SECTION */}
      <section className="about section" id="about">
        <Reveal>
        <span className="section-label">ABOUT ME</span>
          <h2 className="section-heading">
            Curious by nature.
            <br />
            <em>Creative by choice.</em>
          </h2>
        </Reveal>

        <Reveal delay={0.15} className="about-description">
          <p>
            I'm Tejas Patil, a Computer Science student specializing
            in Data Science. I enjoy exploring technology, building
            digital experiences and turning ideas into meaningful
            projects.
          </p>
          <p>
            My interests include Machine Learning, Data Analytics
            and modern web development. I believe in learning by
            building and improving with every project.
          </p>
        </Reveal>
      </section>

      
      {/* PROJECTS SECTION */}
      <section className="work section" id="work">
        <Reveal className="work-heading">
          <div>
            <span className="section-label">SELECTED WORK</span>
            <h2 className="section-heading">
              Selected <em>projects.</em>
            </h2>
          </div>
          <p>Ideas transformed into digital experiences.</p>
        </Reveal>

        <div className="project-grid">
          {projects.map((project, index) => (
            <Reveal key={project.number} delay={index * 0.1}>
              <a
                href="https://github.com/tejjas12"
                target="_blank"
                rel="noreferrer"
                className="project-card"
              >
                <div className="project-card-top">
                  
                  <ArrowUpRight size={22} />
                </div>

                <div className="project-card-content">
                  <span className="project-category">
                    {project.category}
                  </span>

                  <h3>{project.title}</h3>

                  <p>{project.description}</p>
                </div>

                <div className="project-card-bottom">
                  <span>EXPLORE PROJECT</span>
                  <span>↗</span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>


      
{/* SKILLS SECTION */}
<section className="skills section" id="skills">
  <Reveal>
    <span className="section-label">MY EXPERTISE</span>

    <h2 className="section-heading">
      Skills & <em>toolkit.</em>
    </h2>

    <p className="skills-intro">
      Technologies and tools I use to explore ideas,
      analyze data and build digital experiences.
    </p>
  </Reveal>

  <div className="skills-grid">
    {[
      {
        title: "Programming",
        items: ["Python", "SQL", "JavaScript"]
      },
      {
        title: "Data Science",
        items: ["Machine Learning", "Data Analysis", "Statistics"]
      },
      {
        title: "Data Visualization",
        items: ["Power BI", "Tableau", "Matplotlib"]
      },
      {
        title: "Web Development",
        items: ["React", "HTML & CSS", "Flask"]
      },
      {
        title: "Tools & Platforms",
        items: ["GitHub", "VS Code", "Google Colab"]
      },
      {
        title: "Data Engineering",
        items: ["ETL Pipelines", "Data Cleaning", "Pandas"]
      }
    ].map((skill, index) => (
      <Reveal key={skill.title} delay={index * 0.08}>
        <motion.div
          className="skill-card"
          whileHover={{
            y: -9,
            scale: 1.015,
            transition: {
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1]
            }
          }}
          whileTap={{ scale: 0.985 }}
        >
          <motion.h3
            whileHover={{
              x: 5,
              transition: { duration: 0.3 }
            }}
          >
            {skill.title}
          </motion.h3>

          <div className="skill-tags">
            {skill.items.map((item) => (
              <motion.span
                key={item}
                whileHover={{
                  y: -4,
                  scale: 1.06,
                  transition: { duration: 0.25 }
                }}
              >
                {item}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </Reveal>
    ))}
  </div>
</section>
      
{/* CONTACT SECTION */}
<section className="contact section" id="contact">
  <Reveal>
    <span className="section-label">GET IN TOUCH</span>

    <motion.h2
      className="contact-heading"
      initial={{ opacity: 0, y: 55, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      Let's create
      <br />
      something <em>great.</em>
    </motion.h2>

    <motion.p
    
    initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.9, delay: 0.2 }}
    >
      Open to internships, collaborations and interesting
      conversations.
    </motion.p>
    {/* CONTACT FORM */}
<motion.form
  className="contact-form"
  action="https://formsubmit.co/patiltp2005@gmail.com"
  method="POST"
  initial={{ opacity: 0, y: 35 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: false, amount: 0.2 }}
  transition={{ duration: 1, delay: 0.2 }}
>
  <input
    type="hidden"
    name="_subject"
    value="New Portfolio Contact Message"
  />

  <input
    type="hidden"
    name="_captcha"
    value="true"
  />

  <input
    type="hidden"
    name="_template"
    value="table"
  />

  <div className="form-group">
    <label htmlFor="contact-name">YOUR NAME</label>
    <input
      id="contact-name"
      type="text"
      name="name"
      placeholder="Enter your name"
      required
    />
  </div>

  <div className="form-group">
    <label htmlFor="contact-email">YOUR EMAIL</label>
    <input
      id="contact-email"
      type="email"
      name="email"
      placeholder="Enter your email"
      required
    />
  </div>

  <div className="form-group">
    <label htmlFor="contact-subject">SUBJECT</label>
    <input
      id="contact-subject"
      type="text"
      name="subject"
      placeholder="What is this about?"
      required
    />
  </div>

  <div className="form-group">
    <label htmlFor="contact-message">YOUR MESSAGE</label>
    <textarea
      id="contact-message"
      name="message"
      rows="5"
      placeholder="Write your message..."
      required
    />
  </div>

  <button type="submit" className="contact-submit">
    SEND MESSAGE <ArrowUpRight size={19} />
  </button>
</motion.form>

    <motion.a
      href="mailto:patiltp2005@gmail.com"
      className="contact-button"
      whileHover={{
        scale: 1.04,
        x: 5,
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.97 }}
    >
      GET IN TOUCH <ArrowUpRight size={19} />
    </motion.a>
  </Reveal>

  <motion.footer
    className="footer"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false, amount: 0.5 }}
    transition={{
      duration: 1,
      ease: [0.22, 1, 0.36, 1]
    }}
  >
    <span>TEJAS PATIL © 2026</span>

    <div className="footer-socials">
  <motion.a
    href="mailto:patiltp2005@gmail.com"
    whileHover={{ y: -5 }}
  >
    EMAIL
  </motion.a>

  <motion.a
    href="https://github.com/tejjas12"
    target="_blank"
    rel="noreferrer"
    whileHover={{ y: -5 }}
  >
    GITHUB
  </motion.a>

  <motion.a
    href="www.linkedin.com/in/tejjas12"
    target="_blank"
    rel="noreferrer"
    whileHover={{ y: -5 }}
  >
    LINKEDIN
  </motion.a>
</div>

    <motion.a
      href="#home"
      whileHover={{ y: -4 }}
    >
      BACK TO TOP ↑
    </motion.a>
  </motion.footer>
</section>

</main>
  );
}

export default App;

