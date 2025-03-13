import { Link } from "react-router-dom";
const OptionButton = ({ children }) => {
  // Ambil URL dari browser
  const urlParams = new URLSearchParams(window.location.search);

  // Ambil nilai dari parameter 'data'
  const dataParam = urlParams.get("data");

  const onClick = (e, title) => {
    e.preventDefault();
    window.location.href = "/search?data=" + title;
  };

  return (
    <div
      className="flex justify-start w-[92%] md:w-[86%] xl:w-[80%]  items-center gap-4 py-8 overflow-x-auto"
      style={{ scrollbarWidth: "none" }}
    >
      {children.map((title, index) =>
        dataParam === title ? (
          <Link
            key={index}
            to={"/"}
            className="bg-light-brown font-semibold text-white py-2 px-4 border border-transparent rounded"
          >
            {title}
          </Link>
        ) : (
          <div
            key={index}
            onClick={(e) => onClick(e, title)}
            className="bg-transparent cursor-pointer hover:bg-light-brown text-dark-grey font-semibold hover:text-white py-2 px-4 border border-dark-grey hover:border-transparent rounded duration-300"
          >
            {title}
          </div>
        )
      )}
    </div>
  );
};
export default OptionButton;
