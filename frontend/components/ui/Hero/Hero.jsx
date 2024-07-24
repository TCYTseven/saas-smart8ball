import GradientWrapper from "@/components/GradientWrapper"
import Image from "next/image"
import NavLink from "../NavLink"
import HeroImg from "@/public/images/bg-pattern.webp"
import bgPattern from "@/public/images/bg-pattern.webp"
import LayoutEffect from "@/components/LayoutEffect"

const Hero = () => (
    <section className="relative overflow-hidden">
        <GradientWrapper wrapperClassName="w-full h-[30rem] absolute inset-0">
            <Image
                src={bgPattern}
                className="w-full h-full object-cover m-auto absolute inset-0 pointer-events-none"
                alt="Background pattern"
            />
        </GradientWrapper>
        <div className="relative z-10 custom-screen pt-24 pb-16">
            <LayoutEffect className="duration-1000 delay-300"
                isInviewState={{
                    trueState: "opacity-1 translate-y-0",
                    falseState: "opacity-0 translate-y-10"
                }}
            >
                <div className="space-y-6 max-w-4xl mx-auto text-center">
                    <div className="flex items-center justify-center space-x-1 text-white">
                        <div className="bg-gray-800 rounded-full p-4 pd-0">
                            <span role="img" aria-label="confetti">🎉</span>
                            <span>psst.... use code "MAKER" for 50% off premium!!</span>
                        </div>
                    </div>
                   
                    <h1 className="text-5xl sm:text-7xl font-extrabold mx-auto"
                        style={{
                            fontFamily: "'Inter', sans-serif",
                            color: "#FFFFFF",
                            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)"
                        }}
                    >
                        Make your <b>hard</b> decisions using AI
                    </h1>
                    <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-100 leading-relaxed">
                        Sometimes, we don't know what to do. Instead of flipping a coin or shaking a magic 8-ball, use our AI to help you make the best decision.
                    </p>
                </div>
            </LayoutEffect>
        </div>
        <Image
            src={HeroImg}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            alt="Hero image"
        />
        <style jsx>{`
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');

            @keyframes gradientAnimation {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }

            h1 {
                animation: gradientAnimation 10s ease infinite;
                background-size: 200% 200%;
            }

            .custom-screen::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, rgba(0, 0, 0, 0) 70%);
                z-index: -1;
            }
        `}</style>
    </section>
)

export default Hero
