"use client";
import React, { useEffect, useState } from "react";
import Nav from "../components/nav";
import Image from "next/image";

function formatNumber(value: string): string {
  // Remove any non-digit characters (except for decimal points)
  const cleanedValue = value.replace(/[^0-9.]/g, "");

  // Convert to a number and format with commas
  const parts = cleanedValue.split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return parts.join(".");
}

function getNumberFromString(number: string): number {
  // Remove commas from the string
  const sanitizedString = number.replace(/,/g, "");

  // Convert the sanitized string to a number
  const parsedNumber = parseFloat(sanitizedString);

  // Return NaN if the conversion fails, or the parsed number otherwise
  return isNaN(parsedNumber) ? NaN : parsedNumber;
}

function Page() {
  const [mortageValue, setMortageValue] = useState<string>("200,000");
  const [interestRate, setInterestRate] = useState<string>("5");
  const [loanTerm, setLoanTerm] = useState<string>("15");
  const [loanPrinciple, setLoanPrincipal] = useState<number>(140000);
  const [downPayment, setDownPayment] = useState<number>(60000);
  const [monthlyPay, setMonthlyPay] = useState<number>(1107);
  const [accumulatedMonthlyPay, setAccumulatedMonthlyPay] = useState<number>(1107);

  const [propertyTax, SetPropertyTax] = useState<number>(265);
  const [ownersInsurance, setOwnersInsurance] = useState<number>(100);
  const [hoaFees, setHoaFees] = useState<number>(100);
  const [rangeVal, setRangeVal] = useState<number>(200000);

  const [showUtility, setShowUtility] = useState<boolean>(true);
  const [accumulatedUtilities, setAccumulatedUtilities] = useState<number>(100);
  const [waterTax, setWatertax] = useState<number>(25);
  const [gasTax, setGasTax] = useState<number>(25);
  const [internetTax, setInternetTax] = useState<number>(50);

  useEffect(() => {
    setAccumulatedUtilities(waterTax + gasTax + internetTax);
  }, [waterTax, gasTax, internetTax]);

  useEffect(() => {
    setMortageValue(formatNumber(rangeVal.toString()));
    setLoanPrincipal(rangeVal - downPayment);
  }, [rangeVal, downPayment]);

  useEffect(() => {
    const interest = interestRate.includes(".")
      ? parseFloat(interestRate) / 1200
      : parseInt(interestRate, 10) / 1200;
    const months = parseInt(loanTerm, 10) * 12;
    const payment =
      loanPrinciple * ((interest * (1 + interest) ** months) / ((1 + interest) ** months - 1));

    const accumulatedMonthlypay =
      payment + propertyTax + ownersInsurance + hoaFees + accumulatedUtilities;
    setMonthlyPay(Math.round(payment));
    setAccumulatedMonthlyPay(Math.round(accumulatedMonthlypay));
  }, [
    interestRate,
    loanTerm,
    mortageValue,
    loanPrinciple,
    propertyTax,
    ownersInsurance,
    hoaFees,
    accumulatedUtilities,
    rangeVal,
  ]);

  return (
    <div id="__next">
      <main className="__className_974306">
        <header className="sticky top-0 z-20 transition-all ease-in-out duration-300 bg-white">
          <Nav transparent={false} />
        </header>
        <section className="bg-successBackground py-16">
          <div className="m-auto max-w-screen-2xl justify-between px-6 md:px-14">
            <div className="flex·flex-col·justify-between·gap-x-lg">
              <div className="flex-1">
                <h1
                  className="font-bold text-textPrimary leading-heading m-0 p-0 w-auto text-4xl md:text-3xl tracking-tight md:tracking-tighter"
                  style={{ fontSize: "48px" }}
                >
                  Mortgage calculator
                </h1>
                <p className="font-normal leading-body m-0 p-0 text-left text-base my-lg pb-base text-textSecondary lg:max-w-3xl">
                  Our mortgage calculator includes key factors like homeowners association fees,
                  property taxes, and private mortgage insurance (PMI). Get the whole picture and
                  calculate your total monthly payment.
                </p>
                <div className="mb-lg flex w-full items-end gap-base">
                  <div className="grow">
                    <div className="w-full max-w-[300px]">
                      <label
                        className="leading-body m-0 p-0 text-left text-textPrimary font-bold mb-base block text-sm md:text-base"
                        htmlFor="home-price"
                      >
                        Home price
                      </label>
                      <div className="z-0 relative w-full text-lg md:text-[40px]">
                        <div className="p-2xs relative rounded-base bg-backgroundTertiary w-full border border-solid border-strokeBorder ease-in-out duration-300 whitespace-nowrap overflow-hidden truncate focus:shadow-accentBorderSecondary focus:border-accentBorderSecondary hover:shadow-accentBorderSecondary hover:border-accentBorderSecondary focus:shadow-[0_0_0_3px_inset] hover:shadow-[0_0_0_3px_inset] h-3xl lg:h-4xl">
                          <div
                            aria-hidden="true"
                            data-testid="input-icon-box"
                            className="top-[20px] absolute ease-in-out duration-300 transition-all font-bold mr-xs z-1 text-xl lg:text-3xl w-lg h-lg flex items-center justify-center lg:top-[30px] left-xs"
                          >
                            $
                          </div>
                          <input
                            name="home-price"
                            type="tel"
                            id="input-mortage"
                            autoCapitalize="off"
                            autoCorrect="off"
                            aria-invalid="false"
                            className="text-left relative outline-none border-none rounded-sm px-sm pb-none text-default font-bold w-full h-full box-border pl-[32px] text-xl lg:text-3xl"
                            value={mortageValue}
                            onChange={(e) => {
                              setRangeVal(getNumberFromString(e.target.value))
                              setMortageValue(formatNumber(e.target.value));
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grow">
                    <div className="w-full max-w-[300px]">
                      <p className="leading-body m-0 p-0 text-left text-textPrimary font-bold mb-base block text-sm md:text-base">
                        Monthly payment
                      </p>
                      <p
                        className="leading-body m-0 p-0 text-left my-lg flex h-[30px] items-baseline overflow-hidden text-xl font-bold text-textPrimary md:my-none md:h-2xl lg:h-4xl lg:text-3xl"
                        data-qa="monthly-payment"
                      >
                        ${accumulatedMonthlyPay}&nbsp;/mo
                      </p>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <a
                      className="rounded-base leading-body text-base text-center font-bold select-none outline-none transition duration-300 ease-universal focus:shadow-[0_0_0_4px_inset] disabled:text-interactiveForegroundMuted disabled:bg-interactiveMuted disabled:shadow-none text-interactiveForegroundPrimary bg-interactivePrimary hover:bg-accentPrimary focus:bg-accentPrimary focus:shadow-accentBorderPrimary active:bg-accentPrimary px-xl h-3xl w-auto inline-flex items-center justify-center min-w-[220px]"
                      href="/not-found"
                    >
                      Get pre-approved
                    </a>
                  </div>
                </div>
                <div className="relative mx-lg mt-8 mb-lg">
                  <input
                    type="range"
                    min="50000"
                    max="3000000"
                    step="100"
                    className="bg-textPrimary [&amp;::-webkit-slider-thumb]:bg-textPrimary rounded-base w-full cursor-pointer appearance-none focus:outline-none disabled:pointer-events-none disabled:opacity-50 [&amp;::-moz-range-thumb]:h-2.5 [&amp;::-moz-range-thumb]:w-2.5 [&amp;::-moz-range-thumb]:appearance-none [&amp;::-moz-range-thumb]:rounded-full [&amp;::-moz-range-thumb]:border-4 [&amp;::-moz-range-thumb]:transition-all [&amp;::-moz-range-thumb]:duration-150 [&amp;::-moz-range-thumb]:ease-in-out [&amp;::-moz-range-track]:h-2 [&amp;::-moz-range-track]:w-full [&amp;::-moz-range-track]:rounded-full [&amp;::-moz-range-track]:bg-gray-100 [&amp;::-webkit-slider-runnable-track]:h-1 [&amp;::-webkit-slider-runnable-track]:w-full [&amp;::-webkit-slider-runnable-track]:rounded-full [&amp;::-webkit-slider-runnable-track]:bg-gray-100 [&amp;::-webkit-slider-runnable-track]:dark:bg-neutral-700 [&amp;::-webkit-slider-thumb]:-mt-1.5 [&amp;::-webkit-slider-thumb]:h-4 [&amp;::-webkit-slider-thumb]:w-4 [&amp;::-webkit-slider-thumb]:appearance-none [&amp;::-webkit-slider-thumb]:rounded-full [&amp;::-webkit-slider-thumb]:transition-all [&amp;::-webkit-slider-thumb]:duration-150 [&amp;::-webkit-slider-thumb]:ease-in-out [&amp;::-webkit-slider-thumb]:dark:bg-neutral-700"
                    id="min-and-max-range-slider-usage"
                    style={{
                      backgroundImage: `linear-gradient(to right, rgb(41, 43, 41) ${
                        ((rangeVal - 50000) * 100) / 3000000
                      }%,#c8c9c6 ${
                        ((rangeVal - 50000) * 100) / 3000000
                      }%, rgb(200, 201, 198) 100%)`,
                    }}
                    value={rangeVal}
                    onChange={(e) => setRangeVal(getNumberFromString(e.target.value))}
                  />
                </div>
                <div className="mt-xl hidden md:block">
                  <div className="gap-x-5xl gap-y-px lg:flex">
                    <div className="flex flex-col md:flex-row flex-1 mb-base gap-base">
                      <div className="flex-1">
                        <div className="z-0 relative">
                          <div className="p-2xs relative rounded-base bg-backgroundTertiary w-full border border-solid border-strokeBorder ease-in-out duration-300 whitespace-nowrap overflow-hidden truncate focus:shadow-accentBorderSecondary focus:border-accentBorderSecondary hover:shadow-accentBorderSecondary hover:border-accentBorderSecondary focus:shadow-[0_0_0_3px_inset] hover:shadow-[0_0_0_3px_inset] h-3xl">
                            <label
                              htmlFor="input-"
                              id="-label"
                              className="text-base font-bold leading-body text-interactiveForegroundMuted absolute top-[20px] left-4 ease-in-out duration-300 transition-all transform-origin-top-left z-1"
                            >
                              ZIP code
                            </label>
                            <input
                              maxLength={5}
                              type="tel"
                              data-labelalign="top"
                              id="input-"
                              autoCapitalize="off"
                              autoCorrect="off"
                              className="text-left px-sm pb-none pt-[10px] relative outline-none border-none rounded-sm px-sm pb-none text-default font-bold w-full h-full box-border"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-1">
                        <div className="w-9/12">
                          <div className="z-0 relative [&amp;&gt;div:first-of-type]:rounded-r-none">
                            <div className="p-2xs relative rounded-base bg-backgroundTertiary w-full border border-solid border-strokeBorder ease-in-out duration-300 whitespace-nowrap overflow-hidden truncate focus:shadow-accentBorderSecondary focus:border-accentBorderSecondary hover:shadow-accentBorderSecondary hover:border-accentBorderSecondary focus:shadow-[0_0_0_3px_inset] hover:shadow-[0_0_0_3px_inset] h-3xl">
                              <label
                                htmlFor="input-"
                                id="-label"
                                className="leading-body text-interactiveForegroundMuted absolute left-4 ease-in-out duration-300 transition-all transform-origin-top-left z-1 top-[5px] text-xs font-normal"
                              >
                                Down payment
                              </label>
                              <div
                                aria-hidden="true"
                                data-testid="input-icon-box"
                                className="mr-xs absolute ease-in-out duration-300 transition-all font-bold mr-xs z-1 w-lg h-lg flex items-center justify-center top-[24px] left-xs"
                              >
                                $
                              </div>
                              <input
                                data-qa="downpayment"
                                name="downpayment"
                                type="tel"
                                data-labelalign="top"
                                id="input-"
                                autoCapitalize="off"
                                autoCorrect="off"
                                aria-invalid="false"
                                className="text-left px-sm pb-none pl-[32px] pt-[10px] relative outline-none border-none rounded-sm px-sm pb-none text-default font-bold w-full h-full box-border"
                                value={formatNumber(downPayment.toString())}
                                onChange={(e) => {
                                  const value = getNumberFromString(e.target.value);
                                  const mortageNumber = getNumberFromString(mortageValue);
                                  if (value < mortageNumber) {
                                    setDownPayment(value);
                                    const principal = mortageNumber - value;
                                    setLoanPrincipal(principal);
                                  }
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row flex-1 mb-base gap-base">
                      <div className="flex-1">
                        <div className="z-0 relative">
                          <div className="p-2xs relative rounded-base bg-backgroundTertiary w-full border border-solid border-strokeBorder ease-in-out duration-300 whitespace-nowrap overflow-hidden truncate focus:shadow-accentBorderSecondary focus:border-accentBorderSecondary hover:shadow-accentBorderSecondary hover:border-accentBorderSecondary focus:shadow-[0_0_0_3px_inset] hover:shadow-[0_0_0_3px_inset] h-3xl">
                            <label
                              htmlFor="input-"
                              id="-label"
                              className="leading-body text-interactiveForegroundMuted absolute left-4 ease-in-out duration-300 transition-all transform-origin-top-left z-1 top-[5px] text-xs font-normal"
                            >
                              Interest rate
                            </label>
                            <div
                              aria-hidden="true"
                              data-testid="input-icon-box"
                              className="mr-xs absolute ease-in-out duration-300 transition-all font-bold mr-xs z-1 w-lg h-lg flex items-center justify-center top-[24px] right-xs"
                            >
                              %
                            </div>
                            <input
                              data-labelalign="top"
                              type="tel"
                              id="input-"
                              autoCapitalize="off"
                              autoCorrect="off"
                              className="text-left px-sm pb-none pt-[10px] relative outline-none border-none rounded-sm px-sm pb-none text-default font-bold w-full h-full box-border"
                              value={interestRate}
                              onChange={(e) => {
                                const validInput = /^-?\d*\.?\d*$/;
                                // Only update state if the new value matches the regex (allows numbers and one decimal)
                                if (validInput.test(e.target.value)) {
                                  setInterestRate(e.target.value);
                                }
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="relative w-full">
                          <label
                            className="leading-body m-0 p-0 text-left text-interactiveForegroundMuted absolute left-base origin-top-left transition-all duration-300 ease-in-out z-1 top-[7px] text-xs font-normal"
                            htmlFor=""
                          >
                            Length of loan
                          </label>
                          <select
                            onChange={(e) => setLoanTerm(e.currentTarget.value)}
                            defaultValue={"15"}
                            className="truncate font-bold text-interactiveForegroundTertiary appearance-none bg-backgroundTertiary outline-none rounded-base border border-solid border-strokeBorder px-base w-full h-3xl p-2xs pb-none pt-base duration-300 ease-in-out z-0 focus:border-accentBorderSecondary focus:shadow-[0_0_0_3px_inset] focus:shadow-accentBorderSecondary hover:border-accentBorderSecondary hover:shadow-[0_0_0_3px_inset] hover:shadow-accentBorderSecondary flex-1"
                          >
                            <option value="30" label="30 years">
                              30 years
                            </option>
                            <option value="20" label="20 years">
                              20 years
                            </option>
                            <option value="15" label="15 years">
                              15 years
                            </option>
                          </select>
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            className="absolute pointer-events-none top-1/2 -translate-y-1/2 right-xs"
                          >
                            <path d="M7 9.5L12 14.5L17 9.5H7Z"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="block md:hidden">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginLeft: "small",
                      rowGap: "small",
                    }}
                  >
                    <a
                      className="rounded-base leading-body text-base text-center font-bold select-none outline-none transition duration-300 ease-universal focus:shadow-[0_0_0_4px_inset] disabled:text-interactiveForegroundMuted disabled:bg-interactiveMuted disabled:shadow-none text-interactiveForegroundPrimary bg-interactivePrimary hover:bg-accentPrimary focus:bg-accentPrimary focus:shadow-accentBorderPrimary active:bg-accentPrimary px-xl h-3xl w-auto inline-flex items-center justify-center min-w-[220px]"
                      href="/not-found"
                    >
                      Get pre-approved
                    </a>
                  </div>
                  <button className="rounded-base leading-body text-base text-center font-bold select-none outline-none transition duration-300 ease-universal focus:shadow-[0_0_0_4px_inset] disabled:text-interactiveForegroundMuted disabled:bg-interactiveMuted disabled:shadow-none text-interactiveForegroundTertiary bg-transparent border border-solid border-strokeBorder hover:text-interactivePrimary hover:border-transparent hover:shadow-[0_0_0_4px_inset] hover:shadow-accentBorderSecondary focus:border-transparent focus:shadow-accentBorderSecondary active:text-interactivePrimary px-xl h-3xl mt-lg flex w-full items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-plus"
                    >
                      <path d="M5 12h14"></path>
                      <path d="M12 5v14"></path>
                    </svg>
                    Add details
                  </button>
                  <div
                    className="p-base bg-backgroundPrimary px-lg shadow-lg fixed left-0 top-[70px] w-full z-[10000] invisible opacity-0"
                    data-qa="mobile-header"
                    // style={{
                    //     transition: `opacity linear 0s, visibility 0s`
                    //   }}
                  >
                    <div className="grid grid-cols-2 gap-xl">
                      <div>
                        <p className="leading-body m-0 p-0 text-left text-textSecondary text-sm mb-xs font-bold">
                          Home price
                        </p>
                        <p
                          className="leading-body m-0 p-0 text-base rounded-base bg-interactiveForegroundSecondary py-xs text-center font-bold text-textInversePrimary"
                          data-qa="mobile-header-home-price"
                        >
                          ${mortageValue}
                        </p>
                      </div>
                      <div>
                        <p className="leading-body m-0 p-0 text-left text-textSecondary text-sm mb-xs font-bold">
                          Monthly payment
                        </p>
                        <p
                          className="leading-body m-0 p-0 text-left text-textSecondary text-base pt-xs font-bold"
                          data-qa="mobile-header-monthly-payment"
                        >
                          ${monthlyPay}&nbsp;/mo
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-accentBorderInverseSecondary pt-4xl">
          <div className="m-auto max-w-screen-2xl justify-between px-6 md:px-14">
            <div className="grid md:grid-cols-2">
              <div>
                <h4 className="font-bold text-textPrimary leading-heading m-0 p-0 tracking-normal w-auto text-base md:text-lg">
                  Monthly payment breakdown
                </h4>
                <p
                  className="leading-body m-0 p-0 text-left mt-lg overflow-hidden text-3xl font-bold text-textPrimary"
                  data-testid="sum"
                >
                  ${accumulatedMonthlyPay}/mo
                </p>
                <div className="mt-2xl">
                  <svg height="100" id="svgelem" width="100%" xmlns="http://www.w3.org/2000/svg">
                    <rect
                      data-testid="principalPill"
                      height="80"
                      rx="0.5"
                      ry="0.5"
                      className="duration-300 ease-in-out fill-backgroundInverseSecondary"
                      width="1"
                      x="0"
                      y="0"
                    ></rect>
                    <rect
                      data-testid="taxesPill"
                      height="80"
                      rx="0.5"
                      ry="0.5"
                      className="duration-300 ease-in-out fill-infoSecondary"
                      width="1"
                      x="1"
                      y="0"
                    ></rect>
                    <rect
                      data-testid="insurancePill"
                      height="80"
                      rx="0.5"
                      ry="0.5"
                      className="duration-300 ease-in-out fill-graph2Tertiary"
                      width="1"
                      x="2"
                      y="0"
                    ></rect>
                    <rect
                      data-testid="hoaPill"
                      height="80"
                      rx="0.5"
                      ry="0.5"
                      className="duration-300 ease-in-out fill-graph4Tertiary"
                      width="1"
                      x="3"
                      y="0"
                    ></rect>
                    <rect
                      data-testid="utilitiesPill"
                      height="80"
                      rx="0.5"
                      ry="0.5"
                      className="duration-300 ease-in-out fill-graph3Tertiary"
                      width="1"
                      x="4"
                      y="0"
                    ></rect>
                    0
                  </svg>
                  <div className="md: block p-lg mt-2xl rounded-base shadow-[0_0_12px_rgba(41,43,41,0.12)] opacity-0 duration-300 ease-in-out">
                    <h4 className="font-bold text-textPrimary leading-heading m-0 p-0 tracking-normal w-auto text-base md:text-lg mb-lg"></h4>
                    <p
                      className="font-normal leading-body m-0 p-0 text-left text-textPrimary text-base"
                      data-testid="description"
                    ></p>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex justify-between h-3xl mb-base">
                  <div className="flex items-center text-textPrimary w-1/2">
                    <div className="rounded-sm h-base w-[5px] mr-xs bg-backgroundInverseSecondary"></div>
                    <p className="font-normal leading-body m-0 p-0 text-left text-textPrimary text-base">
                      Principal & interest
                    </p>
                  </div>
                  <p
                    className="leading-body m-0 p-0 text-base pt-0 items-center text-left w-1/2 sm:w-[160px] flex font-bold text-interactiveForegroundSecondary"
                    data-testid="principal-&amp;-interest"
                  >
                    ${monthlyPay}
                  </p>
                </div>
                <div className="flex justify-between h-3xl mb-base">
                  <div className="flex items-center text-textPrimary w-1/2">
                    <div className="rounded-sm h-base w-[5px] mr-xs bg-infoSecondary"></div>
                    <label
                      className="font-normal leading-body m-0 p-0 text-left text-textPrimary text-base"
                      htmlFor="input-taxes"
                      id="taxes-label"
                    >
                      Property taxes
                    </label>
                  </div>
                  <div className="z-0 relative pt-0 items-center text-left w-1/2 sm:w-[160px]">
                    <div className="p-2xs relative rounded-base bg-backgroundTertiary w-full border border-solid border-strokeBorder ease-in-out duration-300 whitespace-nowrap overflow-hidden truncate focus:shadow-accentBorderSecondary focus:border-accentBorderSecondary hover:shadow-accentBorderSecondary hover:border-accentBorderSecondary focus:shadow-[0_0_0_3px_inset] hover:shadow-[0_0_0_3px_inset] h-3xl">
                      <div
                        aria-hidden="true"
                        data-testid="input-icon-box"
                        className="mr-xs top-[20px] absolute ease-in-out duration-300 transition-all font-bold mr-xs z-1 w-lg h-lg flex items-center justify-center left-xs"
                      >
                        $
                      </div>
                      <input
                        aria-describedby="-help-text"
                        name="taxes"
                        role="textbox"
                        type="number"
                        data-labelalign="top"
                        id="input-"
                        autoCapitalize="off"
                        autoCorrect="off"
                        aria-errormessage="-help-text"
                        className="text-right px-sm pb-none pl-[32px] relative outline-none border-none rounded-sm px-sm pb-none text-default font-bold w-full h-full box-border"
                        value={propertyTax}
                        onChange={(e) => {
                          SetPropertyTax(getNumberFromString(e.target.value));
                        }}
                      />
                    </div>
                    <div
                      className="font-normal leading-body m-0 p-0 text-left text-xs flex pt-xs text-interactiveForegroundMuted flex-row-reverse pl-auto pr-sm"
                      id="-help-text"
                    ></div>
                  </div>
                </div>
                <div className="flex justify-between h-3xl mb-base">
                  <div className="flex items-center text-textPrimary w-1/2">
                    <div className="rounded-sm h-base w-[5px] mr-xs bg-graph2Tertiary"></div>
                    <label
                      className="font-normal leading-body m-0 p-0 text-left text-textPrimary text-base"
                      htmlFor="input-insurance"
                      id="insurance-label"
                    >
                      Homeowners insurance
                    </label>
                  </div>
                  <div className="z-0 relative pt-0 items-center text-left w-1/2 sm:w-[160px]">
                    <div className="p-2xs relative rounded-base bg-backgroundTertiary w-full border border-solid border-strokeBorder ease-in-out duration-300 whitespace-nowrap overflow-hidden truncate focus:shadow-accentBorderSecondary focus:border-accentBorderSecondary hover:shadow-accentBorderSecondary hover:border-accentBorderSecondary focus:shadow-[0_0_0_3px_inset] hover:shadow-[0_0_0_3px_inset] h-3xl">
                      <div
                        aria-hidden="true"
                        data-testid="input-icon-box"
                        className="mr-xs top-[20px] absolute ease-in-out duration-300 transition-all font-bold mr-xs z-1 w-lg h-lg flex items-center justify-center left-xs"
                      >
                        $
                      </div>
                      <input
                        aria-describedby="-help-text"
                        name="insurance"
                        role="textbox"
                        type="number"
                        data-labelalign="top"
                        id="input-"
                        autoCapitalize="off"
                        autoCorrect="off"
                        aria-errormessage="-help-text"
                        className="text-right px-sm pb-none pl-[32px] relative outline-none border-none rounded-sm px-sm pb-none text-default font-bold w-full h-full box-border"
                        value={ownersInsurance}
                        onChange={(e) => {
                          setOwnersInsurance(getNumberFromString(e.target.value));
                        }}
                      />
                    </div>
                    <div
                      className="font-normal leading-body m-0 p-0 text-left text-xs flex pt-xs text-interactiveForegroundMuted flex-row-reverse pl-auto pr-sm"
                      id="-help-text"
                    ></div>
                  </div>
                </div>
                <div className="flex justify-between h-3xl mb-base">
                  <div className="flex items-center text-textPrimary w-1/2">
                    <div className="rounded-sm h-base w-[5px] mr-xs bg-graph4Tertiary"></div>
                    <label
                      className="font-normal leading-body m-0 p-0 text-left text-textPrimary text-base"
                      htmlFor="input-hoa"
                      id="hoa-label"
                    >
                      HOA fees
                    </label>
                  </div>
                  <div className="z-0 relative pt-0 items-center text-left w-1/2 sm:w-[160px]">
                    <div className="p-2xs relative rounded-base bg-backgroundTertiary w-full border border-solid border-strokeBorder ease-in-out duration-300 whitespace-nowrap overflow-hidden truncate focus:shadow-accentBorderSecondary focus:border-accentBorderSecondary hover:shadow-accentBorderSecondary hover:border-accentBorderSecondary focus:shadow-[0_0_0_3px_inset] hover:shadow-[0_0_0_3px_inset] h-3xl">
                      <div
                        aria-hidden="true"
                        data-testid="input-icon-box"
                        className="mr-xs top-[20px] absolute ease-in-out duration-300 transition-all font-bold mr-xs z-1 w-lg h-lg flex items-center justify-center left-xs"
                      >
                        $
                      </div>
                      <input
                        aria-describedby="-help-text"
                        name="hoa"
                        role="textbox"
                        type="number"
                        data-labelalign="top"
                        id="input-"
                        autoCapitalize="off"
                        autoCorrect="off"
                        aria-errormessage="-help-text"
                        className="text-right px-sm pb-none pl-[32px] relative outline-none border-none rounded-sm px-sm pb-none text-default font-bold w-full h-full box-border"
                        value={hoaFees}
                        onChange={(e) => {
                          setHoaFees(getNumberFromString(e.target.value));
                        }}
                      />
                    </div>
                    <div
                      className="font-normal leading-body m-0 p-0 text-left text-xs flex pt-xs text-interactiveForegroundMuted flex-row-reverse pl-auto pr-sm"
                      id="-help-text"
                    ></div>
                  </div>
                </div>
                <div className="mb-lg" data-orientation="vertical">
                  <div data-state="closed" data-orientation="vertical" className="">
                    <h3 data-orientation="vertical" data-state="closed" className="flex">
                      <button
                        onClick={() => {
                          setShowUtility((prev) => !prev);
                        }}
                        type="button"
                        aria-controls="radix-:R5d6m:"
                        aria-expanded="false"
                        // data-state={showUtility ? "open" : "closed"}
                        data-orientation="vertical"
                        id="radix-:R1d6m:"
                        className="flex flex-1 items-center justify-between py-4 font-bold transition-all [&amp;[data-state=open]&gt;svg]:rotate-180"
                        data-radix-collection-item=""
                      >
                        <div
                          className="flex justify-between h-3xl h-auto mb-0 w-full"
                          data-testid="open-utilities"
                        >
                          <div className="flex items-center text-textPrimary w-auto">
                            <div className="rounded-sm h-base w-[5px] mr-xs bg-graph3Tertiary"></div>
                            <p
                              className="font-normal leading-body m-0 p-0 text-left text-textPrimary text-base"
                              id="utilities-label"
                            >
                              Utilities
                            </p>
                          </div>
                          <span className="leading-body m-0 p-0 text-textPrimary text-base w-[144px] text-left font-bold">
                            $&nbsp;{accumulatedUtilities}
                          </span>
                        </div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-chevron-down h-4 w-4 shrink-0 transition-transform duration-200"
                        >
                          <path d="m6 9 6 6 6-6"></path>
                        </svg>
                      </button>
                    </h3>
                    <div
                      id="radix-:R5d6m:"
                      hidden={showUtility}
                      role="region"
                      aria-labelledby="radix-:R1d6m:"
                      data-orientation="vertical"
                      className={`overflow-hidden text-sm transition-all ${
                        showUtility ? "animate-accordion-down" : "animate-accordion-up"
                      }`}
                    >
                      <div className="pb-4 pt-base">
                        <div className="flex justify-between h-3xl mb-base">
                          <div className="flex items-center text-textPrimary w-1/2">
                            <label
                              className="font-normal leading-body m-0 p-0 text-left text-textPrimary text-base"
                              htmlFor="input-water"
                              id="water-label"
                            >
                              Water/Sewer
                            </label>
                          </div>
                          <div className="z-0 relative pt-0 items-center text-left w-1/2 sm:w-[160px]">
                            <div className="p-2xs relative rounded-base bg-backgroundTertiary w-full border border-solid border-strokeBorder ease-in-out duration-300 whitespace-nowrap overflow-hidden truncate focus:shadow-accentBorderSecondary focus:border-accentBorderSecondary hover:shadow-accentBorderSecondary hover:border-accentBorderSecondary focus:shadow-[0_0_0_3px_inset] hover:shadow-[0_0_0_3px_inset] h-3xl">
                              <div
                                aria-hidden="true"
                                data-testid="input-icon-box"
                                className="mr-xs top-[20px] absolute ease-in-out duration-300 transition-all font-bold mr-xs z-1 w-lg h-lg flex items-center justify-center left-xs"
                              >
                                $
                              </div>
                              <input
                                aria-describedby="water-help-text"
                                data-testid="water-input"
                                name="water"
                                role="textbox"
                                type="number"
                                data-labelalign="top"
                                id="input-water"
                                autoCapitalize="off"
                                autoCorrect="off"
                                aria-errormessage="water-help-text"
                                className="text-right px-sm pb-none pl-[32px] relative outline-none border-none rounded-sm px-sm pb-none text-default font-bold w-full h-full box-border"
                                value={waterTax}
                                onChange={(e) => {
                                  setWatertax(getNumberFromString(e.target.value));
                                }}
                              />
                            </div>
                            <div
                              className="font-normal leading-body m-0 p-0 text-left text-xs flex pt-xs text-interactiveForegroundMuted flex-row-reverse pl-auto pr-sm"
                              id="water-help-text"
                            >
                              {" "}
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between h-3xl mb-base">
                          <div className="flex items-center text-textPrimary w-1/2">
                            <label
                              className="font-normal leading-body m-0 p-0 text-left text-textPrimary text-base"
                              htmlFor="input-gas"
                              id="hoa-label"
                            >
                              Gas
                            </label>
                          </div>
                          <div className="z-0 relative pt-0 items-center text-left w-1/2 sm:w-[160px]">
                            <div className="p-2xs relative rounded-base bg-backgroundTertiary w-full border border-solid border-strokeBorder ease-in-out duration-300 whitespace-nowrap overflow-hidden truncate focus:shadow-accentBorderSecondary focus:border-accentBorderSecondary hover:shadow-accentBorderSecondary hover:border-accentBorderSecondary focus:shadow-[0_0_0_3px_inset] hover:shadow-[0_0_0_3px_inset] h-3xl">
                              <div
                                aria-hidden="true"
                                data-testid="input-icon-box"
                                className="mr-xs top-[20px] absolute ease-in-out duration-300 transition-all font-bold mr-xs z-1 w-lg h-lg flex items-center justify-center left-xs"
                              >
                                $
                              </div>
                              <input
                                aria-describedby="gas-help-text"
                                data-testid="gas-input"
                                name="gas"
                                role="textbox"
                                type="number"
                                data-labelalign="top"
                                id="input-gas"
                                autoCapitalize="off"
                                autoCorrect="off"
                                aria-errormessage="gas-help-text"
                                className="text-right px-sm pb-none pl-[32px] relative outline-none border-none rounded-sm px-sm pb-none text-default font-bold w-full h-full box-border"
                                value={gasTax}
                                onChange={(e) => {
                                  setGasTax(getNumberFromString(e.target.value));
                                }}
                              />
                            </div>
                            <div
                              className="font-normal leading-body m-0 p-0 text-left text-xs flex pt-xs text-interactiveForegroundMuted flex-row-reverse pl-auto pr-sm"
                              id="gas-help-text"
                            >
                              {" "}
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between h-3xl mb-base">
                          <div className="flex items-center text-textPrimary w-1/2">
                            <label
                              className="font-normal leading-body m-0 p-0 text-left text-textPrimary text-base"
                              htmlFor="input-internet"
                              id="internet-label"
                            >
                              Internet
                            </label>
                          </div>
                          <div className="z-0 relative pt-0 items-center text-left w-1/2 sm:w-[160px]">
                            <div className="p-2xs relative rounded-base bg-backgroundTertiary w-full border border-solid border-strokeBorder ease-in-out duration-300 whitespace-nowrap overflow-hidden truncate focus:shadow-accentBorderSecondary focus:border-accentBorderSecondary hover:shadow-accentBorderSecondary hover:border-accentBorderSecondary focus:shadow-[0_0_0_3px_inset] hover:shadow-[0_0_0_3px_inset] h-3xl">
                              <div
                                aria-hidden="true"
                                data-testid="input-icon-box"
                                className="mr-xs top-[20px] absolute ease-in-out duration-300 transition-all font-bold mr-xs z-1 w-lg h-lg flex items-center justify-center left-xs"
                              >
                                $
                              </div>
                              <input
                                aria-describedby="internet-help-text"
                                data-testid="internet-input"
                                name="internet"
                                role="textbox"
                                type="number"
                                data-labelalign="top"
                                id="input-internet"
                                autoCapitalize="off"
                                autoCorrect="off"
                                aria-errormessage="internet-help-text"
                                className="text-right px-sm pb-none pl-[32px] relative outline-none border-none rounded-sm px-sm pb-none text-default font-bold w-full h-full box-border"
                                value={internetTax}
                                onChange={(e) => {
                                  setInternetTax(getNumberFromString(e.target.value));
                                }}
                              />
                            </div>
                            <div
                              className="font-normal leading-body m-0 p-0 text-left text-xs flex pt-xs text-interactiveForegroundMuted flex-row-reverse pl-auto pr-sm"
                              id="internet-help-text"
                            >
                              {" "}
                            </div>
                          </div>
                        </div>
                        {/* <div className="relative flex items-center">
                          <button
                            type="button"
                            className="flex flex-row items-center justify-center p-sm w-2xl h-2xl rounded-base cursor-pointer appearance-none border-none transition-all ease-in-out duration-300 bg-transparent focus:bg-interactiveSecondary hover:bg-interactiveSecondary disabled:bg-transparent disabled:cursor-default"
                            role="checkbox"
                            aria-checked="false"
                            aria-labelledby="8-label"
                          >
                            <div
                              aria-hidden="true"
                              className="flex items-center justify-center border-[1px] border-interactiveForegroundTertiary h-lg w-lg p-2xs rounded-sm pointer-events-none transition-[border] ease-in-out duration-300 focus:border-interactivePrimary hover:border-interactivePrimary"
                            >
                              <svg
                                aria-hidden="true"
                                width={13}
                                height={10}
                                viewBox="0 0 13 10"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                focusable="false"
                                className="transition-all duration-300 ease-in-out"
                              >
                                <path
                                  d="M11.8 1L4.6 8.2L1 4.6"
                                  strokeWidth={2}
                                  strokeMiterlimit={10}
                                />
                              </svg>
                            </div>
                          </button>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  className="inline-block rounded-base leading-body text-base text-center font-bold select-none outline-none transition duration-300 ease-universal focus:shadow-[0_0_0_4px_inset] disabled:text-interactiveForegroundMuted disabled:bg-interactiveMuted disabled:shadow-none text-interactiveForegroundSecondary bg-interactiveSecondary hover:bg-accentSecondary focus:bg-accentSecondary focus:shadow-accentBorderSecondary active:bg-accentSecondary px-xl h-3xl w-auto mb-xs"
                  data-testid="copyLink"
                >
                  Copy estimate link
                </button>
              </div>
            </div>
          </div>
        </section>
        <div className="bg-accentBorderInverseSecondary">
          <section
            id="seo-section-wrapper"
            className="gap-x-lg [&amp;&gt;p]:text-textSecondary py-16 md:flex-row [&amp;&gt;h2]:mb-xl [&amp;&gt;h3]:my-lg [&amp;&gt;p]:my-sm m-auto max-w-screen-2xl justify-between px-6 md:px-14"
          >
            <hr className="my-12 border-t border-strokeDivider" />
            <h2 className="font-bold text-textPrimary leading-heading m-0 p-0 tracking-normal w-auto text-xl md:text-2xl md:tracking-tight">
              How does a mortgage calculator help me?
            </h2>
            <p className="font-normal leading-body m-0 p-0 text-left text-textPrimary text-base">
              When deciding how much house you can afford, one of the most important pieces to
              determine is whether a home will fit into your monthly budget. A mortgage calculator
              helps you understand the monthly cost of a home. And ours will allow you to enter
              different down payments and interest rates to help determine what is affordable
              htmlFor you.
            </p>
            <hr className="my-12 border-t border-strokeDivider" />
            <h2 className="font-bold text-textPrimary leading-heading m-0 p-0 tracking-normal w-auto text-xl md:text-2xl md:tracking-tight">
              How much monthly mortgage payment can I afford?
            </h2>
            <p className="font-normal leading-body m-0 p-0 text-left text-textPrimary text-base">
              Lenders determine how much you can afford on a monthly housing payment by calculating
              your&nbsp;
              <a
                className="font-normal underline focus:outline-interactivePrimary focus:outline-1 focus:outline-offset-[theme(spacing.2xs)] text-interactivePrimary"
                href="/not-found"
              >
                debt-to-income ratio (DTI)
              </a>
              . The maximum DTI you can have in order to qualify htmlFor most mortgage loans is
              often between 45-50%, with your anticipated housing costs included.
            </p>
            <p className="font-normal leading-body m-0 p-0 text-left text-textPrimary text-base">
              Your DTI is the balance between your income and your debt. It helps lenders understand
              how safe or risky it is htmlFor them to approve your loan. A DTI ratio represents how
              much of your gross monthly income is spoken htmlFor by creditors, and how much of it
              is left over to you as disposable income. It&#8216;s most commonly written as a
              percentage. For example, if you pay half your monthly income in debt payments, you
              would have a DTI of 50%.
            </p>
            <div className="flex flex-col items-center">
              <div>
                <p className="font-normal leading-body m-0 p-0 text-left text-textPrimary text-base my-sm">
                  Formula htmlFor calculating your debt-to-income (DTI) ratio:
                </p>
                <Image
                  alt="Mortgage calculator | Debt to income ratio (DTI) formula"
                  loading="lazy"
                  width="780"
                  height="153"
                  decoding="async"
                  data-nimg="1"
                  // style="color: transparent"
                  src="/images/calculator/dti-formula.jpg"
                />
                <p className="font-normal leading-body m-0 p-0 text-left text-textPrimary text-base my-sm">
                  Here&apos;s an example of what calculating your DTI might look like:
                </p>
                <Image
                  alt="Mortgage calculator | Debt to income ratio (DTI) formula example"
                  loading="lazy"
                  width="780"
                  height="525"
                  decoding="async"
                  data-nimg="1"
                  // style="color: transparent"
                  src="/images/calculator/dti-example.jpg"
                />
              </div>
            </div>
            <hr className="my-12 border-t border-strokeDivider" />
            <h2 className="font-bold text-textPrimary leading-heading m-0 p-0 tracking-normal w-auto text-xl md:text-2xl md:tracking-tight">
              How to calculate monthly mortgage payments&nbsp;?
            </h2>
            <p className="font-normal leading-body m-0 p-0 text-left text-textPrimary text-base">
              Your monthly mortgage payment includes loan principal and interest, property taxes,
              homeowners insurance, and mortgage insurance (PMI), if applicable. While not typically
              included in your mortgage payment, homeowners also pay monthly utilities and sometimes
              pay homeowners association (HOA) fees, so it&apos;s a good idea to factor these into
              your monthly budget. This mortgage calculator factors in all these typical monthly
              costs so you can really crunch the numbers.
            </p>
            <h3 className="font-bold text-textPrimary leading-heading m-0 p-0 tracking-normal w-auto text-lg md:text-xl">
              Formula htmlFor calculating monthly mortgage payments
            </h3>
            <p className="font-normal leading-body m-0 p-0 text-left text-textPrimary text-base">
              The easiest way to calculate your mortgage payment is to use a calculator, but htmlFor
              the curious or mathematically inclined, here&apos;s the formula htmlFor calculating
              principal and interest yourself:
            </p>
            <div className="flex flex-col items-center">
              <div>
                <Image
                  alt="Mortgage calculator | Monthly mortgage payment formula"
                  loading="lazy"
                  width="780"
                  height="126"
                  decoding="async"
                  data-nimg="1"
                  // style="color: transparent"
                  src="/images/calculator/monthly-mortgage-payments-formula.jpg"
                />
                <div>
                  <p className="font-normal leading-body m-0 p-0 text-left text-textPrimary text-base my-sm">
                    Where:
                  </p>
                  <ul className="ml-xl list-disc">
                    <li>
                      <p className="font-normal leading-body m-0 p-0 text-left text-textPrimary text-base my-sm">
                        <b>M</b> is monthly mortgage payments
                      </p>
                    </li>
                    <li>
                      <p className="font-normal leading-body m-0 p-0 text-left text-textPrimary text-base my-sm">
                        <b>P</b> is the principal loan amount (the amount you borrow)
                      </p>
                    </li>
                    <li>
                      <p className="font-normal leading-body m-0 p-0 text-left text-textPrimary text-base my-sm">
                        <b>r</b> is the monthly interest rate
                        <br />
                        (annual interest rate divided by 12 and expressed as a decimal)
                        <br />
                        <small>
                          For example:
                          <br />
                          if the annual interest rate is <b>5%</b>,<br />
                          the monthly rate would be <b>0.05/12</b> = .00417, or&nbsp;
                          <b>.417%</b>
                        </small>
                      </p>
                    </li>
                    <li>
                      <p className="font-normal leading-body m-0 p-0 text-left text-textPrimary text-base my-sm">
                        <b>n</b> is the total number of payments in months
                        <br />
                        <small>
                          For example:
                          <br />
                          htmlFor a 30-year loan, n = 30x12 =<b>360</b> months
                        </small>
                      </p>
                    </li>
                  </ul>
                  <p className="font-normal leading-body m-0 p-0 text-left text-textPrimary text-base my-sm">
                    Here&#8216;s a simple example:
                  </p>
                  <Image
                    alt="Mortgage calculator | Monthly mortgage payment formula example"
                    loading="lazy"
                    width="780"
                    height="221"
                    decoding="async"
                    data-nimg="1"
                    // style="color: transparent"
                    src="/images/calculator/monthly-mortgage-payments-example.jpg"
                  />
                </div>
              </div>
            </div>
            <p className="font-normal leading-body m-0 p-0 text-left text-textPrimary text-base">
              This formula assumes a fixed-rate mortgage, where the interest rate remains constant
              throughout the loan term. And remember, you&apos;ll still need to add on taxes,
              insurance, utilities, and HOA fees if applicable.
            </p>
            <hr className="my-12 border-t border-strokeDivider" />
            <h3 className="font-bold text-textPrimary leading-heading m-0 p-0 tracking-normal w-auto text-lg md:text-xl">
              How to use this mortgage calculator?
            </h3>
            <p className="font-normal leading-body m-0 p-0 text-left text-textPrimary text-base">
              Play around with different home prices, locations,&nbsp;
              <a
                className="font-normal underline focus:outline-interactivePrimary focus:outline-1 focus:outline-offset-[theme(spacing.2xs)] text-interactivePrimary"
                href="/not-found"
              >
                down payments
              </a>
              , interest rates, and mortgage lengths to see how they impact your monthly mortgage
              payments.
            </p>
            <p className="font-normal leading-body m-0 p-0 text-left text-textPrimary text-base">
              Increasing your down payment and decreasing your interest rate and mortgage term
              length will make your monthly payment go down. Taxes, insurance, and HOA fees will
              vary by location. If you enter a down payment amount that&apos;s less than 20% of the
              home price,&nbsp;
              <a
                className="font-normal underline focus:outline-interactivePrimary focus:outline-1 focus:outline-offset-[theme(spacing.2xs)] text-interactivePrimary"
                href="/not-found"
              >
                private mortgage insurance (PMI)
              </a>
              &nbsp;costs will be added to your monthly mortgage payment. As the costs of utilities
              can vary from county to county, we&apos;ve included a utilities estimate that you can
              break down by service. If you&apos;re thinking about buying a condo or into a
              community with a Homeowners Association (HOA), you can add HOA fees.
            </p>
            <p className="font-normal leading-body m-0 p-0 text-left text-textPrimary text-base">
              The only amounts we haven&apos;t included are the money you&apos;ll need to save
              htmlFor annual home maintenance/repairs or the costs of home improvements. To see how
              much home you can afford including these costs, take a look at the&nbsp;
              <a
                className="font-normal underline focus:outline-interactivePrimary focus:outline-1 focus:outline-offset-[theme(spacing.2xs)] text-interactivePrimary"
                href="/not-found"
              >
                Better home affordability calculator
              </a>
              .
            </p>
            <p className="font-normal leading-body m-0 p-0 text-left text-textPrimary text-base">
              Fun fact:&nbsp;
              <a
                className="font-normal underline focus:outline-interactivePrimary focus:outline-1 focus:outline-offset-[theme(spacing.2xs)] text-interactivePrimary"
                href="/not-found"
              >
                Property tax rates
              </a>
              &nbsp;are extremely localized, so two homes of roughly the same size and quality on
              either side of a municipal border could have very different tax rates. Buying in an
              area with a lower property tax rate may make it easier htmlFor you to afford a
              higher-priced home.
            </p>
            <h3 className="font-bold text-textPrimary leading-heading m-0 p-0 tracking-normal w-auto text-lg md:text-xl">
              Do you know your property tax rate?
            </h3>
            <p className="font-normal leading-body m-0 p-0 text-left text-textPrimary text-base">
              While exact property tax rates vary by county, it can be helpful to look at taxes on
              the state level to get an idea htmlFor taxes in your state. Here&apos;s a helpful
              chart from&nbsp;
              <a
                className="font-normal underline focus:outline-interactivePrimary focus:outline-1 focus:outline-offset-[theme(spacing.2xs)] text-interactivePrimary"
                href="/not-found"
              >
                Forbes
              </a>
              &nbsp;breaking down the Census Bureau&apos;s 2021 American Community Survey 5-year
              estimate:
            </p>
            <div className="my-3xl">
              <div className="relative pointer group w-full h-full overflow-scroll" tabIndex={0}>
                <table className="min-w-full border border-successAccent table-auto clip-inset-round">
                  <thead className="">
                    <tr>
                      <th className="border border-strokeInverseBorder text-center bg-accentPrimary px-2 py-3 md:px-4">
                        <p className="leading-body m-0 p-0 text-sm text-center text-textInversePrimary font-bold">
                          State
                        </p>
                      </th>
                      <th className="border border-strokeInverseBorder text-center bg-accentPrimary px-2 py-3 md:px-4">
                        <p className="leading-body m-0 p-0 text-sm text-center text-textInversePrimary font-bold">
                          Median Effective Property Tax Rate
                        </p>
                      </th>
                      <th className="border border-strokeInverseBorder text-center bg-accentPrimary px-2 py-3 md:px-4">
                        <p className="leading-body m-0 p-0 text-sm text-center text-textInversePrimary font-bold">
                          Mean Effective Property Tax Rate
                        </p>
                      </th>
                      <th className="border border-strokeInverseBorder text-center bg-accentPrimary px-2 py-3 md:px-4">
                        <p className="leading-body m-0 p-0 text-sm text-center text-textInversePrimary font-bold">
                          Median Home Value
                        </p>
                      </th>
                      <th className="border border-strokeInverseBorder text-center bg-accentPrimary px-2 py-3 md:px-4">
                        <p className="leading-body m-0 p-0 text-sm text-center text-textInversePrimary font-bold">
                          Median Property Taxes Paid
                        </p>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="even:bg-successBackground">
                      <td className="border border-successAccent text-center px-2 py-3 md:px-4">
                        <p className="font-normal leading-body m-0 p-0 text-sm text-center text-textSecondary">
                          AL
                        </p>
                      </td>
                      <td className="border border-successAccent text-center px-2 py-3 md:px-4">
                        <p className="font-normal leading-body m-0 p-0 text-sm text-center text-textSecondary">
                          0.41%
                        </p>
                      </td>
                      <td className="border border-successAccent text-center px-2 py-3 md:px-4">
                        <p className="font-normal leading-body m-0 p-0 text-sm text-center text-textSecondary">
                          0.40%
                        </p>
                      </td>
                      <td className="border border-successAccent text-center px-2 py-3 md:px-4">
                        <p className="font-normal leading-body m-0 p-0 text-sm text-center text-textSecondary">
                          $157,100
                        </p>
                      </td>
                      <td className="border border-successAccent text-center px-2 py-3 md:px-4">
                        <p className="font-normal leading-body m-0 p-0 text-sm text-center text-textSecondary">
                          $646
                        </p>
                      </td>
                    </tr>
                    <tr className="even:bg-successBackground">
                      <td className="border border-successAccent text-center px-2 py-3 md:px-4">
                        <p className="font-normal leading-body m-0 p-0 text-sm text-center text-textSecondary">
                          AK
                        </p>
                      </td>
                      <td className="border border-successAccent text-center px-2 py-3 md:px-4">
                        <p className="font-normal leading-body m-0 p-0 text-sm text-center text-textSecondary">
                          1.23%
                        </p>
                      </td>
                      <td className="border border-successAccent text-center px-2 py-3 md:px-4">
                        <p className="font-normal leading-body m-0 p-0 text-sm text-center text-textSecondary">
                          1.04%
                        </p>
                      </td>
                      <td className="border border-successAccent text-center px-2 py-3 md:px-4">
                        <p className="font-normal leading-body m-0 p-0 text-sm text-center text-textSecondary">
                          $282,800
                        </p>
                      </td>
                      <td className="border border-successAccent text-center px-2 py-3 md:px-4">
                        <p className="font-normal leading-body m-0 p-0 text-sm text-center text-textSecondary">
                          $3,464
                        </p>
                      </td>
                    </tr>
                    <tr className="even:bg-successBackground">
                      <td className="border border-successAccent text-center px-2 py-3 md:px-4">
                        <p className="font-normal leading-body m-0 p-0 text-sm text-center text-textSecondary">
                          AZ
                        </p>
                      </td>
                      <td className="border border-successAccent text-center px-2 py-3 md:px-4">
                        <p className="font-normal leading-body m-0 p-0 text-sm text-center text-textSecondary">
                          0.62%
                        </p>
                      </td>
                      <td className="border border-successAccent text-center px-2 py-3 md:px-4">
                        <p className="font-normal leading-body m-0 p-0 text-sm text-center text-textSecondary">
                          0.63%
                        </p>
                      </td>
                      <td className="border border-successAccent text-center px-2 py-3 md:px-4">
                        <p className="font-normal leading-body m-0 p-0 text-sm text-center text-textSecondary">
                          $265,600
                        </p>
                      </td>
                      <td className="border border-successAccent text-center px-2 py-3 md:px-4">
                        <p className="font-normal leading-body m-0 p-0 text-sm text-center text-textSecondary">
                          $1,648
                        </p>
                      </td>
                    </tr>
                    <tr className="even:bg-successBackground">
                      <td className="border border-successAccent text-center px-2 py-3 md:px-4">
                        <p className="font-normal leading-body m-0 p-0 text-sm text-center text-textSecondary">
                          AR
                        </p>
                      </td>
                      <td className="border border-successAccent text-center px-2 py-3 md:px-4">
                        <p className="font-normal leading-body m-0 p-0 text-sm text-center text-textSecondary">
                          0.62%
                        </p>
                      </td>
                      <td className="border border-successAccent text-center px-2 py-3 md:px-4">
                        <p className="font-normal leading-body m-0 p-0 text-sm text-center text-textSecondary">
                          0.64%
                        </p>
                      </td>
                      <td className="border border-successAccent text-center px-2 py-3 md:px-4">
                        <p className="font-normal leading-body m-0 p-0 text-sm text-center text-textSecondary">
                          $142,100
                        </p>
                      </td>
                      <td className="border border-successAccent text-center px-2 py-3 md:px-4">
                        <p className="font-normal leading-body m-0 p-0 text-sm text-center text-textSecondary">
                          $878
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="hidden md:group-hover:block absolute w-full h-full bg-black opacity-25 top-0 left-0"></div>
                <button className="rounded-base leading-body text-base text-center font-bold select-none outline-none transition duration-300 ease-universal focus:shadow-[0_0_0_4px_inset] disabled:text-interactiveForegroundMuted disabled:bg-interactiveMuted disabled:shadow-none text-interactiveForegroundSecondary bg-interactiveSecondary hover:bg-accentSecondary focus:bg-accentSecondary focus:shadow-accentBorderSecondary active:bg-accentSecondary px-xl h-3xl w-auto hidden md:group-hover:block left-2/4 top-2/4 -translate-y-2/4 -translate-x-2/4 absolute">
                  See all &nbsp;states
                </button>
              </div>
              <button className="rounded-base leading-body text-base text-center font-bold select-none outline-none transition duration-300 ease-universal focus:shadow-[0_0_0_4px_inset] disabled:text-interactiveForegroundMuted disabled:bg-interactiveMuted disabled:shadow-none text-interactiveForegroundTertiary bg-transparent border border-solid border-strokeBorder hover:text-interactivePrimary hover:border-transparent hover:shadow-[0_0_0_4px_inset] hover:shadow-accentBorderSecondary focus:border-transparent focus:shadow-accentBorderSecondary active:text-interactivePrimary px-xl h-3xl block md:hidden mt-base w-full">
                See all &nbsp;states
              </button>
            </div>
            <hr className="my-12 border-t border-strokeDivider" />
            <h2 className="font-bold text-textPrimary leading-heading m-0 p-0 tracking-normal w-auto text-xl md:text-2xl md:tracking-tight">
              How is Better&apos;s mortgage calculator different?
            </h2>
            <h3 className="font-bold text-textPrimary leading-heading m-0 p-0 tracking-normal w-auto text-lg md:text-xl">
              This &nbsp;mortgage calculator shows your payments with taxes and insurance
            </h3>
            <p className="font-normal leading-body m-0 p-0 text-left text-textPrimary text-base">
              The property taxes you contribute are used to finance the services provided by your
              local government to the community. These services encompass schools, libraries, roads,
              parks, water treatment, police, and fire departments. Even after your mortgage has
              been fully paid, you will still need to pay property taxes. If you neglect your
              property taxes, you run the risk of losing your home to your local tax authority.
            </p>
            <p className="font-normal leading-body m-0 p-0 text-left text-textPrimary text-base">
              Your lender will usually require you to have homeowners insurance while you&#x27;re
              settling your mortgage. This is a common practice among lenders because they
              understand that nobody wants to continue paying a mortgage on a home that&#x27;s been
              damaged or destroyed.
            </p>
            <p className="font-normal leading-body m-0 p-0 text-left text-textPrimary text-base">
              Here&#x27;s an interesting fact: Once you fully own your home, the choice to maintain
              homeowners insurance is entirely up to you. However, to ensure your home is protected
              against damages caused by fires, lightning strikes, and natural disasters that are
              common in&nbsp; &nbsp;your area&nbsp;, it is highly recommended to keep it. Therefore,
              always factor in these costs when using a Mortgage Calculator&nbsp;.
            </p>
            <h3 className="font-bold text-textPrimary leading-heading m-0 p-0 tracking-normal w-auto text-lg md:text-xl">
              This &nbsp;mortgage calculator shows your mortgage costs with PMI
            </h3>
            <p className="font-normal leading-body m-0 p-0 text-left text-textPrimary text-base">
              PMI, an abbreviation htmlFor private mortgage insurance, aids potential homeowners in
              qualifying htmlFor a mortgage without the necessity of a 20% down payment. By opting
              htmlFor a lower down payment and choosing a mortgage with PMI, you can purchase a home
              sooner, begin accruing equity, and keep cash available htmlFor future needs. This can
              all be calculated using this &nbsp;Mortgage Calculator.
            </p>
            <p className="font-normal leading-body m-0 p-0 text-left text-textPrimary text-base">
              Choosing a mortgage with PMI is a popular option:&nbsp;
              <a
                className="font-normal underline focus:outline-interactivePrimary focus:outline-1 focus:outline-offset-[theme(spacing.2xs)] text-interactivePrimary"
                href="/not-found"
              >
                71% of first-time homebuyers
              </a>
              &nbsp;had a down payment of less than 20% in July 2021.&nbsp;
              <a
                className="font-normal underline focus:outline-interactivePrimary focus:outline-1 focus:outline-offset-[theme(spacing.2xs)] text-interactivePrimary"
                href="/not-found"
              >
                In 2020, the median down payment htmlFor first-time homebuyers was just 7%, and it
                hasn&apos;t risen above 10% since 1989.
              </a>
            </p>
            <p className="font-normal leading-body m-0 p-0 text-left text-textPrimary text-base">
              PMI is automatically removed from conventional mortgages once your home equity reaches
              22%. Alternatively, you can request the removal of PMI once you&#x27;ve accumulated at
              least 20% home equity.
            </p>
            <h3 className="font-bold text-textPrimary leading-heading m-0 p-0 tracking-normal w-auto text-lg md:text-xl">
              This &nbsp;mortgage calculator includes HOA fees
            </h3>
            <p className="font-normal leading-body m-0 p-0 text-left text-textPrimary text-base">
              Homeowners association (“HOA”) fees are typically charged directly by a homeowners
              association, but as HOA fees come part and parcel with condos, townhomes, and planned
              housing developments, they&apos;re an essential factor to consider when calculating
              your mortgage costs.
            </p>
            <p className="font-normal leading-body m-0 p-0 text-left text-textPrimary text-base">
              Homes&nbsp; that share structural elements, such as roofs and walls, or community
              amenities like landscaping, pools, or BBQ areas, often require homeowners to pay HOA
              fees htmlFor the maintenance of these shared features. It&#x27;s important to factor
              in these costs during your budget planning stage, especially considering that HOA fees
              typically increase annually.&nbsp; &nbsp;HOAs may also charge additional fees known as
              &apos;special assessments&apos; to cover unexpected expenses from time to time.
            </p>
            <hr className="my-12 border-t border-strokeDivider" />
            <h2 className="font-bold text-textPrimary leading-heading m-0 p-0 tracking-normal w-auto text-xl md:text-2xl md:tracking-tight">
              How to reduce your monthly mortgage payments?
            </h2>
            <p className="font-normal leading-body m-0 p-0 text-left text-textPrimary text-base">
              The lower the purchase price of the home, the lower your loan amount will be. But if
              the seller is less than willing to cut you a deal, you have other options.
            </p>
            <h3 className="font-bold text-textPrimary leading-heading m-0 p-0 tracking-normal w-auto text-lg md:text-xl">
              Extend the length of your mortgage
            </h3>
            <p className="font-normal leading-body m-0 p-0 text-left text-textPrimary text-base">
              The more time you have to pay off the mortgage, the less each monthly mortgage payment
              will be. (In lender-speak, &apos;extending the length of your mortgage&apos; is known
              as &apos;increasing your loan term&apos;.) This is why people often choose a 30-year
              fixed rate mortgage over one with a 15- or 20-year term.
            </p>
            <h3 className="font-bold text-textPrimary leading-heading m-0 p-0 tracking-normal w-auto text-lg md:text-xl">
              Increase your down payment
            </h3>
            <p className="font-normal leading-body m-0 p-0 text-left text-textPrimary text-base">
              The smaller the amount of your mortgage, the smaller your monthly mortgage payments
              will be. If you&apos;re able to put at least 20% of the home price towards your&nbsp;
              <a
                className="font-normal underline focus:outline-interactivePrimary focus:outline-1 focus:outline-offset-[theme(spacing.2xs)] text-interactivePrimary"
                href="/not-found"
              >
                down payment
              </a>
              , you&apos;ll be able to avoid PMI (private mortgage insurance). Even if you
              can&#8216;t afford a complete 20% down payment, boosting your down payment will help
              you get PMI removed sooner. In fact, boosting your down payment by 5% can lower your
              monthly PMI fees.
            </p>
            <h3 className="font-bold text-textPrimary leading-heading m-0 p-0 tracking-normal w-auto text-lg md:text-xl">
              Get a lower interest rate
            </h3>
            <p className="font-normal leading-body m-0 p-0 text-left text-textPrimary text-base">
              Increasing your down payment can be one way to help you qualify htmlFor a lower
              interest rate. The amount of your down payment compared to the total amount of the
              loan is called your&nbsp;
              <a
                className="font-normal underline focus:outline-interactivePrimary focus:outline-1 focus:outline-offset-[theme(spacing.2xs)] text-interactivePrimary"
                href="/not-found"
              >
                loan-to-value ratio (LTV)
              </a>
              .
            </p>
            <p className="font-normal leading-body m-0 p-0 text-left text-textPrimary text-base">
              Depending on your loan amount, a lower LTV may increase the likelihood of you being
              offered a low interest rate. If you intend on keeping your home htmlFor a while, you
              could consider buying&nbsp;
              <a
                className="font-normal underline focus:outline-interactivePrimary focus:outline-1 focus:outline-offset-[theme(spacing.2xs)] text-interactivePrimary"
                href="/not-found"
              >
                points
              </a>
              &nbsp;to reduce your interest rate. Buying points essentially means you agree to pay
              more upfront costs in exchange htmlFor a lower monthly payment.
            </p>
            <p className="font-normal leading-body m-0 p-0 text-left text-textPrimary text-base">
              If you think you may sell or refinance the home in the first 5-10 years of the
              mortgage, you could consider an&nbsp;
              <a
                className="font-normal underline focus:outline-interactivePrimary focus:outline-1 focus:outline-offset-[theme(spacing.2xs)] text-interactivePrimary"
                href="/not-found"
              >
                adjustable-rate mortgage (ARM)
              </a>
              . An ARM offers a lower fixed interest rate htmlFor a set introductory
              period—typically 5, 7, or 10 years. Once the set introductory period ends, the
              interest rate adjusts (interest rate may increase after consummation). The
              introductory interest rate htmlFor ARMs is typically lower than the interest rate
              htmlFor a conventional fixed-rate mortgage which could make it a great way to save on
              interest if you know you won&#8216;t keep the mortgage htmlFor long.
            </p>
            <p className="font-normal leading-body m-0 p-0 text-left text-textPrimary text-base">
              If you&#8216;re not planning on buying a home htmlFor a while, improving your credit
              score is a tried and true way of increasing your chances of qualifying htmlFor a lower
              interest rate. By reducing your&nbsp;
              <a
                className="font-normal underline focus:outline-interactivePrimary focus:outline-1 focus:outline-offset-[theme(spacing.2xs)] text-interactivePrimary"
                href="/not-found"
              >
                debt-to-income ratio (DTI)
              </a>
              , lenders will see that you comfortably afford your mortgage and may be more willing
              to offer a lower interest rate.
            </p>
            <hr className="my-12 border-t border-strokeDivider" />
            <h2 className="font-bold text-textPrimary leading-heading m-0 p-0 tracking-normal w-auto text-xl md:text-2xl md:tracking-tight">
              How much home can I afford?
            </h2>
            <p className="font-normal leading-body m-0 p-0 text-left text-textPrimary text-base">
              Once again, the easiest way to do this is with a calculator! To know if a home is in
              your budget, try out our&nbsp;
              <a
                className="font-normal underline focus:outline-interactivePrimary focus:outline-1 focus:outline-offset-[theme(spacing.2xs)] text-interactivePrimary"
                href="/mortage-calc"
              >
                home affordability calculator
              </a>
              . This calculator will take a few inputs from you, like income and savings, and let
              you know the maximum amount of home you can afford.
            </p>
            <hr className="my-12 border-t border-strokeDivider" />
            <h2 className="font-bold text-textPrimary leading-heading m-0 p-0 tracking-normal w-auto text-xl md:text-2xl md:tracking-tight">
              Next steps to buying a house
            </h2>
            <p className="font-normal leading-body m-0 p-0 text-left text-textPrimary text-base">
              There are&nbsp;
              <a
                className="font-normal underline focus:outline-interactivePrimary focus:outline-1 focus:outline-offset-[theme(spacing.2xs)] text-interactivePrimary"
                href="/not-found"
              >
                8 steps to buying a house
              </a>
              &nbsp;and by using this calculator you&#8216;ve completed step 2 (calculating your
              home affordability) and maybe even step 1 (getting your finances in order).
            </p>
            <p className="font-normal leading-body m-0 p-0 text-left text-textPrimary text-base">
              The next step is getting pre-approved. A mortgage pre-approval with Better Mortgage
              takes as little as 3-minutes and doesn&#8216;t impact your credit score. It&#8216;s a
              free, no-commitment way to see how much home you can buy, the mortgages you qualify
              htmlFor, and the range of interest rates you&#8216;ll be offered.
            </p>
            <p className="font-normal leading-body m-0 p-0 text-left text-textPrimary text-base">
              If you&#8216;re ready to buy a home now, our&nbsp;
              <a
                className="font-normal underline focus:outline-interactivePrimary focus:outline-1 focus:outline-offset-[theme(spacing.2xs)] text-interactivePrimary"
                href="/not-found"
              >
                definitive home buying checklist
              </a>
              &nbsp;can walk you through everything you need to know to get the home you want. With
              your Better Mortgage pre-approval letter in hand, you&#8216;ll be able to show sellers
              and real estate agents that you mean business—giving you an edge over homebuyers that
              don&#8216;t have this kind of proof that they&#8216;re financially ready to purchase.
              And by working with an agent from Better Real Estate and funding with Better Mortgage,
              you&#8216;ll save $2,000 on closing costs, and save up to $8,200 on average over the
              life of your loan.**
            </p>
            <hr className="my-12 border-t border-strokeDivider" />
            <section>
              <div>
                <h2 className="font-bold text-textPrimary leading-heading m-0 p-0 tracking-normal w-auto text-xl md:text-2xl md:tracking-tight">
                  More resources
                </h2>
                <div className="flex flex-col justify-between gap-2xl pt-[36px] md:flex-row">
                  <div className="rounded-base px-xl py-lg border border-strokeDivider flex-1">
                    <Image
                      alt="Get pre-approved to see how much you can borrow"
                      loading="lazy"
                      width="32"
                      height="32"
                      decoding="async"
                      data-nimg="1"
                      // style="color: transparent"
                      src="/images/calculator/doc-correct.svg"
                    />
                    <p className="font-normal leading-body m-0 p-0 text-left mt-base text-[20px] text-interactiveForegroundSecondary">
                      <span>Get pre-approved to see how much you can borrow</span>
                    </p>
                    <a
                      className="focus:outline-interactivePrimary focus:outline-1 focus:outline-offset-[theme(spacing.2xs)] text-interactivePrimary block mb-xs mt-base font-bold no-underline hover:underline"
                      href="/not-found"
                    >
                      Get started&nbsp; →
                    </a>
                    <p className="font-normal leading-body m-0 p-0 text-left text-xs text-textSecondary">
                      Won&#8216;t impact your credit
                    </p>
                  </div>
                  <div className="rounded-base px-xl py-lg border border-strokeDivider flex-1">
                    <Image
                      alt="See today’s rates in your area"
                      loading="lazy"
                      width="32"
                      height="32"
                      decoding="async"
                      data-nimg="1"
                      // style="color: transparent"
                      src="/images/calculator/downtrend.svg"
                    />
                    <p className="font-normal leading-body m-0 p-0 text-left mt-base text-[20px] text-interactiveForegroundSecondary">
                      <span>See today&#8216;s rates in your area</span>
                    </p>
                    <a
                      className="focus:outline-interactivePrimary focus:outline-1 focus:outline-offset-[theme(spacing.2xs)] text-interactivePrimary block mb-xs mt-base font-bold no-underline hover:underline"
                      href="/not-found"
                    >
                      See rates&nbsp; →
                    </a>
                  </div>
                  <div className="rounded-base px-xl py-lg border border-strokeDivider flex-1">
                    <Image
                      alt="Find out your max homebuying budget"
                      loading="lazy"
                      width="32"
                      height="32"
                      decoding="async"
                      data-nimg="1"
                      // style="color: transparent"
                      src="/images/calculator/calculator.svg"
                    />
                    <p className="font-normal leading-body m-0 p-0 text-left mt-base text-[20px] text-interactiveForegroundSecondary">
                      <span>Find out your max homebuying budget</span>
                    </p>
                    <a
                      className="focus:outline-interactivePrimary focus:outline-1 focus:outline-offset-[theme(spacing.2xs)] text-interactivePrimary block mb-xs mt-base font-bold no-underline hover:underline"
                      href="/not-found"
                    >
                      Try our mortgage calculator&nbsp; →
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </section>
          <section className="pb-lg m-auto max-w-screen-2xl justify-between px-6 md:px-14">
            <p className="font-normal leading-body m-0 p-0 text-left text-textPrimary text-xs">
              *See&nbsp;
              <a
                className="font-normal underline focus:outline-interactivePrimary focus:outline-1 focus:outline-offset-[theme(spacing.2xs)] text-interactivePrimary"
                href="/not-found"
              >
                Better Real Estate discount terms and conditions
              </a>
              .
            </p>
            <p className="font-normal leading-body m-0 p-0 text-left text-textPrimary text-xs">
              **The average lifetime savings estimate is based on a comparison of the Freddie Mac
              Primary Mortgage Market Survey&#8216;s (PMMS) 30-year fixed-rate mortgage product with
              Better Mortgage&#8216;s own offered rate htmlFor a comparable mortgage product between
              Jan &apos;20 - Dec &apos;20. PMMS is based on conventional, conforming
              fully-amortizing home purchase loans htmlFor borrowers with a loan-to-value of 80
              percent and with excellent credit. Better Mortgage&#8216;s offered rate is based on
              pricing output htmlFor a 30-year fixed-rate mortgage product with a 30-day lock period
              htmlFor a single-family, owner-occupied residential property and a borrower with
              excellent (760 FICO) credit and a loan-to-value ratio of 80 percent. Individual
              savings could vary based on current market rates, property type, loan amount,
              loan-to-value, credit score, debt-to-income ratio and other variables.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Page;
