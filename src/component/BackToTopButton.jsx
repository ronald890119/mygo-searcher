import { useEffect, useState } from "react";

const BackToTopButton = () => {
	// is this component visible
  const [visible, setVisible] = useState(false);

	// effect to set whether it is visible
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1000) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {visible && <button
        class="fixed bottom-5 end-5 rounded-full bg-gray-500 p-4 transition duration-300 hover:bg-gray-600 hover:cursor-pointer"
        onClick={scrollToTop}
      >
        <svg
          class="w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="#FFFFFF"
          viewBox="0 0 24 24"
          stroke-width="3"
          stroke="#FFFFFF"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
          />
        </svg>
      </button>}
    </>
  );
};

export default BackToTopButton;
