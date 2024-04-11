import React from "react";
import dynamic from "next/dynamic";

const AnimatedNumbers = dynamic(
  () => {
    return import("react-animated-numbers");
  },
  { ssr: false }
);

const achievementsList = [
  {
    metric: "Delicious Dinners",
    value: "5245",
    postfix: "+",
  },
  {
    metric: "Experienced Chef",
    value: "60",
    postfix: "+",
  },
  {
    metric: "Our Awards",
    value: "1359",
    postfix: "+",
  },
  {
    metric: "Happy Customers",
    value: "6560",
    postfix: "+",
  },
];

const AchievementsSection = () => {
  return (
    <div className="py-8 px-10 xl:gap-16 sm:py-16 xl:px-16">
      <div className="sm:border-[#33353F] sm:border rounded-md py-8 px-16 flex flex-col sm:flex-row items-center justify-between">
        {achievementsList.map((achievement, index) => {
          return (
            <div
              key={index}
              className="flex flex-col items-center justify-center mx-4 my-4 sm:my-0"
            >
              <h2 className="text-[#D35400] text-4xl font-bold flex flex-row">
                <AnimatedNumbers
                  includeComma
                  animateToNumber={parseInt(achievement.value)}
                  locale="en-US"
                  className="text-[#D35400] text-4xl font-bold"
                />
                {achievement.postfix}
              </h2>
              <p className="text-black text-2xl"> {achievement.metric}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AchievementsSection;
