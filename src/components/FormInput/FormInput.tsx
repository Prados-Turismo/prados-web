import { FieldWrap } from "./styled";

import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  Stack,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import Asterisk from "../Asterisk/Asterisk";
import { IFormInput } from "./types";
import { pixelToRem } from "../../utils";
import { MdOutlineContentPaste } from "react-icons/md";
import { IoHelp } from "react-icons/io5";
import { customTheme } from "../../theme";
import { forwardRef } from "react";

const FormInput = ({
  label,
  placeholder,
  type,
  register,
  errors,
  name,
  isRequired,
  disabled,
  inputArea,
  textCounter,
  isCounter,
  setValue,
  iconRight,
  changeItem,
  maxLength,
  onChangeTextarea,
  onChangeInput,
  defaultValue,
  minW = "270px",
  helpText,
  maxLengthInpt,
  ...restProps
}: IFormInput) => {
  const { isOpen, onToggle, onClose } = useDisclosure();

  const handleCopyClick = () => {
    navigator.clipboard.readText().then((value) => {
      setValue(name, value);
    });
  };

  return (
    <FieldWrap minW={minW} w="100%" flex="1" position="relative">
      {label && (
        <>
          <Flex style={{ height: "27px" }} gap="5px" marginBottom="3px">
            {label} {isRequired && <Asterisk />}
            {helpText && (
              <Box
                marginLeft="5px"
                cursor="pointer"
                _hover={{ opacity: "0.7" }}
              >
                <IoHelp
                  color={customTheme?.colors?.brandSecond?.[100]}
                  size={21}
                  onClick={onToggle}
                />
              </Box>
            )}
          </Flex>

          {helpText && (
            <Popover isOpen={isOpen} onClose={onClose}>
              <PopoverContent
                padding="16px 5px 5px"
                top="30px"
                boxShadow="0px 3px 3px -2px rgb(0 0 0 / 20%),0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)"
              >
                <PopoverCloseButton />
                <PopoverBody>{helpText}</PopoverBody>
              </PopoverContent>
            </Popover>
          )}
        </>
      )}
      {inputArea ? (
        <Textarea
          maxLength={maxLength}
          sx={{
            borderColor: errors ? "brand.500" : "inherit",
            ":hover": {
              shadow: "unset",
              borderColor: "inherit",
            },
            ":focus": {
              shadow: "unset",
              borderColor: "inherit",
            },
          }}
          bg="white"
          {...register?.(name)}
          onChange={onChangeTextarea}
          defaultValue={defaultValue}
        />
      ) : (
        <InputGroup>
          <Input
            placeholder={placeholder ?? ""}
            type={type || "text"}
            {...restProps}
            maxLength={maxLengthInpt}
            onChange={(e) => {
              onChangeInput && onChangeInput(e);
              e.persist();
              setValue(name, e.target.value);
            }}
            disabled={disabled}
            sx={{
              borderColor: errors ? "brand.500" : "inherit",
              height: "40px",
              ":hover": {
                borderColor: errors ? "brand.500" : "inherit",
              },
              color: restProps?.isReadOnly ? "#505050 !important" : "inherit",
            }}
            backgroundColor={
              restProps?.isReadOnly ? "#F9F9F9 !important" : "white"
            }
            {...register?.(name)}
            defaultValue={defaultValue}
          />
          {restProps.onPaste && (
            <InputRightElement width="40px" height="40px">
              <Stack
                p={1}
                border="1px solid #3b3e466e"
                borderRadius="4px"
                cursor="pointer"
                onClick={changeItem || handleCopyClick}
              >
                {iconRight || (
                  <MdOutlineContentPaste size={18} color="#3b3e46c9" />
                )}
              </Stack>
            </InputRightElement>
          )}
        </InputGroup>
      )}
      <Stack
        direction="row"
        justifyContent={errors ? "space-between" : "flex-end"}
        alignItems="center"
      >
        {errors && <p className="error">{errors.message}</p>}
        {isCounter && (
          <Text color="#707070" lineHeight="12px" fontSize={pixelToRem(12)}>
            {textCounter?.length || 0}/35
          </Text>
        )}
      </Stack>
    </FieldWrap>
  );
};

export default FormInput;
