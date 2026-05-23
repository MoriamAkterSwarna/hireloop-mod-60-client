## prompt one: to generate the navbar

```
I am developing a hiring website. where job seekers can apply for jobs and there will be recruiter and admin, there will all other related pages and dashboard. right now i need a navigation bar. give me a navbar

I am using 
- nextjs
- heroui 
- tailwindcss

give me the navbar component code. it will be mobile responsive navbar. will have a logo as well and necessary links in the image

```
-----------------
### prompt 2 (correction)
i am using hero ui v3 ( not v2)
-----------------
### prompt 3(correction didn't work, giving specific instruction with example)
```
do not use hero ui component. use html5 tags. If needed look at this code below to get inspriation: 

import { useState } from "react";
import { Link, Button } from "@heroui/react";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
      <header className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="sr-only">Menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
          <div>Logo</div>
        </div>
        <ul className="hidden items-center gap-4 md:flex">
          <li>
            <Link href="#">Features</Link>
          </li>
          <li>
            <Link href="#">Pricing</Link>
          </li>
        </ul>
      </header>
      {isMenuOpen && (
        <div className="border-t border-separator md:hidden">
          <ul className="flex flex-col gap-2 p-4">
            <li>
              <Link href="#" className="block py-2">
                Features
              </Link>
            </li>
            <li>
              <Link href="#" className="block py-2">
                Pricing
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
```

-------------------
### prompt 3 (improvements)
the menu options will be right aligned only logo will be left aligned and there will be a vertical divider before the signIn link in the navbar
--------------------
## Footer
```
Now give me footer for this website using the attached image. 
```

correction
---------
i am using @gravity-ui/icons and it is already installed
----
