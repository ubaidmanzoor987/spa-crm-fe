import BackButton from "../../../../public/svgs/back-button.svg";
import BranchInfo from "../../../../public/svgs/branch-info.svg";
import { SvgDiv } from "./sidebar.styles";
import BranchInfoActive from "../../../../public/svgs/branch-info-active.svg";
export const BRANCHSETTING = [
  {
    title: "Back",
    icon: (
      <SvgDiv>
        <BackButton />
      </SvgDiv>
    ),
    icon1: (
      <SvgDiv>
        <BranchInfoActive />
      </SvgDiv>
    ),
    page: "dashboard",
    path: "/dashboard",
  },
  {
    title: "Branch Info",
    icon: (
      <SvgDiv>
        <BranchInfo />
      </SvgDiv>
    ),
    icon1: (
      <SvgDiv>
        <BranchInfoActive />
      </SvgDiv>
    ),
    page: "branchSetting",
    path: "/branchSetting",
  },
  
];
