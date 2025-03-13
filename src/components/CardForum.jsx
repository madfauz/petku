import { Link } from "react-router-dom";
const CardForum = ({ children }) => {
  return (
    <div
      className="mt-2 w-full flex justify-start gap-4 overflow-x-auto  px-[4%] md:px-[7%] xl:px-[10%] py-2"
      style={{ scrollbarWidth: "none" }}
    >
      {children.map((forum, index) => (
        <Link
          to="/"
          key={index}
          className="shadow-md rounded-md bg-white rounded-b p-4 flex flex-row justify-between leading-normal gap-4 "
        >
          <div className="flex flex-col gap-2 justify-between">
            <div className="w-72 h-48 overflow-hidden rounded-md bg-yellow-200">
              <img
                src={forum.url}
                alt={forum.title}
                className="object-contain rounded-md object-top"
              />
            </div>
            <div className="text-gray-700 font-bold text-lg font-poppins font-semibold capitalize">
              {forum.title}
            </div>
            <div className="flex flex-row justify-between font-poppins font-medium">
              <div className="text-gray-500 flex gap-1">
                <img
                  className="w-6 h-6"
                  src="https://img.icons8.com/ios-glyphs/30/user-male-circle.png"
                  alt="author"
                />
                <div className="flex justify-end align-center gap-1 text-gray-700 font-poppins font-normal">
                  {forum.author}
                </div>
              </div>
              <div className="flex justify-end align-center gap-1 text-gray-400 font-poppins font-medium">
                <div className="w-auto h-auto flex align-center mb-1">
                  <img
                    className="w-5 h-5"
                    src="https://img.icons8.com/material-outlined/24/visible--v1.png"
                    alt=""
                  />
                </div>
                <div className="flex justify-end align-center gap-1 text-gray-700 font-poppins font-normal">
                  {forum.jumlah_dibaca}
                </div>
              </div>
            </div>
            <button className="bg-light-brown hover:bg-dark-grey text-white font-bold py-2 px-4 rounded-md">
              Selengkapnya
            </button>
            <div className="flex items-center"></div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CardForum;
