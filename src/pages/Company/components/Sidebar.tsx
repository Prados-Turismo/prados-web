import { Box } from "@chakra-ui/react"

import ButtonSidebarWrap from "../../../components/ButtonSidebarWrap"
import ButtonSidebar from "../../../components/ButtonSidebar"

import { Button } from "../Company"
interface Props {
  buttons: Button[]
  onClickButton: (button: Button) => void
}

export default function Sidebar({ buttons, onClickButton }: Props) {
  return (
    <>
      <Box display="flex" h="80px" alignItems="center" mt="51px">
        <Box as="h1" fontWeight="medium" fontSize="2xl" color="text.first">
          Dados da empresa
        </Box>
      </Box>
      <Box
        borderWidth="1px"
        borderStyle="solid"
        borderColor="gray.200"
        borderTopRadius="md"
        borderBottom="none"
        p="4"
        height="100%"
      >
        <ButtonSidebarWrap title="">
          {buttons
            .filter((button) => button.isVisible)
            .map((button) => {
              return (
                <ButtonSidebar
                  key={button.key}
                  icon={button.icon}
                  selected={button.active}
                  onClick={() => onClickButton(button)}
                >
                  {button.title}
                </ButtonSidebar>
              )
            })}
        </ButtonSidebarWrap>
      </Box>
    </>
  )
}
