import Link from "next/link";

const Button = ({ label, bg, icon, link, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  return (
    <button
      className={`${
        bg ? `bg-${bg}` : "bg-black"
      } px-2 sm:px-4 text-white rounded-full shadow-xl flex gap-2 items-center text-center  py-2 text-md max-sm:text-sm`}
      onClick={handleClick}
    >
      {link ? <Link href={link}>{label}</Link> : label}
      <span className="text-[18px] sm:text-[20px]"> {icon ? icon : ""}</span>
    </button>
  );
};
export default Button;
