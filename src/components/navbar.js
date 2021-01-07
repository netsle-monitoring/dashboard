import { ReactComponent as NetsleLogo } from "../logo.svg";
const NavBar = () => {
    return (
        <nav class="relative items-center justify-between px-2 py-3 navbar-expand-lg bg-gray-800 shadow-md">
        <div class="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div class="w-full relative flex justify-between lg:w-auto  px-4 lg:static lg:block lg:justify-start">
            <div className="grid grid-cols-2 gap-0">
              <div className="col-span-1 mt-2 ml-5">
                <NetsleLogo
                  className="loading"
                  color="white"
                  style={{
                    color: "white",
                    width: 20,
                    height: 20,
                  }}
                />
              </div>
              <a
                class="row-span-1 text-sm font-bold leading-relaxed inline-block  py-2 whitespace-no-wrap uppercase text-white"
                href="#pablo"
              >
                Netsle
              </a>
            </div>
            <button
              class="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
            >
              <span class="block relative w-6 h-px rounded-sm bg-white"></span>
              <span class="block relative w-6 h-px rounded-sm bg-white mt-1"></span>
              <span class="block relative w-6 h-px rounded-sm bg-white mt-1"></span>
            </button>
          </div>
          <div
            class="lg:flex flex-grow items-center"
            id="example-navbar-warning"
          >
            <ul class="flex flex-col lg:flex-row list-none ml-auto">
              <li class="nav-item">
                <a
                  class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="#"
                >
                  Discover
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="#"
                >
                  Profile
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="#"
                >
                  Setting
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
}

export default NavBar;