import React, { useEffect } from "react";
import { useRouter } from "next/router";
const Cancel = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 400);
  }, []);
  return (
    <div className="success-wrapper">
      <div className="success">
        <h2>Redirected to Home!</h2>
      </div>
    </div>
  );
};

export default Cancel;
