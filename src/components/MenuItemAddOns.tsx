/* eslint-disable @typescript-eslint/no-explicit-any */

const MenuItemAddOns = ({selectedMenuData, onAddonsChange, selectedAddons}: any) => {
  const handleAddonToggle = (addon: { id: number; name: string; price: string }) => {
    const newSelectedAddons = selectedAddons.some((item: any) => item.id === addon.id)
      ? selectedAddons.filter((item: any) => item.id !== addon.id)
      : [...selectedAddons, addon];
    onAddonsChange(newSelectedAddons);
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div>
          <h2 className="text-lg font-semibold">{selectedMenuData?.name} Add Ons</h2>
          {/* <span className="text-gray-600 text-sm">
            Select up to 4 (optional)
          </span> */}
        </div>
        <p className="text-gray-600 text-sm py-1 px-2 bg-gray-200 rounded-full">
          Optional
        </p>
      </div>
      <div className="space-y-3">
        {selectedMenuData?.addons && selectedMenuData?.addons?.map((item: any) => (
          <label
            key={item.name}
            className="flex items-center space-x-3 p-4 hover:bg-gray-200 rounded-lg"
          >
            <input
              type="checkbox"
              className="w-4 h-4 text-pink-500 rounded focus:ring-pink-500"
              checked={selectedAddons.some((addon: any) => addon.id === item.id)}
              onChange={() => handleAddonToggle({
                id: item.id,
                name: item.name,
                price: item.price
              })}
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
