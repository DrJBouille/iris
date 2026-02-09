import { LucideIcon } from "lucide-react";

interface SquareButtonProps {
  icon: LucideIcon;
  onClick: () => void;
}

function SquareIconButton({ icon: Icon, onClick }: SquareButtonProps) {
  return (
    <button
      className=""
      onClick={onClick}
    >
      <Icon size={24}/>
    </button>
  );
}

export default SquareIconButton;
