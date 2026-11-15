import { auth } from "@clerk/nextjs/server";


export default async function DashboardPage() {

  const { userId, isAuthenticated, redirectToSignIn } = await auth();


  if (!isAuthenticated) {

    return redirectToSignIn();

  }


  return (

    <div>

      <h1>Dashboard</h1>

      <p>Logged in as: {userId}</p>

    </div>

  );

}