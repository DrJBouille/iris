import { ButtonProps } from './type/ButtonProps';

function SimpleButton({text, onclick}: ButtonProps) {
  return(
    <button
      type="button" onClick={onclick}
      className="w-full rounded text-neutral-950 hover:bg-neutral-100 p-2 px-3"
    >
      {text}
    </button>
  );
}

export default SimpleButton;
