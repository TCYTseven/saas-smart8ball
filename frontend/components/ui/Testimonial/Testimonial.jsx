import SectionWrapper from "@/components/SectionWrapper";
import GradientWrapper from "@/components/GradientWrapper";
import user1 from "@/public/testimonial/user1.webp";
import user2 from "@/public/testimonial/user2.webp";
import user3 from "@/public/testimonial/user3.webp";
import user4 from "@/public/testimonial/user4.webp";
import user5 from "@/public/testimonial/user5.webp";
import user6 from "@/public/testimonial/user6.webp";
import Image from "next/image";
import LayoutEffect from "@/components/LayoutEffect";
import { motion } from "framer-motion";

const Testimonial = () => {
    const testimonials = [
        {
            avatar: user1,
            name: "Lebron James",
            title: "Basketball Legend",
            quote: "I used to rely on my instincts on the court, but for everything else, it's Smart 8 Ball all the way. It's like having my own personal coach that never misses a shot."
        },
        {
            avatar: user2,
            name: "Tony Stark",
            title: "Genius, Billionaire, Playboy, Philanthropist",
            quote: "Even with JARVIS, I still consult Smart 8 Ball for those tricky decisions. It's like having an AI sidekick with a sense of humor."
        },
        {
            avatar: user3,
            name: "Hermione Granger",
            title: "Brightest Witch of Her Age",
            quote: "Why cast a spell when Smart 8 Ball can make the decision for you? It's magical, but without the wand-waving."
        },
        {
            avatar: user4,
            name: "Yoda",
            title: "Jedi Master",
            quote: "Decide you must, but use Smart 8 Ball you should. The Force is strong with this one."
        },
        {
            avatar: user5,
            name: "Sherlock Holmes",
            title: "Consulting Detective",
            quote: "Elementary, my dear Watson. When in doubt, I turn to Smart 8 Ball. It’s more reliable than guessing."
        },
        {
            avatar: user6,
            name: "Payal Aggarwal",
            title: "GOAT",
            quote: "smart8ball helps me choose the best punishments when my son misbehaves!"
        }
    ];

    return (
        <SectionWrapper>
            <div id="testimonials" className="custom-screen text-gray-300">
                <LayoutEffect
                    className="duration-1000 delay-300"
                    isInviewState={{
                        trueState: "opacity-1",
                        falseState: "opacity-0 translate-y-6"
                    }}
                >
                    <motion.div
                        className="max-w-3xl mx-auto text-center p-8 bg-gradient-to-r from-[#6d28d9] via-[#8b5cf6] to-[#9d4edd] rounded-lg shadow-xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <h1 className="text-6xl font-extrabold text-white drop-shadow-lg">
                            Vouches
                        </h1>

                    </motion.div>
                </LayoutEffect>
                <h2 className="text-center text-2xl font-normal mt-8">
                    We are proudly serving <b>5+</b> users!
                </h2>
                <GradientWrapper wrapperClassName="max-w-sm h-40 top-12 inset-x-0" className="mt-12">
                    <LayoutEffect
                        className="duration-1000 delay-300"
                        isInviewState={{
                            trueState: "opacity-1",
                            falseState: "opacity-0 translate-y-12"
                        }}
                    >
                        <ul className="grid gap-6 duration-1000 delay-300 ease-in-out sm:grid-cols-2 lg:grid-cols-3">
                            {testimonials.map((item, idx) => (
                                <li key={idx} className="p-4 rounded-xl border border-gray-800"
                                    style={{
                                        backgroundImage: "radial-gradient(100% 100% at 50% 50%, rgba(124, 58, 237, 0.1) 0%, rgba(124, 58, 237, 0) 100%)"
                                    }}
                                >
                                    <figure className="flex flex-col justify-between gap-y-6 h-full">
                                        <blockquote className="">
                                            <p className="text-gray-50">
                                                {item.quote}
                                            </p>
                                        </blockquote>
                                        <div className="flex items-center gap-x-4">
                                            <Image
                                                src={item.avatar}
                                                alt={item.name}
                                                className="w-14 h-14 rounded-full object-cover"
                                            />
                                            <div>
                                                <span className="block text-gray-50 font-semibold">{item.name}</span>
                                                <span className="block text-sm mt-0.5">{item.title}</span>
                                            </div>
                                        </div>
                                    </figure>
                                </li>
                            ))}
                        </ul>
                    </LayoutEffect>
                </GradientWrapper>
            </div>
        </SectionWrapper>
    );
};

export default Testimonial;
