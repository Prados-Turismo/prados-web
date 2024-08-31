import { FieldWrap } from "./styled"

import {
  Box,
  Flex,
  Input,
  InputGroup,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  Spinner,
  Stack,
  useDisclosure
} from "@chakra-ui/react"
import Asterisk from "../Asterisk/Asterisk"
import { IFormInput } from "./types"
import { NumberFormatBase, NumericFormat } from "react-number-format"

import { IoHelp } from "react-icons/io5"
// import { customTheme } from "../../theme"

const FormInputNumber = ({
  label,
  register,
  errors,
  name,
  isRequired,
  setValue,
  value,
  format,
  isStateForm,
  width = "100%",
  height = "unset",
  flex = "1",
  minWidth = "270px",
  maxWidth = "100%",
  maxLength,
  isLoading,
  isMoneyValue,
  defaultValue,
  readOnly,
  helpText,
  isDisabled,
  prefix = "money",
  dontAllowNegative,
  marginLabelBottom = "4px",
  placeholder,
  handleOnBlur
}: IFormInput) => {
  const { isOpen, onToggle, onClose } = useDisclosure()

  return (
    <FieldWrap
      minW={minWidth}
      w={width}
      h={height}
      flex={flex}
      position="relative"
      maxW={maxWidth}
    >
      {label && (
        <>
          <Flex gap="5px" marginBottom={marginLabelBottom}>
            {label} {isRequired && <Asterisk />}
            {helpText && (
              <Box
                marginLeft="5px"
                cursor="pointer"
                _hover={{ opacity: "0.7" }}
              >
                <IoHelp
                  // color={customTheme?.colors?.brandSecond?.first}
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

      <InputGroup position="relative">
        {isMoneyValue ? (
          <NumericFormat
            isDisabled={isDisabled}
            readOnly={readOnly}
            prefix={prefix === "percentual" ? "% " : "R$ "}
            isAllowed={(values) => {
              return values?.floatValue
                ? values?.floatValue <=
                (prefix === "percentual" ? 100 : 100000000000000000n)
                : true
            }}
            decimalScale={2}
            placeholder={prefix === "percentual" ? "% 0,00" : "R$ 0,00"}
            decimalSeparator=","
            fixedDecimalScale
            thousandSeparator="."
            width={width}
            customInput={Input}
            maxLength={maxLength}
            sx={{
              border: readOnly ? "none" : "1px solid",
              borderColor: errors ? "brand.500" : "inherit",
              height: height,
              ":hover": {
                borderColor: errors ? "brand.500" : "inherit"
              },
              backgroundColor: readOnly ? "" : "white"
            }}
            value={value ? Number(value) : ""}
            defaultValue={defaultValue}
            onValueChange={({ floatValue }) => {
              if (!readOnly) {
                if (isStateForm) {
                  setValue(floatValue || "")
                } else {
                  setValue(name, floatValue || "")
                }
              }
            }}
            disabled={isLoading}
            onBlur={handleOnBlur}
            allowNegative={!dontAllowNegative}
            {...(register && register(name))}
          />
        ) : (
          <NumberFormatBase
            isDisabled={isDisabled}
            readOnly={readOnly}
            format={format}
            width={width}
            customInput={Input}
            maxLength={maxLength}
            placeholder={placeholder}
            sx={{
              borderColor: errors ? "brand.500" : "inherit",
              height: "40px",
              ":hover": {
                borderColor: errors ? "brand.500" : "inherit"
              },
              backgroundColor: "white"
            }}
            value={value}
            defaultValue={defaultValue}
            onValueChange={({ value }) => {
              if (isStateForm) {
                setValue(Number(value) || "")
              } else {
                setValue(name, Number(value) || "")
              }
            }}
            disabled={isLoading}
            {...(register && register(name))}
          />
        )}

        {isLoading && (
          <Spinner color="brand.500" position="absolute" left="50%" top="8px" />
        )}
      </InputGroup>

      {errors && (
        <Stack
          direction="row"
          justifyContent={errors ? "space-between" : "flex-end"}
          alignItems="center"
          pt={1}
        >
          {errors && <p className="error">{errors.message}</p>}
        </Stack>
      )}
    </FieldWrap>
  )
}

export default FormInputNumber
