import React from "react";

const Header = () => {
  // const bg_url = new URL("../assets/mygo-bg.jpg", import.meta.url).href;
  
  return (
    <>
      <header class="bg-[var(--color-umiri)] bg-opacity-0 fixed top-0 w-full h-20 z-1 md:h-25 lg:h-30">
        <div class="px-1 mx-auto max-w-7xl sm:px-5 lg:px-8 flex lg:flex-1 justify-between">
          {/* <div class="px-0 mx-0 max-w-fit flex lg:flex-1 justify-between"> */}
          <div>
            <img
              class="h-10 w-auto my-5 md:h-15 lg:h-20"
              src="https://bang-dream-gbp-en.bushiroad.com/mygo/assets/images/common/logo_mygo.png"
              alt=""
            />
          </div>
          <div class="text-gray-300 font-serif text-center my-auto text-sm md:text-xl lg:text-3xl">
            <div>一生、バンドしてくれる？</div>
            <div>MyGO截圖搜尋</div>
          </div>
          <div>
            <img
              class="h-10 w-auto my-5 md:h-15 lg:h-20"
              src="https://static.wikia.nocookie.net/bandori/images/3/37/Ave_Mujica_logo.png"
            />
          </div>
          {/* <img class="w-max p-0 m-0" src={bg_url}/> */}
        </div>
      </header>
    </>
  );
};

export default Header;
