import { motion } from "framer-motion";
import Image from "next/image";
import LayoutEffect from "@/components/LayoutEffect";
import SectionWrapper from "@/components/SectionWrapper";

const HowItWorks = () => {
  const stepsList = [
    {
      title: "You Ask A Question",
      desc: "After making a free account, you can ask our AI to make a decision for you. Provide as much detail as possible for the best results!",
      arrow: null,
    },
    {
      title: "You Upload Context",
      desc: "Upload (or type in) context that will help the AI make a better decision. You can upload images, PDFs, or any other file type. Note: We do not store any of your data.",
      arrow: null,
    },
    {
      title: "Smart8Ball Makes A Decision",
      desc: "Our AI will return a decision providing you with guidance on what to do. You can use our AI's response to help you make the best choice.",
      arrow: null, // No arrow after the last step
    },
  ];

  return (
    <SectionWrapper>
      <div id="how-it-works" className="custom-screen text-gray-300 px-4 sm:px-6 lg:px-8">
        <LayoutEffect
          className="duration-1000 delay-300"
          isInviewState={{
            trueState: "opacity-1",
            falseState: "opacity-0 translate-y-6",
          }}
        >
          <motion.div
            className="max-w-3xl mx-auto text-center p-8 bg-gradient-to-r from-[#6d28d9] via-[#8b5cf6] to-[#9d4edd] rounded-lg shadow-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg">
              How It Works
            </h1>
          </motion.div>
        </LayoutEffect>
        <LayoutEffect
          className="duration-1000 delay-500"
          isInviewState={{
            trueState: "opacity-1",
            falseState: "opacity-0",
          }}
        >
          <motion.div
            className="flex flex-col md:flex-row justify-center items-center mt-12 space-y-8 md:space-y-0 md:space-x-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="space-y-8 flex-1">
              {stepsList.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <motion.div
                    className="space-y-3 p-4 sm:p-6 rounded-xl border border-gray-800 w-full sm:w-80 shadow-lg hover:shadow-xl transition-shadow duration-300"
                    style={{
                      background: "radial-gradient(157.73% 157.73% at 50% -29.9%, rgba(203, 213, 225, 0.16) 0%, rgba(203, 213, 225, 0) 100%)",
                      boxShadow: "0 0 15px rgba(0, 0, 0, 0.8)", // Black glow
                      border: "2px solid white", // White stroke
                    }}
                    whileHover={{ scale: 1.04 }}
                  >
                    <h3 className="text-base sm:text-lg text-gray-50 font-semibold text-center">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base text-center">{item.desc}</p>
                  </motion.div>
                  {item.arrow && (
                    <Image
                      src={item.arrow}
                      alt="Downward arrow"
                      width={30}
                      height={30}
                      className="mt-4"
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex-1 flex justify-center mt-8 md:mt-0">
              <div className="relative pb-[56.25%] w-full h-0"> {/* 16:9 aspect ratio */}
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/zx1Pz9am6ZQ?si=tXRBZK_16oiFg-ze"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </motion.div>
        </LayoutEffect>
      </div>
    </SectionWrapper>
  );
};

export default HowItWorks;
