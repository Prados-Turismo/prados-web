import { TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React from "react";
import { StyledTab } from "./styled";

interface Props {
  tabsData: {
    label: string;
    content: JSX.Element;
    showTab: boolean;
  }[];
  isLoading: boolean;
}

const ImplantationTabs: React.FC<Props> = ({ tabsData }) => {
  return (
    <Tabs height={"100%"} w="100%">
      <TabList>
        {tabsData.map(
          (tab) =>
            tab.showTab && (
              <StyledTab
                key={
                  tab.label + tab.showTab + Math.random() * Math.floor(10000)
                }
              >
                {tab.label}
              </StyledTab>
            ),
        )}
      </TabList>
      <TabPanels height="100%">
        {tabsData.map(
          (tab) =>
            tab.showTab && (
              <TabPanel
                key={tab.label + Math.random() * Math.floor(10000)}
                height="100%"
              >
                {tab.content}
              </TabPanel>
            ),
        )}
      </TabPanels>
    </Tabs>
  );
};

export default ImplantationTabs;
