
const FrequentlyBrought = () => {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-3">Frequently bought together</h2>
      <div className="space-y-3">
        {[
          { name: "Chicken softcore", price: "₹ 750" },
          { name: "Sweet corn Pizza", price: "₹ 590" },
          { name: "Chicken pizza Ranch", price: "₹ 650" },
        ].map((item) => (
          <label key={item.name} className="flex items-center space-x-3">
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

export default FrequentlyBrought;
