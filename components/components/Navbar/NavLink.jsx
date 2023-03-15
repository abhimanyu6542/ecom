import Link from "next/link";
const NavLink = ({ href, title }) => {
  return (
    <li className="list-none cursor-pointer mr-8">
      <Link
        href={href}
        spy={true}
        smooth={true}
        duration={500}
        offset={-50}
        className="font-normal transition-all duration-300"
      >
        {title}
      </Link>
    </li>
  );
};

export default NavLink;