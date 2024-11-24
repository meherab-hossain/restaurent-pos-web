/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import CartItem from "@/components/common/CartItem";
import cookies from "@/utils/cookies";
import { ChevronLeft, ChevronRight, Plus, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import FriendHoc from "../../../nextjs-friend";
import Pizza from "./../../../public/images/pizza.jpg";
interface CustomArrowProps {
  [key: string]: any;
}

// const NextArrow = (props:any) => {
//   const { className, onClick } = props;
//   return (
//     <div
//       className={`${className} custom-arrow`}
//       onClick={onClick}
//       style={{
//         display: "block",
//         background: "blue",
//         borderRadius: "50%",
//         padding: "10px",
//         color: "white",
//         fontSize: "20px",
//       }}
//     >
//      <ChevronRight className="text-blue-800" size={24} />
//     </div>
//   );
// };

// const PrevArrow = (props:any) => {
//   const { className, onClick } = props;
//   return (
//     <div
//       className={`${className} custom-arrow`}
//       onClick={onClick}
//       style={{
//         display: "block",
//         background: "red",
//         borderRadius: "50%",
//         padding: "10px",
//         color: "white",
//         fontSize: "20px",
//       }}
//     >
//       <ChevronLeft className="text-blue-800" size={24} />
//     </div>
//   );
// };
const NextArrow = ({ onClick }: any) => (
  <div
    onClick={onClick}
    className="absolute -right-[45px] top-1/2 transform -translate-y-1/2 transition-all ease-in border hover:scale-110 hover:bg-gray-100 bg-white-500 text-black rounded-full p-2 cursor-pointer shadow-lg"
  >
    <ChevronRight className="text-black" size={24} />
  </div>
);

const PrevArrow = ({ onClick }: any) => (
  <div
    onClick={onClick}
    className="absolute -left-[45px] top-1/2 transform -translate-y-1/2 transition-all ease-in border hover:scale-110 hover:bg-gray-100 bg-white text-black rounded-full p-2 cursor-pointer shadow-lg"
  >
    <ChevronLeft className="text-black" size={24} />
  </div>
);
const DashboardPage = () => {
  const [activeCategory, setActiveCategory] = useState("Popular");
  const [cart, setCart] = useState([]);
  const menuRef = useRef(null);
  const categoriesRef = useRef(null);
  const [userType, setUserType] = useState<string | null>(null);
  // const [isCategorySliderSticky, setIsCategorySliderSticky] = useState(false);
  // const offset = typeof window !== 'undefined' ? window.scrollY : 0;
  // useEffect(() => {
    
  //   const handleSearchAndCategorySlider = () => {
  //     // Get the vertical scroll position
  //     console.log(offset, "offset");
  //     setIsCategorySliderSticky(offset < 2); // Adjust "100" based on when it should stick
  //   };

  //   window.addEventListener("scroll", handleSearchAndCategorySlider);
  //   // return () => window.removeEventListener("scroll", handleSearchAndCategorySlider);
  // }, [offset]);
  // console.log(isCategorySliderSticky, "isCategorySliderSticky");
  
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const sliderSettings = {
    // dots: false,
    // infinite: true,
    // arrows: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    nextArrow: <NextArrow to="next" />,
    prevArrow: <PrevArrow to="prev" />,
  };
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
    // Add more menu items here
  ];

  const handleScroll = () => {
    if (menuRef.current) {
      const sections = menuRef.current.getElementsByClassName("menu-section");
      let currentSection = "";

      Array.from(sections).forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100) {
          currentSection = section.id;
        }
      });

      if (currentSection) {
        setActiveCategory(currentSection);
        const categoryElement = document.getElementById(
          `category-${currentSection}`
        );
        if (categoryElement && categoriesRef.current) {
          categoriesRef.current.scrollTo({
            left: categoryElement.offsetLeft - 100,
            behavior: "smooth",
          });
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToCategory = (categoryId) => {
    const element = document.getElementById(categoryId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setActiveCategory(categoryId);
  };

  return (
    <>
      <div className={`${
        isScrolled ? "fixed top-[70px] left-0 right-0 pt-[3.75rem] pb-8 transition-all ease-in" : ""
      } flex gap-16 items-center h-[70px] bg-white shadow-lg px-12 max-w-full z-40`}>
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
              <div className="bg-white max-w-full">
                <Slider {...sliderSettings}>
                  {categories.map((category) => (
                    <div key={category.id} className="">
                      <button
                        id={`category-${category.id}`}
                        onClick={() => scrollToCategory(category.id)}
                        className={`flex items-center space-x-2  px-4 py-2 transition-all ${
                          activeCategory === category.id
                            ? "border-b-2 border-pink-500"
                            : "text-gray-700 hover:bg-gray-200 rounded-md"
                        }`}
                      >
                        <span>{category.name}</span>
                        <span className="text-sm">({category.count})</span>
                      </button>
                    </div>
                  ))}
                </Slider>
              </div>
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
