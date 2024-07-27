import Image from "next/image";
import LayoutEffect from "@/components/LayoutEffect";
import SectionWrapper from "@/components/SectionWrapper";

const HowItWorks = () => {
  const stepsList = [
    {
      title: "You Ask A Question",
      desc: "After making a free account, you can ask our AI to make a decision for you. Provide as much detail as possible for the best results!",
      image: "/images/featureone.svg",
    },
    {
      title: "You Upload Context",
      desc: "Upload (or type in) context that will help the AI make a better decision. You can upload images, PDFs, or any other file type. Note: We do not store any of your data.",
      image: "/images/featuretwo.svg",
    },
    {
      title: "Smart8Ball Makes A Decision",
      desc: "Our AI will return a decision providing you with guidance on what to do. You can use our AI's response to help you make the best choice.",
      image: "/images/featurethree.svg",
    },
  ];

  return (
    <SectionWrapper>
      <div id="how-it-works" className="custom-screen text-gray-300">
        <LayoutEffect
          className="duration-1000 delay-300"
          isInviewState={{
            trueState: "opacity-1",
            falseState: "opacity-0 translate-y-6",
          }}
        >
          <div className="max-w-xl mx-auto text-center">
            <h1 className="text-gray-80 text-3xl font-bold sm:text-4xl">
              How It Works
            </h1>
          </div>
        </LayoutEffect>
        <LayoutEffect
          className="duration-1000 delay-500"
          isInviewState={{
            trueState: "opacity-1",
            falseState: "opacity-0",
          }}
        >
          <div className="relative mt-12">
            <div className="flex justify-center items-center space-x-8">
              {stepsList.map((item, idx) => (
                <div
                  key={idx}
                  className="space-y-3 p-4 rounded-xl border border-gray-800"
                  style={{
                    background:
                      "radial-gradient(157.73% 157.73% at 50% -29.9%, rgba(203, 213, 225, 0.16) 0%, rgba(203, 213, 225, 0) 100%)",
                  }}
                >
                  <h3 className="text-lg text-gray-50 font-semibold">
                    {item.title}
                  </h3>
                  <p>{item.desc}</p>
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={450} // Adjust the width as needed
                    height={450} // Adjust the height as needed
                  />
                </div>
              ))}
            </div>
          </div>
        </LayoutEffect>
      </div>
    </SectionWrapper>
  );
};

export default HowItWorks;
