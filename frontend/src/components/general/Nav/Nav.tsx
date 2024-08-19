import { useEffect, useState } from "react";
import { NavItem } from "./NavItem";
import styles from "./Nav.module.css";

const Mountain = ({ width, height, style }: any) => {
  return (
    <div
      className={styles.mountain}
      style={{ ...style, width: `${width}px`, height: `${height}px` }}
    />
  );
};
const MountainRange = ({ color, minWidth, maxWidth, style }: any) => {
  const [mountains, setMountains] = useState<JSX.Element[]>([]);

  const mountainWidthRange = { min: minWidth, max: maxWidth };
  const mountainHeightRange = { min: 80, max: 130 };
  const mountainSpacing = 20;

  useEffect(() => {
    const generateMountains = () => {
      const vw = window.innerWidth;
      const generatedMountains: JSX.Element[] = [];
      let left = -10;

      while (left < vw) {
        const mountainWidth =
          Math.random() * (mountainWidthRange.max - mountainWidthRange.min) +
          mountainWidthRange.min;
        const mountainHeight =
          Math.random() * (mountainHeightRange.max - mountainHeightRange.min) +
          mountainHeightRange.min;

        generatedMountains.push(
          <Mountain
            key={generatedMountains.length}
            width={mountainWidth}
            height={mountainHeight}
            style={{
              left: `${left}px`,
              backgroundColor: color,
            }}
          />
        );

        left += mountainWidth - mountainSpacing; // Increment left by mountain width and spacing
      }

      return generatedMountains;
    };

    const updateMountains = () => {
      const newMountains = generateMountains();
      setMountains(newMountains);
    };

    // Update mountains on initial render and window resize
    updateMountains();

    window.addEventListener("resize", updateMountains);

    return () => {
      window.removeEventListener("resize", updateMountains);
    };
  }, [color, minWidth, maxWidth]);

  return (
    <div style={{ ...style }} className={styles.mountainRange}>
      {mountains}
    </div>
  );
};

function Nav() {
  return (
    <div className={styles.container}>
      <div className={styles.navContainer}>
        <h1>Systematic Review Pilot</h1>
      </div>
      <MountainRange
        minWidth={220}
        maxWidth={300}
        color={"var(--color-secondary)"}
        style={{ top: "-50px" }}
      />
      <MountainRange
        minWidth={140}
        maxWidth={240}
        color={"var(--bg-tertiary)"}
        style={{ top: "-110px" }}
      />
      <MountainRange
        minWidth={60}
        maxWidth={140}
        color={"#6b8f8c"}
        style={{ top: "-160px" }}
      />
      <div
        style={{
          backgroundColor: "#6b8f8c",
          width: "100vw",
          height: "40px",
          zIndex: 1000,
          position: "relative",
          top: "-190px",
        }}
      />
      <div className={styles.nav}>
        <NavItem to="/">Home</NavItem>
        <NavItem to="/reference-collection">Reference Collection</NavItem>
        <NavItem to="/abstract-categorization-confidence">
          Abstract Categorization
        </NavItem>
        <NavItem to="/text-summarization">Text Summarization</NavItem>
        <NavItem to="/testing-grounds">Testing Grounds</NavItem>
      </div>
    </div>
  );
}

export { Nav };
