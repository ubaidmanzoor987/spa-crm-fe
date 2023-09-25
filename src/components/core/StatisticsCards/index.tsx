import * as React from "react";
import CircularProgress from "../CircularProgressBar";
import Card from "@mui/material/Card";
import {
  CardContentStyle,
  FlexColumn,
  FlexRow,
  TypographyStyle,
  SubTypographyStyle,
  FlexCol,
  P,
} from "./index.style";
import { COLORS } from "@/constants/colors";

type CardProps = {
  heading: string;
  subheading: string;
  Trange: number;
  Drange: number;
  Crange: number;
  Arange: number;
  Prange: number;
  color: string;
};

export default function StatisticsCards(props: CardProps) {
  const { heading, subheading, Trange, Drange, Crange, Arange, Prange } = props;

  const data = [
    { value: Trange, color: COLORS.BLACK_100, label: "Total" },
    { value: Drange, color: COLORS.SKY_BLUE_THEME, label: "Done" },
    { value: Crange, color: COLORS.YELLOW_THEME, label: "Cancel" },
    { value: Arange, color: COLORS.GREEN_THEME, label: "Approved" },
    {
      value: Prange,
      color: COLORS.SKY_BLUE_THEME,
      label: "Processing & Pending",
    },
  ];
  return (
    <Card
      sx={{
        borderRadius: "15px",
        
      }}
    >
      <CardContentStyle>
        <FlexColumn>
          <TypographyStyle color={COLORS.BLACK_100} marginBottom={2}>
            {heading}
          </TypographyStyle>
          <SubTypographyStyle color={COLORS.BLACK_100} marginBottom={4}>
            {subheading}
          </SubTypographyStyle>

          <FlexRow>
            {data.map(({ value, color, label }) => (
              <FlexCol>
                <CircularProgress value={value} colors={color} size={55} />
                <P>{label}</P>
              </FlexCol>
            ))}
          </FlexRow>
        </FlexColumn>
      </CardContentStyle>
    </Card>
  );
}
