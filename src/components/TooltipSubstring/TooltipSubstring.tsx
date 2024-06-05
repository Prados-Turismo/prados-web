import { Tooltip } from "@chakra-ui/react";
import { capitalize } from "../../utils/capitalize";

interface ITooltipSubstring {
  name: string;
  length: number;
}

const TooltipSubstring = ({ name, length }: ITooltipSubstring) => {
  return name?.length < length ? (
    <>{capitalize(name?.toLocaleLowerCase())}</>
  ) : name ? (
    <Tooltip label={name} hasArrow>{`${name?.substring(
      0,
      length,
    )}...`}</Tooltip>
  ) : (
    <>-</>
  );
};

export default TooltipSubstring;
