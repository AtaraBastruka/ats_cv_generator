// app/page.js (Server Component by default)
// This file orchestrates the page and can fetch initial data on the server.

import CvGenerator from "@/components/CvGenerator";

export default function HomePage() {
  // You can fetch data here on the server
  // const data = await fetchData(); 

  return (
    <div>
       {/* This component remains a Server Component */}
      <h1>Welcome to My Client-Heavy App!</h1>
      <p>This static text is rendered on the server for faster initial load.</p>
      <CvGenerator /> {/* Only this component needs client JS */}
    </div>
  );
}