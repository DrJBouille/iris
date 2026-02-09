import { ButtonProps } from './type/ButtonProps';

function BlackButton({text, onclick, type}: ButtonProps) {
  return(
    <button
      type={type} onClick={onclick}
      className="w-full rounded bg-neutral-950 hover:bg-zinc-800 text-white py-2 font-semibold"
    >
      {text}
    </button>
  );
}

export default BlackButton;
