import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import { useAuthenticator } from "@aws-amplify/ui-react";

const client = generateClient();

function App() {
  const { signOut, user } = useAuthenticator();
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data } = await client.models.UserProfile.list();
      if (data.length > 0) setUserProfile(data[0]);
    };
    fetchProfile();
  }, []);

  return (
    <main style={{ padding: "2rem", color: "black", backgroundColor: "white" }}>
      <h1 style={{ color: "black" }}>Raj Patel's Profile App</h1>
      <h2 style={{ color: "black" }}>Welcome, {user?.signInDetails?.loginId}</h2>
      {userProfile && <p style={{ color: "black" }}>Email: {userProfile.email}</p>}
      <button onClick={signOut}>Sign Out</button>
    </main>
  );
}

export default App;