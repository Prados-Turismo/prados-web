// Components
import ButtonSidebar from "../../components/ButtonSidebar";
import ButtonSidebarWrap from "../../components/ButtonSidebarWrap";
import { IStatus } from "../../models/sidebar.model";

// Styles
import { AsideTop, Aside } from "./styled";
import ClassesIcon from "../ClassesIcon";
import { PRODUCT_CLASS } from "../../utils/enumFormat";
import { useEffect, useState } from "react";

// Interfaces
interface IBenefitsSideBar {
  status: IStatus;
  onStatus: (e: IStatus) => void;
  productClasses: { product: boolean; productClass: string }[];
  pageTitle: string;
}

const BenefitsSidebar = ({
  status,
  onStatus,
  productClasses,
  pageTitle,
}: IBenefitsSideBar) => {
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
    <>
      <AsideTop className="contentTop">
        <h2>{pageTitle}</h2>
      </AsideTop>

      <Aside className="contentMain">
        <ButtonSidebarWrap title="">
          <ButtonSidebar
            selected={status.menu === "all"}
            onClick={() => {
              onStatus({
                title: "Todos",
                menu: "all",
              });
            }}
          >
            Todos
          </ButtonSidebar>

          {classesActive.map((item, key) => (
            <ButtonSidebar
              key={`${item}-${key}`}
              icon={<ClassesIcon classe={item} />}
              selected={status.menu === item}
              onClick={() => {
                onStatus({
                  title: PRODUCT_CLASS[item],
                  menu: item,
                });
              }}
            >
              {PRODUCT_CLASS[item]}
            </ButtonSidebar>
          ))}
          {classesDeactive.map((item, key) => (
            <ButtonSidebar
              key={`${item}-${key}`}
              icon={<ClassesIcon classe={item} />}
              selected={status.menu === item}
              onClick={() => {
                onStatus({
                  title: PRODUCT_CLASS[item],
                  menu: item,
                });
              }}
              isDisabled
            >
              {PRODUCT_CLASS[item]}
            </ButtonSidebar>
          ))}
        </ButtonSidebarWrap>
      </Aside>
    </>
  );
};

export default BenefitsSidebar;
