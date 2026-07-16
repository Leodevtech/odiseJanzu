// src/components/AlgueSeparator.jsx
import Image from "next/image";

const AlgueSeparator = () => {
  return (
    <div
      style={{
        width: "100%",
        padding: "30px 0",
        backgroundColor: "#fff",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Image
        src="/assets/bannière v3.png"
        alt="séparateur décoratif algues"
        width={1000}
        height={300}
        quality={90}
        style={{
          width: "clamp(280px, 50%, 650px)",
          height: "auto",
          opacity: 0.9,
        }}
      />
    </div>
  );
};

export default AlgueSeparator;