import { UserAgent } from "@/views/userAgent";
import { headers } from "next/headers";

const UserAgentRoot = () => {
  // make user agent server component and get user agent information from header.
  const userAgent = headers().get("user-agent") || "Unknown user agent";

  return <UserAgent userAgent={userAgent} />;
};

export default UserAgentRoot;
