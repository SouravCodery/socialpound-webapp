import classes from "./icon-wrapper.module.css";

export const IconWrapper = ({
  children,
  count,
  dot = false,
}: {
  children: React.ReactNode;
  count?: number;
  dot?: boolean;
}) => {
  return (
    <div className={classes.iconWrapper}>
      <div className={classes.iconWrapperChild}>
        {children}
        {count && <div className={classes.count}>{count}</div>}
        {dot && <div className={classes.dot} />}
      </div>
    </div>
  );
};
