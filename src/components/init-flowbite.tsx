"use client";

import { initFlowbite } from "flowbite";
import { useEffect } from "react";

export const InitFlowbite = () => {
  useEffect(() => {
    initFlowbite();
  }, []);
  return null;
};
