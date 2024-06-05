import { Text } from "@chakra-ui/react";
import { IDataProductContract } from "../../../../../../models/product.model";
import { ComparatorColumnDetailsBody } from "../DetailsBody/styled";
import purify from "dompurify";
import showdown from "showdown";

const DescriptionBody = ({ data }: { data: IDataProductContract[] }) => {
  const converter = new showdown.Converter();

  return (
    <>
      {data?.length > 0 &&
        data?.map((item) => (
          <ComparatorColumnDetailsBody key={item?.id}>
            {item?.product?.details ? (
              <span
                dangerouslySetInnerHTML={{
                  __html: purify.sanitize(
                    converter.makeHtml(item?.product?.details),
                  ),
                }}
              />
            ) : (
              <Text textAlign="center">-</Text>
            )}
          </ComparatorColumnDetailsBody>
        ))}
    </>
  );
};

export default DescriptionBody;
