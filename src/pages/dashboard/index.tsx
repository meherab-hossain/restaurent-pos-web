/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import CategoriesSlider from "@/components/CategoriesSlider";
import CartItem from "@/components/common/CartItem";
import cookies from "@/utils/cookies";
import { Plus, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import FriendHoc from "../../../nextjs-friend";
import Pizza from "./../../../public/images/pizza.jpg";


const DashboardPage = () => {
  const [activeCategory, setActiveCategory] = useState("Popular");
  const [cart, setCart] = useState([]);
  const menuRef = useRef(null);
  const categoriesRef = useRef(null);
  const [userType, setUserType] = useState<string | null>(null);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isProgrammaticScroll, setIsProgrammaticScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  
  useEffect(() => {
    const userTypeFromCookie = cookies.get("user_type");
    setUserType(userTypeFromCookie);
  }, []);

  const categories = [
    { id: "popular", name: "Popular", count: 6 },
    { id: "combo", name: "Combo", count: 2 },
    { id: "pizza", name: "Pizza", count: 12 },
    { id: "burger", name: "Burger", count: 8 },
    { id: "snacks", name: "Snacks", count: 3 },
    { id: "set-menu", name: "Set Menu", count: 4 },
    { id: "milkshake", name: "Milkshake", count: 3 },
    { id: "mocktail", name: "Mocktail", count: 6 },
    { id: "coffee", name: "Coffee", count: 5 },
  ];

  const menuItems = [
    {
      id: 1,
      name: "BBQ Meat Machine Pizza",
      price: 335,
      description:
        "Topped with beef & chicken both with freshly cut vegetables, cheese & in a...",
      category: "popular",
    },
    {
      id: 2,
      name: "Sausage Carnival Pizza",
      price: 335,
      description: "Big Big Sausage, Mushroom, Spice.",
      category: "popular",
    },
    {
      id: 3,
      name: "BBQ Meat Machine Pizza",
      price: 335,
      description:
        "Topped with beef & chicken both with freshly cut vegetables, cheese & in a...",
      category: "combo",
    },
    {
      id: 4,
      name: "Sausage Carnival Pizza",
      price: 335,
      description: "Big Big Sausage, Mushroom, Spice.",
      category: "pizza",
    },
    {
      id: 5,
      name: "BBQ Meat Machine Pizza",
      price: 335,
      description:
        "Topped with beef & chicken both with freshly cut vegetables, cheese & in a...",
      category: "burger",
    },
    {
      id: 6,
      name: "Sausage Carnival Pizza",
      price: 335,
      description: "Big Big Sausage, Mushroom, Spice.",
      category: "snacks",
    },
    // Add more menu items here
  ];

  const scrollToCategory = (categoryId: string) => {
    const section = document.getElementById(categoryId);
  
    if (section) {
      const title = section.querySelector("h2");
      if (title) {
        const rect = title.getBoundingClientRect();
        const headerHeight = 70; // Adjust based on your fixed header
        const categoryMenuHeight = 95; // Space above the category title
        const offset = window.scrollY + rect.top - headerHeight - categoryMenuHeight;
  
        setIsProgrammaticScroll(true); // Disable scroll detection temporarily
  
        window.scrollTo({
          top: offset,
          behavior: "smooth",
        });
  
        setTimeout(() => {
          setIsProgrammaticScroll(false); // Re-enable scroll detection
        }, 500); // Match smooth scroll duration
  
        setActiveCategory(categoryId);
      }
    }
  };
  
  

  const handleScroll = () => {
    if (isProgrammaticScroll) return; // Skip during programmatic scrolls
  
    if (menuRef.current) {
          const sections = menuRef.current.getElementsByClassName("menu-section");
          let currentSection = "";
          let closestSection = "";
          let closestDistance = Infinity;
    
          Array.from(sections).forEach((section) => {
            const rect = section.getBoundingClientRect();
    
            // Check if the section's top is within the visible area
            if (rect.top >= 0 && rect.top <= 150) {
              currentSection = section.id;
            }
    
            // Find the section closest to the top of the viewport
            const distance = Math.abs(rect.top);
            if (distance < closestDistance) {
              closestSection = section.id;
              closestDistance = distance;
            }
          });
    
          // Use the closest section if no section is fully visible
          if (!currentSection) {
            currentSection = closestSection;
          }
    
          if (currentSection) {
            setActiveCategory(currentSection);
    
            const categoryElement = document.getElementById(`category-${currentSection}`);
            if (categoryElement && categoriesRef.current) {
              categoryElement.scrollIntoView({
                behavior: "smooth",
                inline: "center",
              });
            }
          }
        }
  };
  
  

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isProgrammaticScroll]);

  return (
    <>
      <div
        className={`${
          isScrolled
            ? "fixed top-[70px] left-0 right-0 pt-[3rem] pb-8 transition-all ease-in"
            : ""
        } flex gap-16 items-center h-[70px] bg-white shadow-lg px-12 max-w-full z-40`}
      >
        {/* Search Bar */}
        <div className="relative mb-6 w-[20%]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search in menu"
            className="w-full pl-10 pr-4 py-2 h-8 rounded-full border border-gray-200 bg-gray-100 focus:outline-none"
          />
        </div>
        {/* Categories Slider */}
        <div className="max-w-[70%] w-full flex-1">
          <div className="relative max-w-full">
            <div ref={categoriesRef} className="flex space-x-4 py-2 mb-6">
            <CategoriesSlider
          categories={categories}
          activeCategory={activeCategory}
          scrollToCategory={scrollToCategory}
        />
              
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 lg:m-8 m-4">
        {/* Menu Sections */}
        <div ref={menuRef} className="space-y-8 mt-8">
          {categories.map((category) => (
            <section
              key={category.id}
              id={category.id}
              className="menu-section space-y-4"
            >
              <h2 className="text-2xl font-bold flex items-center space-x-2">
                <span>{category.name}</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {menuItems
                  .filter((item) => item.category === category.id)
                  .map((item) => (
                    <div
                      key={item.id}
                      className="bg-white border transition-transform duration-300 ease-in hover:scale-105 hover:bg-[#fdf2f7] rounded-xl shadow-sm p-4 flex gap-2 justify-between items-start"
                    >
                      <div className="space-y-1 box-border w-[75%]">
                        <h2 className="text-lg font-semibold text-gray-900">
                          {item.name}
                        </h2>
                        <div className="text-sm text-gray-600">from Tk 345</div>
                        <p className="text-sm text-gray-500">
                          {item.description}
                        </p>
                      </div>

                      <div className="relative box-border w-[25%]">
                        <img
                          src={Pizza.src}
                          alt="Kebab Cocktail Pizza"
                          className="w-24 h-24 rounded-lg object-cover"
                        />
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-white text-sm">
                          <Plus />
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </section>
          ))}
        </div>

        {/* Cart Preview */}
        <div className="fixed bottom-6 right-6">
          <CartItem />
        </div>
      </div>
    </>
  );
};

export default FriendHoc(DashboardPage, {
  layout: "base",
  middleware: [],
});
