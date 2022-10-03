import { signIn } from "next-auth/react";
import Link from "next/link";
import { MdOutlineStickyNote2 } from "react-icons/md";

const Nav = () => {
  return (
    <nav className="flex h-16 items-center gap-2">
      <div className="flex items-center">
        <MdOutlineStickyNote2 className="h-10 w-10" />
        <span className="text-2xl font-medium">Noted</span>
      </div>
      <div className="ml-auto">
        <button
          onClick={() => signIn("google")}
          className="rounded bg-red-600 px-4 py-2"
        >
          Sign In
        </button>
      </div>
    </nav>
  );
};

export default Nav;
