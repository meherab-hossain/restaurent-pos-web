/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

export default function Header({ toggleSidebar }:any) {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white text-black flex items-center justify-between px-4 py-2 z-50">
      <h1 className="text-xl font-semibold">Restaurent POS</h1>
    </header>
  );
}

