import { NormalTextProps } from './type/TextProps';

function TitleText({text}: NormalTextProps) {
  return(
    <p className="text-neutral-950 text-3xl font-semibold">{text}</p>
  );
}

// @ts-expect-error("Should work")
export default TitleText;
