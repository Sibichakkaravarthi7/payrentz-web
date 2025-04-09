"use client";
import AppButton from "@/components/Button/AppButton";
import { useRouter } from "next/navigation";

export default function Page410() {
  const router = useRouter();
  return (
    <div style={{ textAlign: "center", padding: "50px", minHeight: "70vh" }}>
      <h1
        style={{
          fontSize: "5rem",
          marginTop: "60px",
          color: "#ED1F28",
          fontWeight: "bold",
        }}
      >
        410
      </h1>
      <p style={{ fontSize: "1.5rem", color: "#555" }}>
        The page is no longer available.
      </p>
      <AppButton
        onClick={() => router.push("/")}
        variant={"blue"}
        text={"Go to Homepage"}
        className={"mx-auto mt-[20px]"}
      />
    </div>
  );
}
