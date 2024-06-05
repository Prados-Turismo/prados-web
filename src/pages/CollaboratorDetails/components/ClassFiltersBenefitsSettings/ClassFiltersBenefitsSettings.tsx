import { Box, Button } from "@chakra-ui/react";
import { ClassesInnerWrap } from "../../pages/styled";
import { PRODUCT_CLASS } from "../../../../utils/enumFormat";
import { useEffect, useState } from "react";
import ClassesIcon from "../../../../components/ClassesIcon";
import { IClassFiltersBenefitsSettings } from "./types";

const ClassFiltersBenefitsSettings = ({
  productClasses,
  setClasseSelected,
}: IClassFiltersBenefitsSettings) => {
  const [selectedTabbed, setSelectedTabbed] = useState(0);

  const [classesActive, setClassesActive] = useState<string[]>([]);
  const [classesDeactive, setClassesDeactive] = useState<string[]>(
    Object.keys(PRODUCT_CLASS),
  );

  useEffect(() => {
    if (productClasses) {
      const classes = Object.keys(PRODUCT_CLASS);
      const classesActive = classes.filter((key) =>
        productClasses.some(
          (item) => item?.productClass === key && item?.product,
        ),
      );
      const classesDeactive = classes.filter(
        (key) =>
          !productClasses.some(
            (item) => item?.productClass === key && item?.product,
          ),
      );
      setClassesActive(classesActive);
      setClassesDeactive(classesDeactive);
    }
  }, [productClasses]);

  return (
    <Box overflow="auto">
      <ClassesInnerWrap>
        {(classesActive.length > 0 || classesDeactive.length > 0) && (
          <Button
            variant="contrast"
            w="100px"
            className={selectedTabbed === 0 ? "active" : ""}
            onClick={() => {
              setSelectedTabbed(0);
              setClasseSelected("all");
            }}
          >
            Todos
          </Button>
        )}

        {classesActive.map((classe, key) => (
          <Button
            variant="contrast"
            maxW="300px"
            flexGrow={1}
            leftIcon={<ClassesIcon classe={classe} />}
            key={classe}
            className={selectedTabbed === key + 1 ? "active" : ""}
            minWidth="max-content"
            onClick={() => {
              setClasseSelected(classe);
              setSelectedTabbed(key + 1);
            }}
          >
            {PRODUCT_CLASS[classe]}
          </Button>
        ))}

        {classesDeactive.map((classe) => (
          <Button
            variant="contrast"
            maxW="300px"
            _hover={{
              color: "contrast",
            }}
            flexGrow={1}
            leftIcon={<ClassesIcon classe={classe} />}
            key={classe}
            isDisabled={true}
            minWidth="max-content"
          >
            {PRODUCT_CLASS[classe]}
          </Button>
        ))}
      </ClassesInnerWrap>
    </Box>
  );
};

export default ClassFiltersBenefitsSettings;
