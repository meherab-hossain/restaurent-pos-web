import { Plus, Trash } from 'lucide-react';

const CartItem = () => {
  return (
    <div className="max-w-md mx-auto bg-white p-4 space-y-2 border rounded-md h-[calc(100vh-250px)]">
      {/* Delivery Options */}
      {/* <div className="flex gap-4">
        <button className="px-4 py-2 bg-pink-50 rounded-lg">
          <div className="text-gray-900">Delivery</div>
          <div className="text-sm text-gray-500">Standard (55 - 75 mins)</div>
        </button>
        <button className="px-4 py-2 hover:bg-gray-50 rounded-lg">
          <div className="text-gray-900">Pick-up</div>
        </button>
      </div> */}

      {/* Items List */}
      <div className="h-[calc(100%-150px)] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Your items</h2>
        
        <div className="space-y-4">
          {/* Kebab Pizza Item */}
          <div className="flex items-start gap-3">
            <img 
              src="/api/placeholder/64/64" 
              alt="Kebab Pizza"
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h3 className="font-medium">Kebab Cocktail Pizza</h3>
              <div className="text-sm font-medium">Medium</div>
              <div className="text-sm text-gray-500">Medium, More Naga</div>
              <div className="mt-1 font-medium">Tk 564</div>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 rounded-full px-3 py-1">
              <button className="p-1 hover:bg-gray-200 rounded-full">
                <Trash size={16} />
              </button>
              <span className="w-4 text-center">1</span>
              <button className="p-1 hover:bg-gray-200 rounded-full">
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Sausage Pizza Item */}
          <div className="flex items-start gap-3">
            <img 
              src="/api/placeholder/64/64" 
              alt="Sausage Pizza"
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h3 className="font-medium">Sausage Carnival Pizza</h3>
              <div className="text-sm font-medium">Small</div>
              <div className="text-sm text-gray-500">Medium</div>
              <div className="mt-1 font-medium">Tk 335</div>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 rounded-full px-3 py-1">
              <button className="p-1 hover:bg-gray-200 rounded-full">
                <Trash size={16} />
              </button>
              <span className="w-4 text-center">1</span>
              <button className="p-1 hover:bg-gray-200 rounded-full">
                <Plus size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Total */}
      <div className="border-t pt-4">
        <div className="flex justify-between items-center mb-2">
          <div className="text-lg font-medium">
            Total <span className="text-sm font-normal text-gray-500">(incl. fees and tax)</span>
          </div>
          <div className="text-lg font-medium">Tk 999</div>
        </div>
        <button className="text-gray-600 text-sm hover:underline">
          See summary
        </button>
      </div>

      {/* Checkout Button */}
      <button className="w-full bg-pink-600 text-white py-4 rounded-lg hover:bg-pink-700 transition-colors">
        Review payment and address
      </button>
    </div>
  );
};

export default CartItem;