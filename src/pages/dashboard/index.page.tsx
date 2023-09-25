// import FullPageLoader from "@/components/fullPageLoader";
// import React, { Suspense } from "react";

// const LazyDashBoard = React.lazy(
//   () => import("@/components/pages-partials/dashboard")
// );

// export default function DashBoard() {
//   return (
//     <Suspense fallback={<FullPageLoader />}>
//       <LazyDashBoard />
//     </Suspense>
//   );
// }

import React from "react";
import dynamic from "next/dynamic";
import FullPageLoader from "@/components/fullPageLoader";

const DynamicDashBoard = dynamic(
  () => import("@/components/pages-partials/dashboard"),
  {
    ssr: false,
    loading: () => <FullPageLoader/>,
  }
);

export default function DashBoard() {
  return <DynamicDashBoard />;
}

