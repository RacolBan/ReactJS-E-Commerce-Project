import React, { useEffect, useState } from "react";
import useCustomRouter from "../../Hooks/useCustomRouter";
import style from "./Pagination.module.css";

const Pagination = ({ totalPages, page, manufacture, sort }) => {
  const [firstArr, setFirstArr] = useState([]);
  const [lastArr, setLastArr] = useState([]);

  useEffect(() => {
    const newArr = [...Array(totalPages)].map((_, i) => i + 1);
    if (totalPages < 4) return setFirstArr(newArr);

    if (totalPages - page >= 4) {
      setFirstArr(newArr.slice(page - 1, page + 2));
      setLastArr(newArr.slice(totalPages - 1));
    } else {
      setFirstArr(newArr.slice(totalPages - 4, totalPages));
      setLastArr([]);
    }
  }, [totalPages, page]);

  const { pushQuery } = useCustomRouter();

  const isActive = (index) => {
    if (index === page) {
      return `${style.active}`;
    }
    return "";
  };
  const prev = () => {
    const newPage = Math.max(page - 1, 1);
    pushQuery({ page: newPage, manufacture, sort });
  };
  const next = () => {
    const newPage = Math.min(page + 1, totalPages);
    pushQuery({ page: newPage, manufacture, sort });
  };
  const jump = (num) => {
    pushQuery({ page: num, manufacture, sort });
  };
  return (
    <div className={`${style.pagination} `}>
      <button onClick={prev}>&laquo;</button>
      {firstArr.map((num) => (
        <button
          key={num}
          className={`${isActive(num)}`}
          onClick={() => jump(num)}
        >
          {num}
        </button>
      ))}

      {lastArr.length > 0 && <button>...</button>}

      {lastArr.map((num) => (
        <button
          key={num}
          className={`${isActive(num)}`}
          onClick={() => jump(num)}
        >
          {num}
        </button>
      ))}
      <button onClick={next}>&raquo;</button>
    </div>
  );
};

export default Pagination;
