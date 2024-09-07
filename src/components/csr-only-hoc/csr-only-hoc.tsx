import dynamic from "next/dynamic";

const _CSROnly = ({
  loadingFallbackComponent,
}: {
  loadingFallbackComponent?: React.ReactElement;
}) =>
  dynamic(() => import("./_csr-only"), {
    ssr: false,
    loading: () => loadingFallbackComponent ?? null,
  });

export const CSROnlyHOC = ({ component }: { component: React.ReactNode }) => {
  const CSROnly = _CSROnly({});

  return <CSROnly component={component} />;
};
