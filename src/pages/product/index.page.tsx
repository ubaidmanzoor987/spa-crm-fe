// import FullPageLoader from "@/components/fullPageLoader";
// import React, { Suspense } from "react";

// const LazyProduct = React.lazy(
//   () => import("@/components/pages-partials/product")
// );

// export default function Product() {
//   return (
//     <Suspense fallback={<FullPageLoader />}>
//       <LazyProduct />
//     </Suspense>
//   );
// }

import React from "react";
import dynamic from "next/dynamic";
import FullPageLoader from "@/components/fullPageLoader";

const DynamicProduct = dynamic(
  () => import("@/components/pages-partials/product"),
  {
    ssr: false,
    loading: () => <FullPageLoader />,
  }
);

export default function Product() {
  return <DynamicProduct />;
}
