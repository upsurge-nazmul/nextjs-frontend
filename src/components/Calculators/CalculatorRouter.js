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

function CalculatorRouter({ name, calcdata, seterror }) {
  const router = useRouter();
  if (name === "homeLoan")
    return <HomeCalc seterror={seterror} data={calcdata} />;
  if (name === "carLoan")
    return <CarCalc seterror={seterror} data={calcdata} />;
  if (name === "currency")
    return <BigMacCalc seterror={seterror} data={calcdata} />;
  if (name === "retirement")
    return <Retirement seterror={seterror} data={calcdata} />;
  if (name === "costofraising")
    return <CostOfRaisingCalc seterror={seterror} data={calcdata} />;
  if (name === "investmentcomparison")
    return <InvestmentComparison seterror={seterror} data={calcdata} />;
  if (name === "sip")
    return <SipLumpsumCalc seterror={seterror} data={calcdata} />;
  if (name === "college")
    return <CollegeLifeCalc seterror={seterror} data={calcdata} />;
  if (name === "vacation")
    return <VacationCalc seterror={seterror} data={calcdata} />;
  if (name === "education")
    return <EducationCalc seterror={seterror} data={calcdata} />;
  if (name === "educationinvestments")
    return <EducationInvestmentCalc seterror={seterror} data={calcdata} />;
  if (name === "restaurant")
    return <RestroCalc seterror={seterror} data={calcdata} />;
  if (name === "angel") return <Angel seterror={seterror} data={calcdata} />;
  if (name === "standardofliving")
    return <Standard seterror={seterror} data={calcdata} />;
  if (name === "unicorn")
    return <Unicorn seterror={seterror} data={calcdata} />;
  else {
    return <p>No calc found</p>;
  }
}

export default CalculatorRouter;
