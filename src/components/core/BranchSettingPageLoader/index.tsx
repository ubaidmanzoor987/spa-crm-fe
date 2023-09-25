import { Grid } from "@mui/material";
import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import {
  Div,
  StyledForm,
  StyledGrid,
  StyledHeader,
  StyledImage,
  StyledMainGrid,
  StyledTable,
  WraperGrid,
} from "./index.style";
import SharedLayout from "@/components/layout/shared-layout";
function FullPageSkeleton() {
  // return (
  //   <StyledMainGrid>
  //     <Stack>
  //       <WraperGrid>
  //         <Grid>
  //           <Div>
  //             <StyledTable variant="rounded" width="100%" height={330} />
  //           </Div>
  //           <Grid>
  //             <StyledForm variant="rounded" width="100%" height={150} />
  //           </Grid>
  //         </Grid>
  //       </WraperGrid>
  //     </Stack>
  //   </StyledMainGrid>
  // );
  return (
    <StyledMainGrid>
      <Stack>
        <WraperGrid>
          <StyledGrid>
            <Grid>
              <Div>
                <StyledImage variant="rounded" width="100%" height={500} />
              </Div>
            </Grid>
            <Grid>
              <Div>
                <StyledTable variant="rounded" width="100%" height={152} />
              </Div>
            </Grid>
          </StyledGrid>
        </WraperGrid>
      </Stack>
    </StyledMainGrid>
  );
}

export default function FullPageLoader() {
  return <SharedLayout children={<FullPageSkeleton />} title={"BranchSetting"} />;
}
