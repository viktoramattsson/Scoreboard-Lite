import React from 'react';

const Feedback = (props) => {
  const closeForm = () => {
    props.closeIt();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    const formData = new FormData(form);

    fetch(form.action, {
      method: form.method,
      body: formData,
      headers: {
        Accept: 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          closeForm();
        } else {
          alert('There was an issue submitting the form');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('There was an issue submitting the form');
      });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
      <div className="relative w-full max-w-md p-4 pt-10 bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 border border-gray-500 rounded-xl">
        <div className="absolute top-2 right-2">
          <button className="text-white text-2xl" onClick={closeForm}>
            ×
          </button>
        </div>
        <h1 className="text-center text-white font-bold mb-6">
          Please send your feedback
        </h1>
        <p className="text-white mb-4">We rely on it to improve the app</p>
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
            Email address
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
            className="rounded-lg mb-4 p-2 h-32"
            id="feedback"
            name="feedback"
            rows="10"
          ></textarea>

          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-8 rounded-full mt-4"
            type="submit"
          >
            Skicka
          </button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
