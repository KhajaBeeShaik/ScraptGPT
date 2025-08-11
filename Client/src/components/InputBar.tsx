import React from "react";
import PropTypes from "prop-types";

const InputBar = ({ currentMessage, setCurrentMessage, onSubmit }) => {
  const handleChange = (e) => {
    setCurrentMessage(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (currentMessage.trim() !== "") {
      onSubmit(e);
    }
  };

  const isMessageEmpty = currentMessage.trim() === "";

  return (
    <form onSubmit={handleFormSubmit} className="p-4 bg-white">
      <div className="flex items-center bg-[#F9F9F5] rounded-full p-3 shadow-md border border-gray-200">
        <button
          type="button"
          className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all duration-200"
          aria-label="Add emoji"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </button>
        <label htmlFor="message-input" className="sr-only">Type a message</label>
        <input
          id="message-input"
          type="text"
          placeholder="Type a message"
          value={currentMessage}
          onChange={handleChange}
          className="flex-grow px-4 py-2 bg-transparent focus:outline-none text-gray-700"
        />
        <button
          type="button"
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-all duration-200"
          aria-label="Attach file"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
          </svg>
        </button>
        <button
          type="submit"
          className={`rounded-full p-3 ml-2 shadow-md transition-all duration-200 group ${
            isMessageEmpty
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-teal-500 to-teal-400 hover:from-teal-600 hover:to-teal-500"
          }`}
          aria-label="Send message"
          disabled={isMessageEmpty}
        >
          <svg className={`w-6 h-6 text-white transform rotate-45 transition-transform duration-200 ${!isMessageEmpty && "group-hover:scale-110"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
          </svg>
        </button>
      </div>
    </form>
  );
};

InputBar.propTypes = {
  currentMessage: PropTypes.string.isRequired,
  setCurrentMessage: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default InputBar;
