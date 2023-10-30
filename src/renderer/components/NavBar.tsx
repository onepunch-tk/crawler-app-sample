import { ThemeToggle } from "@components/ThemeToggle";

export function NavBar() {
  console.log("navBar");
  return (
    <nav className="fixed top-0 bg-neutral-50 dark:bg-neutral-900 w-full h-10 flex flex-row-reverse items-center pr-5 transition-colors duration-500">
      <ThemeToggle />
    </nav>
  );
}
