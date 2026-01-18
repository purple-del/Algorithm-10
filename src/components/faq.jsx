"use client";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";

const FAQ_ITEMS = [
  { q: "What is Algorithm 10.0?", a: "Algorithm 10.0 is a 32-hour national-level hackathon that brings together innovators, students, and tech enthusiasts from across the country to explore futuristic technologies and solve real-world problems." },
  { q: "When and where is it held?", a: "The hackathon will take place on February 21–22, 2026 at Kalsekar Technical Campus, New Panvel, with a fully equipped and collaborative environment." },
  { q: "Who is eligible to participate?", a: "Students from any academic background who are interested in innovation, technology, and problem-solving are welcome to participate." },
  { q: "Is there a participation fee?", a: "No, Algorithm 10.0 is completely free to participate in, with meals, internet, and resources provided." },
  { q: "How can I register?", a: "Participants can register through the official Algorithm 10.0 website where all guidelines and updates are available." },
  { q: "Are prizes awarded?", a: "Yes, winners receive exciting cash prizes, certificates, and recognition from industry experts." },
  { q: "What should I bring?", a: "Participants should bring their laptops, chargers, and any tools or software required for their project." },
  { q: "Is food and internet provided?", a: "Yes, high-speed Wi-Fi, meals, snacks, and refreshments will be provided throughout the hackathon." },
  { q: "Can beginners participate?", a: "Absolutely. Beginners are encouraged to participate and learn through mentorship and collaboration." },
  { q: "How are projects evaluated?", a: "Projects are judged based on innovation, technical execution, impact, creativity, and presentation quality." }
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);
  const [exitFooter, setExitFooter] = useState(false);

  const listRef = useRef(null);
  const exitTimeout = useRef(null);
  const openIndexRef = useRef(null);

  const scrollProgress = useMotionValue(0);
  const gradientPosition = useTransform(
    scrollProgress,
    [0, 1],
    ["0% 50%", "100% 50%"]
  );

  useEffect(() => {
    openIndexRef.current = openIndex;
  }, [openIndex]);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const handleScroll = () => {
      const scrollTop = list.scrollTop;
      const scrollHeight = list.scrollHeight - list.clientHeight;
      if (scrollHeight <= 0) return;

      scrollProgress.set(scrollTop / scrollHeight);

      const atEnd = scrollTop >= scrollHeight - 8;
      if (atEnd && openIndexRef.current === null) {
        clearTimeout(exitTimeout.current);
        exitTimeout.current = setTimeout(() => setExitFooter(true), 600);
      } else {
        clearTimeout(exitTimeout.current);
        setExitFooter(false);
      }
    };

    list.addEventListener("scroll", handleScroll);
    return () => list.removeEventListener("scroll", handleScroll);
  }, [scrollProgress]);

  const leftVariants = {
    visible: { y: 0, opacity: 1 },
    exit: { y: -80, opacity: 0, transition: { duration: 1.2, ease: "easeInOut" } }
  };

  const cardVariants = {
    visible: { y: 0, opacity: 1 },
    exit: (i) => ({
      y: -60,
      opacity: 0,
      transition: { duration: 0.8, delay: i * 0.08, ease: "easeInOut" }
    })
  };

  const gradientColors =
    "linear-gradient(90deg, #8B0000, #FF4500, #FF7E00, #FFA500, #FFD580, #FF7E00, #5C1A00)";

  return (
    <section className="relative bg-black text-white py-16 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-4">

        {/* LEFT TEXT */}
        <motion.div
          variants={leftVariants}
          initial="visible"
          animate={exitFooter ? "exit" : "visible"}
          className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left lg:sticky lg:top-24"
          style={{ fontFamily: "Orbitron" }}
        >
          <div className="relative inline-block mx-auto lg:mx-0">
            <div className="absolute inset-0 rounded-full blur-3xl bg-orange-500/25 glow-pulse" />

            <motion.h2
              className="relative text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
              style={{
                backgroundImage: gradientColors,
                backgroundSize: "300% 100%",
                backgroundPosition: gradientPosition,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                transition: "background-position 0.2s linear"
              }}
            >
              Frequently Asked Questions
            </motion.h2>
          </div>

          <p className="mt-4 text-lg md:text-xl opacity-70">
            Everything you need to know about Algorithm 10.0
          </p>
        </motion.div>

        {/* FAQ LIST */}
        <motion.div
          ref={listRef}
          className="w-full lg:w-1/2 max-h-[80vh] overflow-y-auto no-scrollbar pt-6 pb-24"
        >
          <AnimatePresence initial={false}>
            {FAQ_ITEMS.map((item, i) => {
              const isOpen = openIndex === i;

              return (
                <motion.div
                  key={i}
                  custom={i}
                  variants={cardVariants}
                  initial="visible"
                  animate={exitFooter ? "exit" : "visible"}
                  className="group relative rounded-3xl bg-white/5 backdrop-blur border border-white/10 mb-6 overflow-hidden"
                >
                  <div
                    className={`absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-300
                      ${isOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                    style={{
                      background: gradientColors,
                      padding: "3px",
                      WebkitMask:
                        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      WebkitMaskComposite: "xor",
                      maskComposite: "exclude"
                    }}
                  />

                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="relative z-10 w-full px-6 md:px-8 py-5 md:py-6 flex justify-between text-left"
                  >
                    <span>{item.q}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      ⌄
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                        className="relative z-10 px-6 md:px-8 pb-6 overflow-hidden"
                      >
                        <p className="text-gray-300">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        @keyframes orangePulse {
          0% {
            box-shadow: 0 0 18px rgba(255, 126, 0, 0.25),
                        0 0 40px rgba(255, 126, 0, 0.15);
          }
          50% {
            box-shadow: 0 0 28px rgba(255, 126, 0, 0.45),
                        0 0 65px rgba(255, 126, 0, 0.25);
          }
          100% {
            box-shadow: 0 0 18px rgba(255, 126, 0, 0.25),
                        0 0 40px rgba(255, 126, 0, 0.15);
          }
        }

        .glow-pulse {
          animation: orangePulse 2.8s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
