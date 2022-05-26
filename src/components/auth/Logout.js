import { useNavigate } from 'react-router-dom';

export default function Logout() {
  let navigate = useNavigate();

  function handleLogOut() {
    sessionStorage.setItem("userToken", '');
    sessionStorage.clear();
    navigate("/login"); // whichever component you want it to route to
  }

  return (
    <button type="button" onClick={handleLogOut}>
      Go home
    </button>
  );
}