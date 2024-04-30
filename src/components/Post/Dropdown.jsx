import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";

const Dropdown = ({ deleteComment, handleDelete, setIsEdit }) => {
  const [inputChecked, setInputChecked] = useState(false);

  return (
    <label className={`popup `}>
      <input
        onChange={() => setInputChecked(!inputChecked)}
        checked={inputChecked ? true : false}
        type="checkbox"
      />
      <div className="burger" tabIndex="0">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <nav
        onMouseLeave={() => setInputChecked(false)}
        className={`popup-window `}
      >
        <legend>Actions</legend>
        <ul>
          {
            <li>
              <button
                onClick={() => {
                  setIsEdit();
                  setInputChecked(false);
                }}
              >
                <FiEdit2 />
                <span>Düzenle</span>
              </button>
            </li>
          }
          <hr />
          <li>
            <button onClick={deleteComment ? deleteComment : handleDelete}>
              <FaTrashAlt />
              <span>Sil</span>
            </button>
          </li>
        </ul>
      </nav>
    </label>
  );
};

export default Dropdown;
