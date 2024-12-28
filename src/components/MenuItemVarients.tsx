/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

const MenuItemVarients = ({selectedMenuData, onVariantSelect}: any) => {
  return (
    <div className="mb-8  border bg-[#fdf2f7] rounded-lg p-2">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Variation</h2>
        <span className="text-red-600">Required</span>
      </div>

      <div className="space-y-3">
        {selectedMenuData?.variants && selectedMenuData?.variants?.map((item: any) => (
          <label
            key={item}
            className="flex items-center justify-between gap-3 py-3 hover:bg-pink-200 rounded-lg px-2"
          >
            <div className="flex gap-2 items-center">
              <input
                type="radio"
                name="item"
                value={item}
                className="w-4 h-4 text-pink-500 focus:ring-pink-500"
                onChange={() => onVariantSelect(item)}
              />
              <span className="text-gray-700">{item?.name}</span>
            </div>
            <span className="ml-auto text-gray-600">
              ₹{" "}
              {item?.price}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default MenuItemVarients;
