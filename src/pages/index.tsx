import FriendHoc from "../../nextjs-friend";

function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1>Home page</h1>
    </div>
  );
}
export default FriendHoc(Home, {
  layout: "base",
  middleware: ["user-auth"],
});
