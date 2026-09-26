// src/app/partner-with-us/page.js
import Link from "next/link";
import { FiCheckCircle, FiArrowRight } from "react-icons/fi";
import { redirect } from "next/navigation";
import { buildMetadata } from "@/utils/seo";




export const metadata = buildMetadata({
  title: "Partner With Us | Local Kokani",
  description: "List your hotel or restaurant on Local Kokani and reach more guests.",
  path: "/partner-with-us",
});

export default function OldRegisterRedirect() {
  redirect("/owner/signup");
}
