import Button from "../Button";

interface HeaderProps {
  title: string;
  isLogged?: boolean;
}

const Header = ({ title, isLogged }: HeaderProps) => {
  return (
    <header className="fixed top-0 left-0 w-full bg-stone-300 text-center py-3 grid grid-cols-3">
      <h1 className="text-4xl font-bold text-yellow-900 col-start-2">
        {title}
      </h1>
      {isLogged ? (
        <Button
          label="Sign Out"
          path="/signin"
          onClick={() => localStorage.removeItem("wtd-token")}
        />
      ) : null}
    </header>
  );
};

export default Header;
