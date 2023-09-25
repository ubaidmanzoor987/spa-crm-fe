// import FullPageLoader from "@/components/fullPageLoader";
// import React, { Suspense } from "react";

// const LazyStaff = React.lazy(() => import("@/components/pages-partials/staff"));

// export default function Staff() {
//   return (
//     <Suspense fallback={<FullPageLoader />}>
//       <LazyStaff />
//     </Suspense>
//   );
// }

import React from "react";
import dynamic from "next/dynamic";
import FullPageLoader from "@/components/fullPageLoader";

const DynamicStaff = dynamic(
  () => import("@/components/pages-partials/staff"),
  {
    ssr: false,
    loading: () => <FullPageLoader />,
  }
);

export default function Staff() {
  return <DynamicStaff />;
}
