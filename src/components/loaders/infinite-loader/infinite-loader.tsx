import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { Spinner } from "../spinner/spinner";

export const InfiniteLoader = ({
  context,
}: {
  context?: {
    loadMore: () => void;
    isNextPageAvailable: boolean;
  };
}) => {
  const { isNextPageAvailable, loadMore } = context ?? {
    loadMore: () => {},
    isNextPageAvailable: false,
  };

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && isNextPageAvailable) {
      loadMore();
    }
  }, [inView, isNextPageAvailable, loadMore]);

  if (!isNextPageAvailable) {
    return null;
  }

  return (
    <div ref={ref}>
      <Spinner />
    </div>
  );
};
