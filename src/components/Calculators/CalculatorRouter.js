import React from "react";
import EducationCalc from "./EducationCalc";
import SipLumpsumCalc from "./SipLumpsumCalc";
import VacationCalc from "./VacationCalc";
import HomeCalc from "./HomeCalc";
import CarCalc from "./CarCalc";
import BigMacCalc from "./BigMacCalc";
import Retirement from "./RetirementCalc";
import CostOfRaisingCalc from "./CostOfRaisingCalc";
import InvestmentComparison from "./InvestmentComparison";
import CollegeLifeCalc from "./CollegeLifeCalc";
import RestroCalc from "./RestroCalc";
import Angel from "./Angel";
import EducationInvestmentCalc from "./EducationInvestmentCalc";
import Standard from "./Standard";
import Unicorn from "./Unicorn";
import { useRouter } from "next/dist/client/router";

function CalculatorRouter({ name, calcdata, seterror, error }) {
  const router = useRouter();
  if (name === "homeLoan")
    return <HomeCalc seterror={seterror} data={calcdata} error={error} />;
  if (name === "carLoan")
    return <CarCalc seterror={seterror} data={calcdata} error={error} />;
  if (name === "currency")
    return <BigMacCalc seterror={seterror} data={calcdata} error={error} />;
  if (name === "retirement")
    return <Retirement seterror={seterror} data={calcdata} error={error} />;
  if (name === "costofraising")
    return (
      <CostOfRaisingCalc seterror={seterror} data={calcdata} error={error} />
    );
  if (name === "investmentcomparison")
    return (
      <InvestmentComparison seterror={seterror} data={calcdata} error={error} />
    );
  if (name === "sip")
    return <SipLumpsumCalc seterror={seterror} data={calcdata} error={error} />;
  if (name === "college")
    return (
      <CollegeLifeCalc seterror={seterror} data={calcdata} error={error} />
    );
  if (name === "vacation")
    return <VacationCalc seterror={seterror} data={calcdata} error={error} />;
  if (name === "education")
    return <EducationCalc seterror={seterror} data={calcdata} error={error} />;
  if (name === "educationinvestments")
    return (
      <EducationInvestmentCalc
        seterror={seterror}
        data={calcdata}
        error={error}
      />
    );
  if (name === "restaurant")
    return <RestroCalc seterror={seterror} data={calcdata} />;
  if (name === "angel")
    return <Angel seterror={seterror} data={calcdata} error={error} />;
  if (name === "standardofliving")
    return <Standard seterror={seterror} data={calcdata} error={error} />;
  if (name === "unicorn")
    return <Unicorn seterror={seterror} data={calcdata} error={error} />;
  else {
    return <p>No calc found</p>;
  }
}

export default CalculatorRouter;
