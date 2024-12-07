
const MenuItemAddOns = () => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div>
          <h2 className="text-lg font-semibold">Add Ons for 17" Pizza</h2>
          <span className="text-gray-600 text-sm">
            Select up to 4 (optional)
          </span>
        </div>
        <p className="text-gray-600 text-sm py-1 px-2 bg-gray-200 rounded-full">
          Optional
        </p>
      </div>
      <div className="space-y-3">
        {[
          { name: "Chicken softcore", price: "₹ 750" },
          { name: "Sweet corn Pizza", price: "₹ 590" },
          { name: "Chicken pizza Ranch", price: "₹ 650" },
        ].map((item) => (
          <label
            key={item.name}
            className="flex items-center space-x-3 p-4 hover:bg-gray-200 rounded-lg"
          >
            <input
              type="checkbox"
              className="w-4 h-4 text-pink-500 rounded focus:ring-pink-500"
            />
            <span className="text-gray-700">{item.name}</span>
            <span className="ml-auto text-gray-600">{item.price}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default MenuItemAddOns;
