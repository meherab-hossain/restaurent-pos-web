import { removeFromCart, updateCartItemQuantity } from '@/store/feature/menuSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { RootState } from '@/store/store';
import { Plus, Trash } from 'lucide-react';

const CartItem = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state: RootState) => state.menu.cart);
  const categories = useAppSelector((state: RootState) => state.menu.categories);

  const getItemDetails = (menu_item_id: number) => {
    for (const category of categories) {
      const item = category.menu_items.find(item => item.id === menu_item_id);
      if (item) return item;
    }
    return null;
  };

  const calculateTotal = () => {
    return cart.reduce((total, cartItem) => {
      const item = getItemDetails(cartItem.menu_item_id);
      if (!item) return total;
      return total + (parseFloat(item.price) * cartItem.quantity);
    }, 0);
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-4 space-y-2 border rounded-md h-[calc(100vh-230px)]">
      <div className="h-[calc(100%-120px)] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Your items</h2>
        
        <div className="space-y-4">
          {cart.map((cartItem) => {
            const item = getItemDetails(cartItem.menu_item_id);
            if (!item) return null;

            return (
              <div key={cartItem.menu_item_id} className="flex items-start gap-3">
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <div className="mt-1 font-medium">Tk {item.price}</div>
                </div>
                <div className="flex items-center gap-2 bg-gray-50 rounded-full px-3 py-1">
                  <button 
                    className="p-1 hover:bg-gray-200 rounded-full"
                    onClick={() => dispatch(removeFromCart(cartItem.menu_item_id))}
                  >
                    <Trash size={16} />
                  </button>
                  <span className="w-4 text-center">{cartItem.quantity}</span>
                  <button 
                    className="p-1 hover:bg-gray-200 rounded-full"
                    onClick={() => dispatch(updateCartItemQuantity({
                      menu_item_id: cartItem.menu_item_id,
                      quantity: cartItem.quantity + 1
                    }))}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col justify-end">
      <div className="border-t pt-4">
        <div className="flex justify-between items-center mb-2">
          <div className="text-lg font-medium">Total</div>
          <div className="text-lg font-medium">Tk {calculateTotal()}</div>
        </div>
      </div>

      <button className="w-full bg-pink-600 text-white px-2 py-4 rounded-lg hover:bg-pink-700 transition-colors">
        Review payment and address
      </button>
      </div>
    </div>
  );
};

export default CartItem;