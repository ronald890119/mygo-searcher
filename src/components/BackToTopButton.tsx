import { Button } from "@/components/ui/button";
import { ArrowUpIcon } from "lucide-react";
import { useEffect, useState } from "react";

const BackToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 1000);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {visible && (
        <Button
          className="fixed end-5 bottom-5 size-12 rounded-full bg-gray-500 p-0 transition duration-300 hover:cursor-pointer hover:bg-gray-600"
          onClick={scrollToTop}
        >
          <ArrowUpIcon />
        </Button>
      )}
    </>
  );
};

export default BackToTopButton;
