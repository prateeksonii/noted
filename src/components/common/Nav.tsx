import { MdOutlineStickyNote2 } from "react-icons/md";

const Nav = () => {
  return (
    <nav className="flex h-16 items-center gap-2">
      <MdOutlineStickyNote2 className="h-10 w-10" />
      <span className="text-2xl font-medium">Noted</span>
    </nav>
  );
};

export default Nav;
