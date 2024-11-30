export default function Footer() {
    return (
      <footer className="w-full bg-white p-8">
        <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 bg-white text-center md:justify-between">
          <img src="https://docs.material-tailwind.com/img/logo-ct-dark.png" alt="logo-ct" className="w-10" />
          <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
            <li>
              <a
                href="#"
                className="text-blue-gray-600 font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-blue-gray-600 font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
              >
                License
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-blue-gray-600 font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
              >
                Contribute
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-blue-gray-600 font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-8 border-blue-gray-50" />
        <p className="text-blue-gray-600 text-center font-normal">
          &copy; 2023 Material Tailwind
        </p>
      </footer>
    );
  }
  