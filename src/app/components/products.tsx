import Image from "next/image";
import React, { ReactNode, useState } from "react";

function Products() {
  const calaculatorsInfo = [
    {
      title: "Mortgage calculator",
      imageAlt: "Mortgage calculator",
      imageSizes: "sm",
      imageSrc: "/images/homepage/learning-center/mortgage-calculator.webp",
      href: "/mortage-calc",
    },
    {
      title: "Affordability calculator",
      imageAlt: "Affordability calculator",
      imageSizes: "sm",
      imageSrc: "/images/homepage/learning-center/affordability-calculator.webp",
      href: "/mortage-calc",
      description:
        "Got homeownership dreams? Let's put some numbers behind them. Our affordability calculator estimates the maximum home you can afford.",
    },
    {
      title: "HELOC calculator",
      imageAlt: "HELOC calculator",
      imageSizes: "sm",
      imageSrc: "/images/homepage/learning-center/heloc-calculator.webp",
      href: "/mortage-calc",
      description:
        "Need cash? Quickly see how much equity you can borrow from your home and what your monthly payments might be.",
    },
    {
      title: "Fixed-rate loan comparison calculator",
      imageAlt: "Fixed-rate calculator",
      imageSizes: "sm",
      imageSrc: "/images/homepage/learning-center/fixed-rate-calculator.webp",
      href: "/mortage-calc",
    },
  ];

  const guidesInfo = [
    {
      title: "What is a good debt-to-income ratio for a home loan?",
      imageAlt: "Good DTI",
      imageSizes: "sm",
      imageSrc: "/images/homepage/learning-center/good-dti.webp",
      href: "/not-found",
    },
    {
      title: "Buying a house without realtor",
      imageAlt: "Buy house without realtor",
      imageSizes: "sm",
      imageSrc: "/images/homepage/learning-center/buy-house-without-realtor.webp",
      href: "/not-found",
      description: "Thinking about buying a house without a real estate agent? Read this first.",
    },
    {
      title: "Timeline for homebuying process",
      imageAlt: "Timeline",
      imageSizes: "sm",
      imageSrc: "/images/homepage/learning-center/loan-timeline.webp",
      href: "/not-found",
      description:
        "Does the process of buying a home seem daunting? Don't stress, we broke it down into 8 easy steps.",
    },
    {
      title: "Conventional loan requirements",
      imageAlt: "Conventional loan",
      imageSizes: "sm",
      imageSrc: "/images/homepage/learning-center/conventional-loan.webp",
      href: "/not-found",
    },
  ];

  const productsInfo = [
    {
      title: "Buying your first home with Better",
      imageAlt: "First Home",
      imageSizes: "sm",
      imageSrc: "/images/homepage/learning-center/first-home.webp",
      href: "/not-found",
    },
    {
      title: "One Day Mortgage",
      imageAlt: "One day mortgage",
      imageSizes: "lg",
      imageSrc: "/images/homepage/learning-center/one-day-mortgage.webp",
      href: "/not-found",
      description:
        "Kick your home loan into hyperdrive. Going from locked rate to Commitment Letter takes weeks for traditional lenders. We do it in a single day. Traditional lenders deliver a Commitment Letter in a few weeks.",
    },
    {
      title: "Better HELOC",
      imageAlt: "Better HELOC",
      imageSizes: "sm",
      imageSrc: "/images/homepage/learning-center/better-heloc.webp",
      href: "/not-found",
      description:
        "Introducing One Day HELOC™—your express lane to getting cash from your home with our Home Equity Line of Credit",
    },
    {
      title: "Insurance",
      imageAlt: "Insurance",
      imageSizes: "lg",
      imageSrc: "/images/homepage/learning-center/insurance.webp",
      href: "/not-found",
    },
  ];

  const mapping: { [key: string]: typeof productsInfo } = {
    "products": productsInfo,
    "calculators": calaculatorsInfo,
    "guides": guidesInfo,
  };

  const [activeSection, setActiveSection] = useState("products");
  const activeClass =
    "w-auto shadow-accentBorderSecondary border-accentBorderSecondary shadow-[0_0_0_4px_inset] text-interactivePrimary";
  const inactiveClass = "border-strokeDivider text-interactiveForegroundInversePrimary w-auto";

  return (
    <section className="section w-full pb-base lg:pb-12">
      <div className="m-auto flex max-w-screen-2xl flex-col items-center md:items-start gap-8 px-6 py-20 md:px-10 lg:gap-[60px]">
        <div className="justify-left flex w-full max-w-lg flex-wrap gap-12 lg:gap-6 lg:max-w-none lg:items-end lg:justify-between">
          <h2 className="font-bold text-textPrimary leading-heading m-0 p-0 text-xl md:text-2xl md:tracking-tight w-full max-w-lg tracking-tight">
            Got questions?
            <br />
            We&#x27;ve got answers
          </h2>
          <div className="flex gap-3 overflow-x-scroll lg:gap-6 [&amp;::-webkit-scrollbar]:w-0 [&amp;::-webkit-scrollbar]:h-0">
            <button
              className={`inline-flex items-center justify-center whitespace-nowrap rounded-full text-base font-bold leading-normal disabled:pointer-events-none disabled:opacity-50 transition-all ease-in-out duration-200 border hover:shadow-accentBorderSecondary hover:border-accentBorderSecondary hover:shadow-[0_0_0_4px_inset] hover:text-interactivePrimary h-12 px-6 py-3 ${
                activeSection === "products" ? activeClass : inactiveClass
              }`}
              onClick={() => {
                setActiveSection("products");
              }}
            >
              Our products
            </button>
            <button
              className={`inline-flex items-center justify-center whitespace-nowrap rounded-full text-base font-bold leading-normal disabled:pointer-events-none disabled:opacity-50 transition-all ease-in-out duration-200 border hover:shadow-accentBorderSecondary hover:border-accentBorderSecondary hover:shadow-[0_0_0_4px_inset] hover:text-interactivePrimary h-12 px-6 py-3 ${
                activeSection === "calculators" ? activeClass : inactiveClass
              }`}
              onClick={() => {
                setActiveSection("calculators");
              }}
            >
              Calculators
            </button>
            <button
              className={`inline-flex items-center justify-center whitespace-nowrap rounded-full text-base font-bold leading-normal disabled:pointer-events-none disabled:opacity-50 transition-all ease-in-out duration-200 border hover:shadow-accentBorderSecondary hover:border-accentBorderSecondary hover:shadow-[0_0_0_4px_inset] hover:text-interactivePrimary h-12 px-6 py-3 ${
                activeSection === "guides" ? activeClass : inactiveClass
              }`}
              onClick={() => {
                setActiveSection("guides");
              }}
            >
              Guides & FAQs
            </button>
          </div>
        </div>

        <div className="flex flex-row flex-wrap justify-center gap-8 lg:gap-6">
          {mapping[activeSection].map((section, index): ReactNode => {
            return (
              <a
                className="flex w-full max-w-lg cursor-pointer flex-col gap-8 rounded-base bg-successBackground px-6 py-5 md:flex-row md:[&amp;&gt;img]:h-[100%] md:[&amp;&gt;img]:max-w-[285px] md:gap-10 md:max-w-full md:justify-between md:px-12 md:py-8 lg:flex-1 lg:flex-col lg:basis-1/4 lg:justify-between lg:gap-6 lg:px-12 lg:py-[35px] lg:max-w-lg lg:[&amp;&gt;img]:max-w-none lg:[&amp;:nth-child(2)&gt;*]:flex-1 lg:[&amp;:nth-child(2)&gt;img]:h-[100%] lg:[&amp;:nth-child(2)&gt;img]:max-w-[285px] lg:[&amp;:nth-child(2)]:max-w-none lg:[&amp;:nth-child(2)]:basis-3/5 lg:[&amp;:nth-child(2)]:flex-row lg:[&amp;:nth-child(2)]:gap-10 lg:[&amp;:nth-child(3)&gt;*]:flex-1 lg:[&amp;:nth-child(3)&gt;img]:h-[100%] lg:[&amp;:nth-child(3)&gt;img]:max-w-[285px] lg:[&amp;:nth-child(3)]:max-w-none lg:[&amp;:nth-child(3)]:basis-3/5 lg:[&amp;:nth-child(3)]:flex-row-reverse lg:[&amp;:nth-child(3)]:gap-10"
                href={section.href}
                key={index}
              >
                <div className="flex flex-col gap-6">
                  <h4 className="font-bold leading-heading m-0 p-0 w-auto md:text-2xl text-xl md:tracking-normal tracking-normal text-backgroundInversePrimary lg:text-xl">
                    {section.title}
                  </h4>
                  {section.description ? (
                    <p className="hidden flex-1 md:flex-none text-sm text-backgroundInversePrimary md:block">
                      {section.description}
                      <sup>1</sup>
                    </p>
                  ) : (
                    ""
                  )}
                  <div className="flex items-end justify-between">
                    <div className="group">
                      <svg
                        width="48"
                        height="49"
                        viewBox="0 0 48 49"
                        fill="none"
                        className="transition ease-universal duration-300 fill-transparent hover:fill-[#004733] [&amp;_path]:fill-[#004733] group-hover:[&amp;_path]:fill-white [&amp;_rect]:stroke-[#A4A8A4] group-hover:[&amp;_rect]:stroke-none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="0.5"
                          y="0.843384"
                          width="47"
                          height="47"
                          rx="23.5"
                          stroke="#A4A8A4"
                        ></rect>
                        <path
                          d="M24 16.3434L22.59 17.7534L28.17 23.3434H16V25.3434H28.17L22.59 30.9334L24 32.3434L32 24.3434L24 16.3434Z"
                          fill="#004733"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
                <Image
                  alt={section.imageAlt}
                  rel="preconnect"
                  width={200}
                  height={200}
                  decoding="async"
                  data-nimg="1"
                  style={{ color: "transparent" }}
                  className="w-full rounded-base object-cover h-[160px] md:h-[130px]"
                  src={section.imageSrc}
                />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Products;
