import {
  CircularProgress,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import { AiFillPlayCircle } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import Youtube from "react-youtube";
import { useVideoPlayer } from "../../hooks/useVideoPlayer";
import { pixelToRem } from "../../utils";

const LIST_PAGES: { [key: string]: string } = {
  colaboradores: "pessoas",
  produtos: "produtos",
  ["area financeira"]: "area-financeira",
  ["canal de atendimento"]: "canal-de-atendimento",
  ["parametrização de produtos"]: "parametrizacao-de-produtos",
  ["gestao promoçao a saude"]: "gestao-promocao-saude",
  relatorios: "relatorios",
  contratos: "contratos",
};

const VideoPlayer = () => {
  const { getListVideo, getVideoIdFromLink, setShowModal, showModal } =
    useVideoPlayer();
  const { data: listVideo, isLoading } = getListVideo();
  const { pathname } = useLocation();
  const formattingPath = pathname.replace("/", "");

  const videoForPage = listVideo?.filter(
    ({ PERMISSAO_DE_EXIBICAO }) =>
      LIST_PAGES[PERMISSAO_DE_EXIBICAO.toLowerCase()] === formattingPath,
  );

  if (!videoForPage?.length) return null;
  return (
    <>
      <Stack m={2} position="fixed" bottom="30px" right={18} zIndex={10}>
        <Menu>
          <MenuButton>
            <AiFillPlayCircle size={50} color="#333333" />
          </MenuButton>
          <MenuList maxWidth={205} bgColor="#333333" zIndex={10}>
            <Text
              fontWeight={700}
              fontSize={pixelToRem(14)}
              lineHeight="21px"
              color="#FFFFFF"
              pl={3}
            >
              Vídeo tutorial
            </Text>
            {isLoading ? (
              <Stack alignItems="center">
                <CircularProgress
                  size="40px"
                  isIndeterminate
                  color="brand.500"
                  my={2}
                />
              </Stack>
            ) : (
              <>
                {videoForPage?.map(({ TITULO, URL_DO_VIDEO }, index) => (
                  <MenuItem
                    onClick={() =>
                      setShowModal({
                        id: getVideoIdFromLink(URL_DO_VIDEO) as string,
                        display: true,
                      })
                    }
                    fontSize={pixelToRem(14)}
                    lineHeight="21px"
                    bgColor="#333333"
                    color="#FFFFFF"
                    my={1}
                    key={index}
                  >
                    {TITULO}
                  </MenuItem>
                ))}
              </>
            )}
          </MenuList>
        </Menu>
      </Stack>
      <Modal
        isOpen={showModal.display}
        isCentered
        onClose={() => setShowModal({ id: "", display: false })}
      >
        <ModalOverlay />
        <ModalContent maxW="900px">
          <Youtube
            videoId={showModal.id}
            opts={{
              height: "400",
              width: "100%",
              playerVars: {
                autoplay: 1,
                controls: 1,
                disablekb: 1,
                modestbranding: 1,
                rel: 0,
                showinfo: 0,
                disableAds: 1,
              },
            }}
          />
        </ModalContent>
      </Modal>
    </>
  );
};

export default VideoPlayer;
