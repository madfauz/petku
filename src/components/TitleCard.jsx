import { Link } from "react-router-dom";

const TitleCard = ({ children }) => {
  return (
    <div className="h-[max-content] w-[92%] md:w-[86%] xl:w-[80%] flex justify-between">
      <div className="flex items-center">
        {children[0] ? (
          <Link to={children[1]}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#757575"
              className="bi bi-arrow-left-short w-10 h-10"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"
              />
            </svg>
          </Link>
        ) : (
          <></>
        )}
        <h3 className="text-lg font-poppins font-bold text-light-yellow md:text-2xl">
          {children[2]}
        </h3>
      </div>
      {children[3] ? (
        <a href={children[4]}>
          <h3 className="text-lg  font-poppins font-medium text-dark-grey md:text-2xl">
            {children[3]}
          </h3>
        </a>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default TitleCard;
