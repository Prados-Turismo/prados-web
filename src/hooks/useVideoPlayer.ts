import { useState } from "react";
import { IVideo } from "../components/VideoPlayer/types";
import { apiRecord } from "../services/api";
import { useQuery } from "react-query";
import { Warning } from "../errors";
import { keys } from "../services/query";

const getListVideo = () => {
  const { data, isLoading } = useQuery(keys.videoPlayer, async () => {
    try {
      const { data } = await apiRecord.get<IVideo[]>("/video-tutorials");

      return data;
    } catch (error: any) {
      throw new Warning(
        "Erro ao buscar a listagem dos vídeos tutoriais",
        error?.response?.status,
      );
    }
  });

  return {
    data: data || [],
    isLoading,
  };
};

export const useVideoPlayer = () => {
  const [showModal, setShowModal] = useState({ id: "", display: false });

  const getVideoIdFromLink = (link: string) => {
    const url = new URL(link);
    const searchParams = new URLSearchParams(url.search);
    return searchParams.get("v") || url.pathname.replace("/", "");
  };

  return {
    getListVideo,
    getVideoIdFromLink,
    showModal,
    setShowModal,
  };
};
