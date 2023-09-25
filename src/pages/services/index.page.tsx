// import FullPageLoader from "@/components/fullPageLoader";
// import React, { Suspense } from "react";

// const LazyServices = React.lazy(
//   () => import("@/components/pages-partials/services")
// );

// export default function Services() {
//   return (
//     <Suspense fallback={<FullPageLoader />}>
//       <LazyServices />
//     </Suspense>
//   );
// }

import React from "react";
import dynamic from "next/dynamic";
import FullPageLoader from "@/components/fullPageLoader";

const DynamicServices = dynamic(
  () => import("@/components/pages-partials/services"),
  {
    ssr: false,
    loading: () => <FullPageLoader /> ,
  }
);

export default function Services() {
  return <DynamicServices />;
}
