/* eslint-disable @typescript-eslint/no-explicit-any */

const MenuItemVarients = ({varients}: any) => {
  return (
    <div className="mb-8  border bg-[#fdf2f7] rounded-lg p-2">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Variation</h2>
        <span className="text-red-600">Required</span>
      </div>

      <div className="space-y-3">
        {["Small", "Medium", "Large"].map((size) => (
          <label
            key={size}
            className="flex items-center justify-between gap-3 py-3 hover:bg-pink-200 rounded-lg px-2"
          >
            <div className="flex gap-2 items-center">
              <input
                type="radio"
                name="size"
                value={size}
                className="w-4 h-4 text-pink-500 focus:ring-pink-500"
              />
              <span className="text-gray-700">{size}</span>
            </div>
            <span className="ml-auto text-gray-600">
              ₹{" "}
              {size === "Small" ? "875" : size === "Medium" ? "1,050" : "1,400"}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default MenuItemVarients;
