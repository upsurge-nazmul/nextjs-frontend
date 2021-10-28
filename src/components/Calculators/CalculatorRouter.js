import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import EducationCalc from "./EducationCalc";
import InputBlock from "./InputBlock";
import ResultBox from "./ResultBox";
import SipLumpsumCalc from "./SipLumpsumCalc";
import VacationCalc from "./VacationCalc";
import styles from "../../styles/Calculators/calccomponent.module.scss";
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

function CalculatorRouter({ name, calcdata }) {
  const router = useRouter();
  if (name === "homeLoan") return <HomeCalc data={calcdata} />;
  if (name === "carLoan") return <CarCalc data={calcdata} />;
  if (name === "currency") return <BigMacCalc data={calcdata} />;
  if (name === "retirement") return <Retirement data={calcdata} />;
  if (name === "costofraising") return <CostOfRaisingCalc data={calcdata} />;
  if (name === "investmentcomparison")
    return <InvestmentComparison data={calcdata} />;
  if (name === "sip") return <SipLumpsumCalc data={calcdata} />;
  if (name === "college") return <CollegeLifeCalc data={calcdata} />;
  if (name === "vacation") return <VacationCalc data={calcdata} />;
  if (name === "education") return <EducationCalc data={calcdata} />;
  if (name === "educationinvestments")
    return <EducationInvestmentCalc data={calcdata} />;
  if (name === "restaurant") return <RestroCalc data={calcdata} />;
  if (name === "angel") return <Angel data={calcdata} />;
  if (name === "standardofliving") return <Standard data={calcdata} />;
  if (name === "unicorn") return <Unicorn data={calcdata} />;
  else {
    return <p>No calc found</p>;
  }
}

export default CalculatorRouter;
