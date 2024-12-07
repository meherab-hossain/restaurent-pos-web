/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { X } from "lucide-react";
import Image from "next/image";
import * as yup from "yup";
import FrequentlyBrought from "./FrequentlyBrought";
import MenuItemAddOns from "./MenuItemAddOns";
import MenuItemVarients from "./MenuItemVarients";

interface ProductFormData {
  name: string;
  price: number;
  category: string;
  description: string;
  stock: number;
  image?: File;
}

const productEntrySchema = yup.object().shape({
  name: yup.string().required("Product name is required"),
  price: yup
    .number()
    .required("Price is required")
    .min(0, "Price must be greater than 0"),
  category: yup.string().required("Category is required"),
  description: yup.string().required("Description is required"),
  stock: yup
    .number()
    .required("Stock quantity is required")
    .min(0, "Stock must be at least 0"),
});

interface ModalProps {
  modalStatus: boolean;
  data?: any;
  modalOnClose: () => void;
  modalOnEmit?: (data: ProductFormData) => Promise<void>;
}

const MenuItemSelectModal = ({
  modalStatus,
  data,
  modalOnClose,
}: ModalProps) => {
  const handleFormSubmit = async (formData: ProductFormData) => {
    console.log(formData);
  };

  return (
    <Dialog open={modalStatus} onClose={() => {}} className="relative z-50">
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/30">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="relative w-full max-w-xl rounded-xl bg-white shadow-xl">
            <div className="flex items-center justify-between shadow-sm px-6 py-4">
              <DialogTitle className="text-lg font-semibold text-gray-900">
                {data?.id ? "Edit Product" : "Add New Product"}
              </DialogTitle>
              <button
                onClick={modalOnClose}
                className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none disabled:opacity-50"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div>
              <div className="max-h-[calc(100vh-16rem)] overflow-y-auto px-6 py-4">
                <div className="relative w-full h-64 rounded-lg overflow-hidden mb-4">
                  <Image
                    src="/images/pizza.jpg"
                    alt="Massey Onion Pizza"
                    layout="fill"
                    objectFit="cover"
                    className="w-full"
                  />
                </div>

                <h1 className="text-2xl font-bold mb-2">Massey Onion Pizza</h1>
                <p className="text-xl text-gray-700 mb-6">₹5,250</p>
                {/*  menue variants */}
                <MenuItemVarients />

                {/* Add ons */}
                <MenuItemAddOns />
                {/*  frequently bought together */}
                <FrequentlyBrought />
                {/* special instructions */}
                <div className="mb-8">
                  <h2 className="text-lg font-semibold mb-3">
                    Special instructions
                  </h2>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                    rows={3}
                    placeholder="Special instructions are subject to the restaurant's approval. Tell us here."
                  />
                </div>

                {/* if this item is not available */}
                <div className="mb-8">
                  <h2 className="text-lg font-semibold mb-3">
                    If this item is not available
                  </h2>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500">
                    <option>
                      Cancel this item and continue with the rest of my order
                    </option>
                    <option>Cancel my entire order</option>
                    <option>Call me and let me know</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 shadow px-6 py-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    // onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-4 py-2">1</span>
                  <button
                    // onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
                <button className="flex-1 bg-pink-500 text-white py-3 px-6 rounded-lg hover:bg-pink-600 transition-colors">
                  Add to basket
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default MenuItemSelectModal;
