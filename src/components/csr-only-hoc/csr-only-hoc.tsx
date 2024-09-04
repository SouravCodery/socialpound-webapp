import dynamic from "next/dynamic";

const CSROnly = dynamic(() => import("./_csr-only"), {
  ssr: false,
});

export const CSROnlyHOC = ({ component }: { component: React.ReactNode }) => {
  return <CSROnly component={component} />;
};
