import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Analytics from "../googleAnalytics";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useDarkMode from "use-dark-mode";
import Typed from "react-typed";
import { ToastContainer, toast } from "react-toastify";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";
import { Card } from "antd";
const { Meta } = Card;

export default function Home() {
  const recaptchaRef = React.createRef({});
  const [captchaverified, setcaptchaverified] = useState(false);
  const darkMode = useDarkMode(false);
  const [burger, setburger] = useState(true);
  const screenWidth = useWindowDimensions();
  const [imagewidth, setimagewidth] = useState(400);
  const [imageheight, setimageheight] = useState(400);
  const [showup, setshowup] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hover, sethover] = useState(false);
  const rout = useRouter();
  const [router, setrouter] = useState("");
  const [submitting, setsubmitting] = useState(false);
  const [yearsAgo, setYearsAgo] = useState(9);

  useEffect(() => {
    localStorage.setItem("path", rout.asPath);
    setrouter(rout.asPath);
  }, [rout]);

  useEffect(() => {
    setMounted(true);
    setrouter(localStorage.getItem("path"));
    rout.push(localStorage.getItem("path"));
    setYearsAgo(new Date().getFullYear() - 2016);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (typeof window != "undefined") {
    window.onscroll = function () {
      scrollFun();
    };
  }
  function scrollFun() {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      setshowup(true);
    } else {
      setshowup(false);
    }
  }
  const skillsData = [
    { skill: "HTML", value: "85", in: "bounceInLeft", out: "bounceOutLeft" },
    { skill: "CSS", value: "70", in: "bounceInRight", out: "bounceOutRight" },
    {
      skill: "Javascript",
      value: "80",
      in: "bounceInLeft",
      out: "bounceOutRight",
    },
    { skill: "React", value: "85", in: "bounceInLeft", out: "bounceOutLeft" },
    {
      skill: "Spring Boot",
      value: "85",
      in: "bounceInRight",
      out: "bounceOutRight",
    },
    { skill: "AWS", value: "75", in: "bounceInLeft", out: "bounceOutLeft" },
    {
      skill: "Mongodb",
      value: "90",
      in: "bounceInLeft",
      out: "bounceOutLeft",
    },
    { skill: "MySql", value: "85", in: "bounceInRight", out: "bounceOutRight" },
    {
      skill: "RabbitMQ",
      value: "85",
      in: "bounceInRight",
      out: "bounceOutRight",
    },
  ];
  const workData = [
    {
      img: "/trackmyprice_preview.png",
      alt: "TrackMYPriceImage",
      link: "https://www.trackmyprice.in/",
      title: "TrackMYPrice",
      desc: "React.js, Spring Boot, Node.js, RabbitMQ, DynamoDB, Redis",
      in: "bounceInRight",
      out: "bounceOutLeft",
      color: "black",
      titlecolor: "#eb0253",
    },
    {
      img: "/trackdsa.png",
      alt: "TrackDSA",
      link: "https://www.trackdsa.com/",
      title: "Track DSA",
      desc: "React.js, Node.js, Express.js, Mongodb",
      in: "bounceInLeft",
      out: "bounceOutRight",
      color: "black",
      titlecolor: "#eb0253",
    },
    {
      img: "/shofferstop.png",
      alt: "ShofferStop",
      link: "https://www.shofferstop.in/",
      title: "ShofferStop",
      desc: "React.js, Spring Boot, MySQL",
      in: "bounceInRight",
      out: "bounceOutLeft",
      color: "black",
      titlecolor: "#eb0253",
    },
  ];
  function getWindowDimensions() {
    if (typeof window != "undefined") {
      const { innerWidth: width, innerHeight: height } = window;
      return {
        width,
      };
    }
  }
  function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(
      getWindowDimensions()
    );

    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowDimensions;
  }
  useEffect(() => {
    if (screenWidth.width <= 850 && screenWidth.width > 724) {
      setimagewidth(400);
      setimageheight(400);
    }
    if (screenWidth.width <= 724) {
      setimagewidth(350);
      setimageheight(350);
    }
    if (screenWidth.width > 850) {
      setimagewidth(400);
      setimageheight(400);
    }
    if (screenWidth.width > 850) setburger(true);
    // else setburger(false);
  }, [screenWidth]);
  function scrollTopFun() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  const sendEmail = async (e) => {
    console.log("helo");
    setsubmitting(true);
    const formData = new FormData(e.target);
    e.preventDefault();
    let obj = {};
    for (let [key, value] of formData.entries()) {
      obj[key] = value;
    }
    const recaptchaValue = await recaptchaRef.current.getValue();
    obj.captcha = recaptchaValue;
    if (
      obj.email != null &&
      obj.name != null &&
      obj.message != null &&
      recaptchaValue != null
    ) {
      fetch("https://orchestration.mayuragarwal.in/contact", {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then(async (response) => {
          if (response.status >= 200 && response.status <= 299) {
            return response.json();
          } else {
            const text = await response.text();
            throw new Error(text);
          }
        })
        .then((data) => {
          setsubmitting(false);
          if (data.success) {
            localStorage.getItem("darkMode") == "true"
              ? toast("Message sent! Thank you for contacting", {
                  position: "bottom-center",
                  autoClose: 2500,
                  hideProgressBar: false,
                  closeOnClick: true,
                  progress: undefined,
                })
              : toast.dark("Message sent! Thank you for contacting", {
                  position: "bottom-center",
                  autoClose: 2500,
                  hideProgressBar: false,
                  closeOnClick: true,
                  progress: undefined,
                });
            document.getElementById("form").reset();
          } else {
            toast.error("Re-verify captcha and try again", {
              position: "bottom-center",
              autoClose: 2500,
              hideProgressBar: false,
              closeOnClick: true,
              progress: undefined,
            });
          }
        })
        .catch((err) => {
          toast.error(err.message, {
            position: "bottom-center",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            progress: undefined,
          });
        });
    }
  };

  const workProfilesCalled = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };
  return (
    <>
      <Analytics />
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <title>Mayur Agarwal Web Developer-Portfolio</title>
        <title>
          {router.length > 1
            ? router.charAt(2).toUpperCase() + router.slice(3)
            : "Mayur Agarwal Web Developer-Portfolio"}
        </title>
        <meta
          name="description"
          content="I(Mayur Agarwal) am a software engineer who specializes in building
        user-friendly websites/webapps to provide exceptional web experience."
        />
        <meta
          name="og:description"
          content="I(Mayur Agarwal) am a software engineer who specializes in building
        user-friendly websites/webapps and provide exceptional web experience."
        />
        <meta property="og:site_name" content="Mayur Agarwal"></meta>
        <meta property="og:url" content="https://mayuragarwal.in/"></meta>
        <meta property="og:title" content="Home – Default"></meta>
        <meta property="og:type" content="Portfolio"></meta>
        <meta name="robots" content="index, follow"></meta>
        <meta
          property="og:image"
          content="https://res.cloudinary.com/mayur28/image/upload/v1626356532/about2_k9zsdg.png"
        ></meta>

        <meta property="og:locale" content="en_US" />
        {/* <link rel="canonical" href="https://mattfarley.ca"> */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@mayuragarwal" />
        <meta name="twitter:creator" content="@mayuragarwal" />
        <meta name="twitter:title" content="Mayur Agarwal" />
        <meta
          name="twitter:description"
          content="I(Mayur Agarwal) am a software engineer who specializes in building
        user-friendly websites/webapps and provide exceptional web experience."
        />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/mayur28/image/upload/v1626356532/about2_k9zsdg.png"
        />
        <meta name="twitter:image:alt" content="Mayur Agarwal" />
        <meta content="https://github.com/Maayur28" property="og:see_also" />
        <meta
          content="https://www.linkedin.com/in/mayur28/"
          property="og:see_also"
        />
        <meta
          content="https://www.facebook.com/mayurag28"
          property="og:see_also"
        />
        <meta content="https://twitter.com/mayur__28" property="og:see_also" />

        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/apple-touch-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/apple-touch-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/apple-touch-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/apple-touch-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/apple-touch-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/apple-touch-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/apple-touch-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <meta
          name="google-site-verification"
          content="Volj0Kd2XHw6v37sVFzLqBwrzEyHHmSuob_RJZhBVdY"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/boxicons@2.0.5/css/boxicons.min.css"
          rel="stylesheet"
        ></link>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"
          disabled
        ></link>
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <script
          async
          src="https://cdn.jsdelivr.net/npm/typed.js@2.0.12"
        ></script>
      </Head>
      <header className={styles.main}>
        <nav
          className={
            mounted && localStorage.getItem("darkMode") == "true"
              ? "darknav"
              : "navbar"
          }
        >
          <div className="navbar-logo">
            <a href="" className="nav__logo">
              MAYUR
            </a>
          </div>
          <ul
            className={
              burger
                ? "navmenu"
                : localStorage.getItem("darkMode") == "true"
                ? "darknav-navmenu-responsive"
                : "navmenu-responsive"
            }
            id="nav-menu"
          >
            <li className={router == "/#home" ? "navitem active" : "navitem"}>
              <i className="bx bxs-home"></i>
              <a href="#home" className="navlink">
                Home
              </a>
            </li>
            <li className={router == "/#about" ? "navitem active" : "navitem"}>
              <i className="bx bxs-user"></i>
              <a href="#about" className="navlink">
                About
              </a>
            </li>
            <li className={router == "/#skills" ? "navitem active" : "navitem"}>
              <i className="bx bxs-notepad"></i>
              <a href="#skills" className="navlink">
                Skills
              </a>
            </li>
            <li className={router == "/#work" ? "navitem active" : "navitem"}>
              <i className="bx bxs-terminal"></i>
              <a href="#work" className="navlink">
                Work
              </a>
            </li>
            <li
              className={router == "/#contact" ? "navitem active" : "navitem"}
            >
              <i className="bx bxs-contact"></i>
              <a href="#contact" className="navlink">
                Contact
              </a>
            </li>
            {burger && (
              <li
                className="navitem resume-download"
                onMouseOver={() => sethover(true)}
                onMouseLeave={() => sethover(false)}
              >
                {!hover ? (
                  <>
                    <i className="bx bxs-book-open"></i>
                    <span style={{ cursor: "pointer" }} className="navlink">
                      Resume
                    </span>
                  </>
                ) : (
                  <>
                    <i className="bx bx-download"></i>
                    <a
                      href="https://asset.cloudinary.com/mayur28/64b70cb019636f9a687cfadd271d729b"
                      download
                      className="navlink"
                    >
                      Download
                    </a>
                  </>
                )}
              </li>
            )}
            {burger && (
              <li
                onClick={() => darkMode.toggle()}
                style={{ marginLeft: "1rem", cursor: "pointer" }}
              >
                {mounted && localStorage.getItem("darkMode") == "true" ? (
                  <i className="bx bxs-sun"></i>
                ) : (
                  <i className="bx bxs-moon"></i>
                )}
              </li>
            )}
          </ul>
          {mounted && screenWidth.width <= 850 && (
            <div
              onClick={() => darkMode.toggle()}
              style={{ cursor: "pointer" }}
            >
              {mounted && localStorage.getItem("darkMode") == "true" ? (
                <i className="bx bxs-sun"></i>
              ) : (
                <i className="bx bxs-moon"></i>
              )}
            </div>
          )}
          <div
            className="navtoggle"
            id="nav-toggle"
            onClick={() => setburger((prevState) => !prevState)}
          >
            {burger ? (
              <i className="burger-icon bx bx-slider"></i>
            ) : (
              <i className="burger-icon bx bx-x"></i>
            )}
          </div>
        </nav>
      </header>
      <main>
        {mounted && (
          <>
            <section className="home" id="home">
              <div className="home__social">
                <a
                  href="https://www.linkedin.com/in/mayur28/"
                  target="_blank"
                  rel="noreferrer"
                  className="linkedin"
                  aria-label="linkedIn"
                >
                  <i
                    className="bx bxl-linkedin"
                    style={{ fontSize: "1.5rem" }}
                  ></i>
                </a>
                <a
                  href="https://twitter.com/mayur__28"
                  target="_blank"
                  rel="noreferrer"
                  className="twitter"
                  aria-label="twitter"
                >
                  <i
                    className="bx bxl-twitter"
                    style={{ fontSize: "1.5rem" }}
                  ></i>
                </a>
                <a
                  href="https://github.com/Maayur28"
                  target="_blank"
                  rel="noreferrer"
                  className="github"
                  aria-label="gitHub"
                >
                  <i
                    className="bx bxl-github"
                    style={{ fontSize: "1.5rem" }}
                  ></i>
                </a>
                <a
                  href="https://stackoverflow.com/users/14791240/mayur-28"
                  target="_blank"
                  rel="noreferrer"
                  className="stackoverflow"
                  aria-label="stackoverflow"
                >
                  <i
                    className="bx bxl-stack-overflow"
                    style={{ fontSize: "1.5rem" }}
                  ></i>
                </a>
                <a
                  href="https://www.codechef.com/users/mayur_2812"
                  target="_blank"
                  rel="noreferrer"
                  className="codechef"
                  aria-label="codechef"
                >
                  <i
                    className="bx bx-code-alt"
                    style={{ fontSize: "1.5rem" }}
                  ></i>
                </a>
              </div>
              <div className="home__data">
                <h1 className="home__title">
                  Hi, I&apos;m <span className="home__title-color">Mayur</span>
                </h1>
                <div className="home__web">
                  <Typed
                    strings={["Web Developer", "Competitive Coder"]}
                    typeSpeed={50}
                    backSpeed={40}
                    loop
                    backDelay={2000}
                  />
                </div>
                <span>
                  I am a Senior Software Engineer focused on developing
                  scalable, efficient solutions that provide exceptional user
                  experiences. My approach combines problem-solving, innovation,
                  and continuous learning to create high-performance software. I
                  am committed to delivering impactful solutions that drive
                  business success and exceed user expectations. Passionate
                  about staying at the forefront of industry trends, I thrive in
                  dynamic environments.
                </span>
                <div className="home_button">
                  <div className="contact-div">
                    <a
                      href="#contact"
                      className="contact-button"
                    >
                      Contact Me <i className="bx bxs-send"></i>
                    </a>
                  </div>
                  {mounted && screenWidth.width <= 850 && (
                    <div
                      className="resume-download-responsive"
                      onMouseOver={() => sethover(true)}
                      onMouseLeave={() => sethover(false)}
                    >
                      {!hover ? (
                        <>
                          <i className="bx bxs-book-open"></i>
                          <span
                            style={{ cursor: "pointer" }}
                            className="navlink"
                          >
                            Resume
                          </span>
                        </>
                      ) : (
                        <>
                          <i className="bx bx-download"></i>
                          <a href="/Resume.pdf" download className="navlink">
                            Download
                          </a>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="blobImage">
                <Image
                  src="/my-image.png"
                  alt="myImage"
                  width={imagewidth}
                  height={imageheight}
                  className="homeImage"
                />
              </div>
              {typeof screenWidth != "undefined" && screenWidth.width > 850 && (
                <div className="scrollDown-div">
                  <div className="scrollDown">
                    <i className="bx bxs-mouse"></i>
                    <span>Scroll down </span>
                    <i className="bx bx-down-arrow-alt"></i>
                  </div>
                  {showup && (
                    <div className="scrollup-div" onClick={scrollTopFun}>
                      <i className="bx bxs-up-arrow-square"></i>
                    </div>
                  )}
                </div>
              )}
            </section>
            <section className="about" id="about">
              <h2 className="section-title">About Me</h2>
              <div className="about__container">
                <Image
                  src="/mlogo.gif"
                  alt="myPicture"
                  width={350}
                  height={350}
                  className="aboutImage"
                />
                <div className="about__text-div">
                  <p className="about__text">
                    <p>
                      I started my coding journey {yearsAgo} years ago, currently working with the
                      Amazon GiftCards team through Pinelabs, contributing to
                      strategic initiatives that drive business value. With
                      expertise in Spring Boot and AWS, I specialize in
                      designing and implementing scalable, high-performance
                      solutions. In addition to my professional work, I am
                      passionate about exploring new technologies and developing
                      innovative solutions through side projects. In 2022, I was
                      honored with the Best Performer Award for my
                      contributions. I am always eager to learn, grow, and
                      collaborate on impactful projects.
                    </p>

                    <p>
                      I have built projects that are used by real-world users in
                      their daily lives, focusing on creating solutions that are
                      both functional and user-friendly. These projects allow me
                      to experiment with new ideas and technologies while
                      solving practical problems. I enjoy working on projects
                      that push my creativity, and I thrive when collaborating
                      with others to develop solutions that make a difference.
                    </p>
                  </p>
                  <div className="about-number">
                    <div className="about-experience">
                      <CountUp
                        start={0}
                        end={4}
                        prefix="0"
                        suffix="+"
                        duration="2"
                      >
                        {({ countUpRef, start }) => (
                          <VisibilitySensor onChange={start} delayedCall>
                            <span className="about-year" ref={countUpRef} />
                          </VisibilitySensor>
                        )}
                      </CountUp>
                      <span className="about-desc">Years experience</span>
                    </div>
                    <div className="about-experience">
                      <CountUp
                        start={0}
                        end={8}
                        prefix="0"
                        suffix="+"
                        duration="4"
                      >
                        {({ countUpRef, start }) => (
                          <VisibilitySensor onChange={start} delayedCall>
                            <span className="about-year" ref={countUpRef} />
                          </VisibilitySensor>
                        )}
                      </CountUp>
                      <span className="about-desc">Completed projects</span>
                    </div>
                    <div className="about-experience">
                      <CountUp start={0} end={2} prefix="0" duration="1">
                        {({ countUpRef, start }) => (
                          <VisibilitySensor onChange={start} delayedCall>
                            <span className="about-year" ref={countUpRef} />
                          </VisibilitySensor>
                        )}
                      </CountUp>
                      <span className="about-desc">Companies worked</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="skills" id="skills">
              <>
                <h2 className="section-title">Skills</h2>
                <div className="skills__container">
                  {skillsData.map((val, index) => (
                    <motion.div
                      drag
                      dragSnapToOrigin={true}
                      dragTransition={{
                        bounceStiffness: 300,
                        bounceDamping: 10,
                      }}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.8 }}
                      className="skills_card"
                      key={index}
                    >
                      <div className="skills_circle">
                        <CircularProgressbar
                          value={val.value}
                          text={`${val.value}%`}
                          styles={buildStyles(
                            darkMode.value
                              ? {
                                  textColor: "white",
                                  pathColor: "#ff0066",
                                  trailColor: "#fd98c0",
                                }
                              : {
                                  textColor: "black",
                                  pathColor: "#ff0066",
                                  trailColor: "#fd98c0",
                                }
                          )}
                        />
                      </div>
                      <span
                        className="skill_text"
                        style={{
                          fontSize: "1.2rem",
                          fontWeight: "bolder",
                          marginTop: "1rem",
                        }}
                      >
                        {val.skill}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </>
            </section>
            <section className="work" id="work">
              <>
                <h2 className="section-title">Work</h2>
                <div className="work__container">
                  {workData.map((val, index) => (
                    <motion.div
                      initial="hidden"
                      whileInView="visible"
                      transition={{ duration: 0.7 }}
                      variants={{
                        visible: { opacity: 1, scale: 1 },
                        hidden: { opacity: 0, scale: 0 },
                      }}
                      className="work__img"
                      key={index}
                    >
                      <Card
                        hoverable
                        className="work__container_card"
                        onClick={() => workProfilesCalled(val.link)}
                        cover={
                          <Image
                            className="workImage"
                            src={val.img}
                            alt={val.alt}
                            width={450}
                            height={250}
                          />
                        }
                      >
                        <Meta title={val.title} description={val.desc} />
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </>
            </section>
            <section className="contact" id="contact">
              <>
                <h2 className="section-title">Contact</h2>

                <div className="contact__container">
                  <form
                    id="form"
                    className="contact__form"
                    method="POST"
                    onSubmit={sendEmail}
                  >
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      className="contact__input"
                      required={true}
                    />
                    <input
                      type="mail"
                      name="email"
                      placeholder="Email"
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                      className="contact__input"
                      required={true}
                    />
                    <textarea
                      name="message"
                      id=""
                      cols="0"
                      rows="10"
                      className="contact__input"
                      placeholder="Your message here"
                      required={true}
                    ></textarea>
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey="6Lf5Hr0dAAAAALIuH2ZavQv0r9CVnmkJFYhNH2VE"
                      onChange={() => setcaptchaverified(true)}
                      onExpired={() => recaptchaRef.reset()}
                    />
                    <button className="contact_button" disabled={submitting}>
                      Send message <i className="bx bxs-send"></i>
                    </button>
                  </form>
                </div>
              </>
            </section>
          </>
        )}
      </main>
      <ToastContainer />
    </>
  );
}
