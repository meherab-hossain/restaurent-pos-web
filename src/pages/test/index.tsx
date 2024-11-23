import { clearUser, setUser } from "@/store/feature/userSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from '@/store/store';
import cookies from "@/utils/cookies";
import FriendHoc from "../../../nextjs-friend";

const TestPage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.user);

  const handleLogin = () => {
    cookies.set('admin_token', 'your-auth-token');
    cookies.set('admin_auth', "test");
    dispatch(setUser({ id: '123', name: 'John Doe', email: 'johndoe@example.com' }));
  };

  const handleLogout = () => {
    dispatch(clearUser());
  };

  return (
    <div>
      {user.isAuthenticated ? (
        <div>
          <p>Welcome, {user.name}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
}

export default FriendHoc(TestPage, {
  layout: "base",
  middleware: [],
});