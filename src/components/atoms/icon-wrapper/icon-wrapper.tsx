import classes from "./icon-wrapper.module.css";

export const IconWrapper = ({
  children,
  count,
}: {
  children: React.ReactNode;
  count?: number | undefined;
}) => {
  return (
    <div className={classes.iconWrapper}>
      <div className={classes.iconWrapperChild}>
        {children}
        {count && <div className={classes.count}>{count}</div>}
      </div>
    </div>
  );
};
