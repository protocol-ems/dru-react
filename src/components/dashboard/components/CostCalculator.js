import React, { useState, useEffect } from "react";

export default function CostCalculator() {
  const [users, setUsers] = useState(5);
  const [cost, setCost] = useState(50);

  useEffect(() => {
    const handleCost = (e) => {
      if (users < 5) {
        setCost(50);
      }
      if (users > 5) {
        setCost(50 + users * 2 - 10);
      }
    };
    handleCost();
  }, [users]);

  return (
    <div className="w-full p-4 xl:w-1/4 md:w-3/6 mx-auto">
      <div className="relative flex flex-col h-full p-8 bg-white border rounded-lg shadow-xl">
        <div className="py-4 text-xl font-bold text-gray-700">
          Cost Calculator
        </div>
        <label className="label">Enter estimated monthly users</label>
        <input
          className="input input-accent"
          type="number"
          onChange={(e) => setUsers(e.target.value)}
          value={users}
          min="1"
        ></input>

        <strong className="flex items-end mx-auto text-2xl font-black leading-none text-black py-4">
          {users > 499 ? (
            <div>Contact us for special pricing</div>
          ) : (
            <span> ${cost} per month</span>
          )}
        </strong>
      </div>
    </div>
  );
}
