import ProgressCards from "@/components/core/ProgressCards";
import StatisticsCards from "@/components/core/StatisticsCards";
import IncomeCard from "@/components/core/IncomeCard";
import BookingTable from "@/components/core/BookingTable";
import BookingServise from "@/components/core/BookingServices";
import {
  TypographyStyle,
  DivButton,
  GridStyle,
  Container,
  GridContainer,
  StyledColorGrid,
} from "./index.styles";
import { COLORS } from "@/constants/colors";
import { Grid } from "@mui/material";

const cardsData = [
  { heading: "Total Done", number: 39, range: 16, color: COLORS.BLACK_100 },
  { heading: "Total Cancel", number: 39, range: 9, color: COLORS.YELLOW_THEME },
  {
    heading: "Total Approved",
    number: 29,
    range: 23,
    color: COLORS.GREEN_THEME,
  },
  {
    heading: "Processing & Pending",
    number: 159,
    range: 67,
    color: COLORS.SKY_BLUE_THEME,
  },
];

export default function BranchAdminDashboard() {
  
  return (
    <Container container >
      <StyledColorGrid item xs={12}>
        <TypographyStyle>Appointment Booking Dashboard</TypographyStyle>
        <DivButton>Add New Booking</DivButton>
      </StyledColorGrid>
      <GridStyle item xs={12} md={11} marginTop={"-3%"}>
        <GridContainer
          container
          rowSpacing={{ xs: 3, md: 1 }}
          columnSpacing={{ xs: 0, md: 3 }}
        >
          {cardsData.map((card, index) => (
            <Grid item key={index} xs={12} md={3}>
              <ProgressCards
                heading={card.heading}
                number={card.number}
                range={card.range}
                color={card.color}
              />
            </Grid>
          ))}
        </GridContainer>
      </GridStyle>
      <GridStyle item xs={12} md={11} marginTop={"2%"}>
        <GridContainer
          container
          rowSpacing={{ xs: 3, md: 0 }}
          columnSpacing={{ xs: 0, md: 3 }}
        >
          <Grid item xs={12} md={7}>
            <StatisticsCards
              heading="Today’s Services Statistics"
              subheading="Show all services based on user branch permission."
              Trange={40}
              Drange={25}
              Crange={33}
              Arange={85}
              Prange={60}
              color={""}
            />
          </Grid>
          <Grid item xs={12} md={5}>
            <IncomeCard
              heading={"Total’s Income & other statistics"}
              Tincome={0}
              Tdue={0}
              Tcash={0}
              Tonline={0}
            />
          </Grid>
        </GridContainer>
      </GridStyle>
      <GridStyle item xs={12} md={11} marginTop={"2%"}>
        <GridContainer
          container
          rowSpacing={{ xs: 3, md: 0 }}
          columnSpacing={{ xs: 0, md: 3 }}
        >
          <Grid item xs={12} md={7}>
            <BookingTable heading="" />
          </Grid>
          <Grid item xs={12} md={5}>
            <BookingServise heading="" />
          </Grid>
        </GridContainer>
      </GridStyle>
    </Container>
  );
}
