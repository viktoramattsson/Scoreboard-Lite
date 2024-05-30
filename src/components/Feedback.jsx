import React from 'react';
import { FaTimes } from 'react-icons/fa';

const Feedback = (props) => {
  const closeForm = () => {
    props.closeIt();
  };

  const handleSubmit = (event) => {
    setTimeout(() => {
      closeForm();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
      <div className="relative w-5/6 max-w-md px-4 pb-10 pt-14 bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 border border-gray-500 rounded-xl">
        <div className="absolute top-4 right-4">
          <button className="text-white text-2xl" onClick={closeForm}>
            <FaTimes />
          </button>
        </div>
        <h1 className="text-center text-white font-bold mb-6">
          We would love to get your feedback!
        </h1>

        <form
          className="flex flex-col"
          action="https://formkeep.com/f/3ed93e7e8269"
          acceptCharset="UTF-8"
          encType="multipart/form-data"
          method="POST"
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="utf8" value="✓" />
          <label className="text-white mb-2" htmlFor="email-address">
            Email address (optional)
          </label>
          <input
            className="rounded-full mb-4 h-8 p-2"
            type="email"
            id="email-address"
            name="email"
          />

          <label className="text-white mb-2" htmlFor="feedback">
            Feedback
          </label>
          <textarea
            className="rounded-lg mb-4 p-2 h-48"
            id="feedback"
            name="feedback"
            rows="10"
          ></textarea>

          <button
            className=" bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-white font-bold py-2 px-8 rounded-lg h-16 mt-4 shadow-2xl"
            type="submit"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
