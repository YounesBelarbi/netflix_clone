interface MobileMenuProps {
  visible?: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ visible }) => {
  if (!visible) {
    return null;
  }
  const mobileMenuList = [
    "Accueil",
    "Series",
    "Films",
    "Nouveautés",
    "Ma liste",
    "Parcourir",
  ];
  return (
    <div className="absolute left-0 top-8 flex w-56 flex-col border-2 border-gray-800 bg-black py-5">
      <div className="flex flex-col gap-4">
        {mobileMenuList.map((item) => (
          <div className="px-3 text-center text-white hover:underline">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileMenu;
