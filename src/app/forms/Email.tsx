import React from "react";

const EmailForm = () => {
  return (
    <div>
      <label className="block text-sm/6 font-medium text-gray-900">
        Email address
      </label>
      <div className="mt-2">
        <input
          id="email"
          name="email"
          type="email"
          required
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
        />
      </div>
    </div>
  );
};

export default EmailForm;
