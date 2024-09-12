import Select from "react-select";
import { IOption, ISelectForm } from "./types";
import {
  Box,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Asterisk from "../Asterisk/Asterisk";
import { IoHelp } from "react-icons/io5";
import { customTheme } from "../../theme";

const SelectForm = ({
  register,
  name,
  options,
  setValue,
  label,
  isRequired = false,
  isMulti = false,
  isSearchable = true,
  isLoading,
  errors,
  value,
  handleChange,
  isDisabled,
  styles,
  maxW = "unset",
  placeholder = "Selecione",
  defaultValue,
  minW = "270px",
  helpText,
  noOptionsMessage = "Não há itens para selecionar",
  helpIcon,
  CustomOption
}: ISelectForm) => {
  const { isOpen, onToggle, onClose } = useDisclosure();

  return (
    <Stack sx={styles} flex="1" minW={minW} maxW={maxW} position="relative">
      {label && (
        <>
          <Text display="flex">
            {label}&nbsp;{isRequired && <Asterisk />}
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
            {helpIcon && (
              <Box marginLeft="20px" cursor="pointer">
                {helpIcon}
              </Box>
            )}
          </Text>

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
      <Stack gap={1}>
        <Select
          {...register?.(name)}
          isLoading={isLoading}
          value={value}
          defaultValue={defaultValue}
          isMulti={isMulti}
          isSearchable={isSearchable}
          options={options}
          placeholder={placeholder}
          className="select-fields"
          classNamePrefix="select"
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary: customTheme.colors.brandSecond[100],
            },
          })}
          noOptionsMessage={() => noOptionsMessage}
          name={name}
          getOptionLabel={(opt) => opt.label}
          onChange={(newValue) => {
            if (handleChange) {
              handleChange(newValue);
              return;
            }
            setValue(
              name,
              isMulti
                ? (newValue as IOption[]).map(({ value }) => value)
                : newValue?.value,
            );
          }}
          menuPortalTarget={document.body}
          styles={{
            menu: (provided) => ({
              ...provided,
              zIndex: 9999,
            }),
            menuPortal: (provided) => ({
              ...provided,
              zIndex: 9999,
            }),
            control: (provided) => ({
              ...provided,
              borderColor: errors ? "#e53e3e" : "inherit",
              width: "100%",
            }),
            loadingIndicator: (provided) => ({
              ...provided,
              span: {
                width: "0.5rem",
                height: "0.5rem",
              },
            }),
          }}
          isDisabled={isDisabled}
          components={CustomOption && { Option: CustomOption }}
        />
        {errors && label && (
          <Text color="brand.500" fontSize={14}>
            {/* O campo {label.replace("?", " ").replace(":", " ")} é obrigatório */}
            {errors.message}
          </Text>
        )}
      </Stack>
    </Stack>
  );
};

export default SelectForm;
