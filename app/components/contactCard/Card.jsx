import Link from "next/link";
const Card = ({ icon, contact, name, color, bg }) => {
  return (
    <div className="border h-full  w-full  rounded-xl flex-wrap shadow-md py-3 px-4 ">
      <div className="flex flex-col gap-y-2 items-center">
        <span
          className={`w-14 h-14 ${color} flex justify-center items-center rounded-full ${bg}
        `}
        >
          {icon}
        </span>
        <h1 className="font-semibold text-lg ">{name}</h1>
        <a href={contact}>
          <p className="text-softtext px-2  whitespace-nowrap">{contact}</p>
        </a>
      </div>
    </div>
  );
};

export default Card;
