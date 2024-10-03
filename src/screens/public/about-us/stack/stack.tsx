import classes from "./stack.module.css";
import { stack } from "@/data/about.data";

export const Stack = () => {
  return (
    <div className={classes.stack}>
      {stack.map((item) => (
        <div key={item.title} className={classes.stackSubset}>
          <h3 className={classes.stackSubsetTitle}>{item.title}</h3>
          <div className={classes.stackSubsetItems}>
            {item.list.map((skill) => (
              <div key={skill} className={classes.skill}>
                {skill}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
