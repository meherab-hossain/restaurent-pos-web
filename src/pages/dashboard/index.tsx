/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import cookies from "@/utils/cookies";
import { useEffect, useState } from "react";
import FriendHoc from "../../../nextjs-friend";

const DashboardPage = () => {
  const [userType, setUserType] = useState<string | null>(null);
  
  useEffect(() => {
    const userTypeFromCookie = cookies.get('user_type');
    setUserType(userTypeFromCookie);
  }, []);
  
  return (
    <div className="h-screen">
      {/* {renderDashboard()} */}
      Dashboard Page
    </div>
  );
}

export default FriendHoc(DashboardPage, {
  layout: "base",
  middleware: [],
});