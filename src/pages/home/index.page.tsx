// import FullPageLoader from "@/components/fullPageLoader";
// import React, { Suspense } from "react";

// const LazyHome = React.lazy(() => import("@/components/pages-partials/home"));

// export default function Home() {
//   return (
//     <Suspense fallback={<FullPageLoader />}>
//       <LazyHome />
//     </Suspense>
//   );
// }

import dynamic from "next/dynamic";
import React from "react";
import FullPageLoader from "@/components/fullPageLoader";

const DynamicHome = dynamic(() => import("@/components/pages-partials/home"), {
  ssr: false,
  loading: () => <FullPageLoader />,
});

export default function Home() {
  return <DynamicHome />;
}
