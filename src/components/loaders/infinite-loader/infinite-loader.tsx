import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { Spinner } from "../spinner/spinner";

export const InfiniteLoader = ({
  loadMore,
  isNextPageAvailable,
}: {
  loadMore: () => void;
  isNextPageAvailable: boolean;
}) => {
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
