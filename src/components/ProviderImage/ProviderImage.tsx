import { Image, Skeleton, Tooltip } from "@chakra-ui/react";
import { useState } from "react";
import useUpload from "../../hooks/useUpload";
import { IProviderImage } from "./types";

const ProviderImage = ({
  providerName,
  imgToken,
  w = "80px",
  maxH = "35px",
  propsImage,
  isCotador = false,
}: IProviderImage) => {
  const { downloadFile } = useUpload();
  const { data: providerLogoUrl, isLoading } = downloadFile(
    !isCotador ? imgToken : "",
  );
  const [isImageLoaded, setImageLoaded] = useState(false);

  return (
    <Tooltip label={providerName} hasArrow>
      {isLoading ? (
        <Skeleton w={w} h="25px" />
      ) : (
        <>
          {isCotador && (
            <Image
              src={imgToken}
              style={{
                ...propsImage,
                width: "auto",
                maxWidth: w,
                maxHeight: maxH,
                margin: "0 auto",
              }}
            />
          )}
          {!isCotador && (
            <Skeleton isLoaded={isImageLoaded} w={w} maxH={maxH}>
              <Image
                src={providerLogoUrl?.url}
                onLoad={() => setImageLoaded(true)}
                style={{
                  ...propsImage,
                  width: "auto",
                  maxWidth: w,
                  maxHeight: maxH,
                  margin: "0 auto",
                }}
              />
            </Skeleton>
          )}
        </>
      )}
    </Tooltip>
  );
};

export default ProviderImage;
