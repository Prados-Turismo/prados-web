import { Box, chakra } from "@chakra-ui/react"
import { pixelToRem } from "../../../utils"

export const Group = chakra(Box, {
  baseStyle: {
    display: "flex",
    flexDirection: "column",

    form: {
      display: "flex",
      flexDirection: "column",
      gap: "25px"
    },

    "+ div": {
      borderTop: "1px solid #E5E5E5"
    }
  }
})

export const HeaderInner = chakra(Box, {
  baseStyle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",

    h3: {
      fontSize: pixelToRem(20),
      color: "brand.fourth"
    }
  }
})

export const GroupButtons = chakra(Box, {
  baseStyle: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: "15px"
  }
})

export const GroupFields = chakra(Box, {
  baseStyle: {
    width: "100%",
    display: "flex",
    flexDirection: {
      base: "column",
      xl: "row"
    },
    flexWrap: "wrap",
    gap: "60px",

    "> div": {
      display: "flex",
      flexDirection: "column",
      flex: 1,
      gap: "15px"
    }
  }
})

export const Field = chakra(Box, {
  baseStyle: {
    display: "flex",
    flexDirection: "row",
    gap: "5px",

    label: {
      display: "flex",
      alignItems: "center",
      fontSize: 14,
      flex: 1.8
    },

    ".inputWrap": {
      display: "flex",
      gap: "10px",
      flex: 4,
      alignItems: "center"
    },

    ".select-fields": {
      flex: 4
    }
  }
})

export const ClassesWrap = chakra(Box, {
  baseStyle: {
    display: "flex",
    flexDirection: "column",
    gap: "30px"
  }
})

export const ClassesLabelWrap = chakra(Box, {
  baseStyle: {
    display: "flex",
    flexDirection: {
      base: "column",
      sm: "row"
    },
    alignItems: {
      base: "start",
      sm: "end"
    },
    gap: "10px",

    "> div": {
      width: "100%",
      maxWidth: "350px",
      display: "flex",
      flexDirection: "column",
      gap: "10px"
    }
  }
})

export const ClassesInnerWrap = chakra(Box, {
  baseStyle: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "30px"
  }
})
