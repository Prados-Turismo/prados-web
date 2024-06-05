import { ReactNode } from "react";
import { Stack, Text, Tooltip } from "@chakra-ui/react";
import { pixelToRem } from "../../utils";

interface ITooltipForm {
  title: string;
  description: string;
  subDescription: string;
  children: ReactNode;
}

const TooltipForm = ({
  title,
  description,
  subDescription,
  children,
}: ITooltipForm) => {
  return (
    <Tooltip
      label={
        <Stack color="black" p={2}>
          <Text fontWeight={500} fontSize={pixelToRem(14)}>
            {title}
          </Text>
          <Text
            color="text.third"
            fontSize={pixelToRem(14)}
            mb="15px !important"
          >
            {description}
          </Text>
          <Text color="text.third" fontSize={pixelToRem(14)}>
            {subDescription}
          </Text>
        </Stack>
      }
      bg="white"
      hasArrow
    >
      {children}
    </Tooltip>
  );
};

export default TooltipForm;
